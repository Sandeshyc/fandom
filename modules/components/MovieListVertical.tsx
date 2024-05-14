import React, { useEffect, useState } from "react";
import { MovieInterface } from "@/types";
import { NoMovies } from "@/modules/Identities/NoFound";
import ReelHeading from "@/modules/elements/ReelHeading";
import MovieCardPurchase from "@/components/MovieCardPurchase";
import MovieCardPurchasePortrait from "@/components/MovieCardPurchasePortrait";
import { stableKeys } from "@/utils/stableKeys";
import PurchasesAll from "@/modules/elements/PurchasesAll";
import useClientLocaion from "@/hooks/useClientLocaion";
import useIsMobile from "@/hooks/useIsMobile";
type Props = {
  data: MovieInterface[];
  title?: string;
  isBoxesLayout?: boolean;
  link?: string;
  linkText?: string;
  marginTop?: boolean;
};
const MovieListVertical = ({
  data,
  title,
  link,
  linkText,
  isBoxesLayout = false,
  marginTop = false,
}: Props) => {
  const [openTab, setOpenTab] = useState(0);
  const [userId, setUserId] = useState("");
  const isMobile = useIsMobile();
  const { data: clientLocation, error: locationError }: any =
    useClientLocaion();
  const region = clientLocation?.country?.isoCode;

  const handelTabChange = (tab: number) => {
    setOpenTab(tab);
  };

  useEffect(() => {
    const userInfo = window.localStorage.getItem("userInfo");
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if (userInfoObj.sub) {
        setUserId(userInfoObj.sub);
      }
    }
  }, []);
  const ActiveItems = data;

  const ReelContent = () => (
    <div className={`min-h-[70vh] z-10 relative text-white`}>
      <ReelHeading title={title} link={link} linkText={linkText} />
      <ul className="text-white flex flex-wrap text-center mt-0 mb-4 lg:mb-8 w-full text-sm lg:text-base">
        <li
          className={`text-white border-2 flex justify-center items-center ${
            openTab === 0 ? "border-white bg-blue-500" : "border-gray-500"
          } rounded-full h-[34px] lg:h-[40px] py-2 px-4 mr-2 md:mr-4 lg:mr-8 min-w-[100px] lg:min-w-[160px] cursor-pointer hover:border-white/80`}
          onClick={() => handelTabChange(0)}
        >
          Active
        </li>
        <li
          className={`text-white border-2 flex justify-center items-center ${
            openTab === 1 ? "border-white bg-blue-500" : "border-gray-500"
          } rounded-full h-[34px] lg:h-[40px] py-2 px-4 mr-2 min-w-[100px] lg:min-w-[160px] cursor-pointer hover:border-white/80`}
          onClick={() => handelTabChange(1)}
        >
          Expired
        </li>
      </ul>
      <div className={`${openTab === 0 ? "flex flex-wrap w-full  mx-[-14px]" : "hidden"}`}>
        {Array.isArray(ActiveItems) && ActiveItems?.length > 0 ? (
          ActiveItems.map((item: MovieInterface, index: number) => (
            <div className="w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 px-[14px] mb-[14px]" key={stableKeys[index]}>
                <MovieCardPurchasePortrait data={item} />
            </div>
          ))
        ) : (
          <NoMovies />
        )}
      </div>
      <div className={`${openTab === 1 ? "flex flex-wrap w-full mx-[-14px]" : "hidden"}`}>
        {openTab === 1 && (
          <PurchasesAll
            data={{
              userId: userId,
              countryCode: region,
            }}
          />
        )}
      </div>
    </div>
  );

  return (
    <>
      {isBoxesLayout === true ? (
        <>
          <div className="w-full overflow-hidden">
            <div className="max-w-[1600px] mx-auto pb-[15px]">
              <div className="overflow-hidden movieBoxsInside">
                {ReelContent()}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className={`px-4 max-w-[2400px] mx-auto`}
          style={{
            marginTop: marginTop ? (isMobile ? "70px" : "120px") : "0px",
          }}
        >
          {ReelContent()}
        </div>
      )}
    </>
  );
};
export default MovieListVertical;
