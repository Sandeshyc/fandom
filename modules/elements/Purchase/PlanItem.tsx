import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import useCheckAuthentication from "@/hooks/useCheckAuthentication";
import { auditEntitlement } from "@/services/api";
import Title from "@/modules/Identities/Title";
import Text from "@/modules/Identities/Text";
import { AutorenewOutlined } from "@mui/icons-material";
import { CheckIcon } from "@/utils/CustomSVGs";
const biniLogoUrl = "/images/logoofbiniblack.png";
type Props = {
  item: any;
  movieId: string;
  rentText?: string;
  allowedIems?: any;
};
const PlanItem = ({ item, movieId, rentText = "Rent", allowedIems }: Props) => {
  console.log("item", item, allowedIems);
  const { isLoginUser, isLoadingUserCheck } = useCheckAuthentication();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [rentProductId, setRentProductId] = useState("");
  const [rentTransactionId, setRentTransactionId] = useState("");
  const [allowedItem, setAllowedItem] = useState({} as any);
  const router = useRouter();
  const goPurchase = (productId: string) => {
    const userInfor = localStorage.getItem("userInfo");
    const transactionId = uuidv4();
    setIsLoading(true);
    let itemUrl = "/bini";
    if (userInfor) {
      const userInfo = JSON.parse(userInfor);
      const { sub } = userInfo;
      if (sub) {
        setUserId(sub);
        setRentProductId(productId);
        setRentTransactionId(transactionId);
        const _auditEntitlementCall = async () => {
          const data = {
            userID: sub,
            contentId: movieId,
            planId: productId,
            transactionId: transactionId,
            contentType: "TvChannel",
          };
          console.log("data", data);
          // return false;
          const res = await auditEntitlement(data);
          console.log("res", res);
          if (res.status === "success" || res.status === "process") {
            if (res.status === "process") {
              setRentTransactionId(res.transitionId);
            }
            window.localStorage.setItem("itemCode", movieId);
            window.localStorage.setItem("itemUrl", itemUrl);
            let forwordPurchaseUrl = `${
              process.env.NEXT_PUBLIC_SSO_DOMAIN
            }/payment/?userid=${sub}&productId=${productId}&transactionId=${
              res.status === "process" ? res.transitionId : transactionId
            }`;
            if (process.env.NODE_ENV === "development") {
              forwordPurchaseUrl = forwordPurchaseUrl + "&env=dev";
            }
            router.replace(forwordPurchaseUrl);
          } else {
            window.location.reload();
          }
        };
        _auditEntitlementCall();
      } else {
        window.location.reload();
      }
    } else {
      localStorage.setItem("callbackAction", "rent");
      const callbackParams = {
        itemCode: movieId,
        priceSKU: productId,
        transactionId: transactionId,
        itemUrl: itemUrl,
      };
      localStorage.setItem("callbackParams", JSON.stringify(callbackParams));
      router.push("/login");
    }
  };
  useEffect(() => {
    if (Array.isArray(allowedIems) && allowedIems.length > 0) {
      const allowedIds = allowedIems.map((allowItem: any) => {
        if (allowItem?.content?.contentId === movieId) {
          return allowItem;
        }
      });
      if (Array.isArray(allowedIds) && allowedIds.length > 0) {
        setAllowedItem(allowedIds[0]);
      }
    }
  }, [allowedIems, movieId]);
  console.log("allowedItem", allowedItem);
  return (
    <>
      <div className="p-6 sm:px-[111px] sm:py-[59px] mb-4 text-[#454545] w-full max-w-[90%] sm:max-w-[636px] bg-white rounded-lg shadow text-center">
        <div className="relative w-full max-w-[414px] mx-auto">
          {isLoading && (
            <div className="absolute top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center z-10 cursor-wait">
              <AutorenewOutlined
                className="animate-spin"
                sx={{ color: "white", fontSize: 40 }}
              />
            </div>
          )}
          <img
            src={biniLogoUrl}
            className="w-[122px] mx-auto mb-4"
            alt="Logo of Bini"
          />
          <Title
            tag="h3"
            size="xl"
            className="mb-8 font-semibold text-[#454545]"
          >
            {item?.name}
          </Title>
          <Text size="base" className="mb-8 text-[#454545]">
            {item?.description}
          </Text>
          <div className="text-base text-[#686868]">
            <ul className="w-max mx-auto text-sm sm:text-base flex flex-col justify-center gap-2 min-h-[100px]">
              <li className="flex items-center gap-2">
                <CheckIcon />
                Join the livestream
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                Never before seen footage and photoshoots
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                Digital photocards
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                Exclusive videos and articles
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                Limited edition BINI merchandise
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                More surprises!
              </li>
            </ul>
          </div>
          {allowedItem?._id ? (
            <Link
              href={allowedItem?.content?.pageDirectory || "#"}
              className="mt-6 block h-fit sm:h-[40px] py-1 text-[#fff] rounded-[50px] font-medium w-full transition bg-[#1B82F2]"
            >
              Go to Members Area
            </Link>
          ) : (
            <>
              <p className="my-6">
                <span className="text-[32px] font-medium">
                  {item?.price} {item?.currency ?? ""} per year
                </span>
              </p>
              <button
                onClick={() => goPurchase(item?.priceSKU)}
                className="h-[40px] py-1 text-[#fff] rounded-[50px] font-medium w-full transition bg-[#1B82F2]"
              >
                {/* {!isLoginUser && "Login and "} */}
                {rentText}
              </button>
              {!isLoadingUserCheck && !isLoginUser && (
                <button
                  onClick={() => router.push("/login")}
                  className="mt-4 h-[40px] py-1 text-[#1B82F2] rounded-[50px] font-medium w-full transition border-2 border-[#1B82F2] bg-transparent hover:bg-[#1B82F2]/10"
                >
                  Member Login
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default PlanItem;
