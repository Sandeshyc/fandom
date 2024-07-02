import React, { useEffect, useState } from "react";
import usePaymentHistory from "@/hooks/usePaymentHistory";
import {
  PictureAsPdfOutlined,
  ContentCopyOutlined,
  ContentCopyTwoTone,
  RefreshOutlined,
} from "@mui/icons-material";
import { getOrderReceipt } from "@/services/api";
import { stableKeys } from "@/utils/stableKeys";
import Title from "@/modules/Identities/Title";
import { getDateFormat } from "@/utils/yearFromDate";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { forEach } from "lodash";
const cellClass = `before:mr-4 before:font-medium before:text-gray-900 text-[#454545] text-base p-2 lg:py-4 flex flex-wrap justify-between lg:table-cell border-b border-gray-300/50 lg:first:pl-4`;
const PaymentHistory = () => {
  const [isReady, setIsReady] = useState(false);
  const [userId, setUserId] = useState("");
  const [copyText, setCopyText] = useState("");
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [loadingItem, setLoadingItem] = useState("");
  // const { data, isLoading, error } = usePaymentHistory('7B6E23C8-6B77-4294-A7A3-66B4748D8D05');
  const { data, isLoading, error } = usePaymentHistory(userId);
  // console.log("Billing Data: ", data, isLoading, error);
  const copyTextFunc = (text: string) => {
    navigator?.clipboard?.writeText(text);
    setCopyText(text);
  };
  const handlePDFDownload = async (transactionId: string) => {
    setIsPdfLoading(true);
    setLoadingItem(transactionId);
    const response = await getOrderReceipt(userId, transactionId);
    // console.log("response: ", response);
    if (response.status === "success") {
      const ddd = URL.createObjectURL(response?.data as Blob);
      // set file name
      const fileName = transactionId + ".pdf";
      // create an anchor tag
      const a = document.createElement("a");
      // set the href attribute
      a.href = ddd;
      // new tab open
      a.target = "_blank";
      a.download = fileName;
      // trigger the click event
      a.click();
      // remove the anchor tag
      a.remove();
      URL.revokeObjectURL(ddd);
      setIsPdfLoading(false);
      setLoadingItem("");
    } else {
      // console.log("Error: ", response);
      setIsPdfLoading(false);
      setLoadingItem("");
    }
  };
  useEffect(() => {
    const userInfo = window.localStorage.getItem("userInfo");
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if (userInfoObj.sub) {
        setUserId(userInfoObj.sub);
      }
    }
    setIsReady(true);
  }, []);
  return (
    <div className="relative">
      {isPdfLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-50 cursor-wait"></div>
      )}
      <div className="text-center my-4 font-semibold text-[#11355E]">
        <Title tag="h2" size="2xl">
          Payment History
        </Title>
      </div>
      <div className="w-full overflow-y-hidden lg:overflow-x-auto">
        <table className="w-full text-left paymentHistoryTable">
          <thead className="hidden lg:table-header-group text-[#454545] border-b border-[#C1C0C0]">
            <tr className="px-4">
              <th className="py-4 whitespace-nowrap font-semibold min-w-[120px] pl-4">
                Date
              </th>
              <th className="py-4 whitespace-nowrap font-semibold min-w-[200px]">
                Title
              </th>
              <th className="py-4 whitespace-nowrap font-semibold min-w-[120px]">
                Product Name
              </th>
              <th className="py-4 whitespace-nowrap font-semibold min-w-[180px]">
                Order Number
              </th>
              <th className="py-4 whitespace-nowrap font-semibold min-w-[150px]">
                Payment Method
              </th>
              <th className="py-4 whitespace-nowrap font-semibold min-w-[100px]">
                Transaction Type
              </th>
              <th className="py-4 whitespace-nowrap font-semibold min-w-[80px]">
                Amount
              </th>
            </tr>
          </thead>
          {(error)? (<PaymentError />):(
            <>
            {(!isLoading && isReady && data) ? (
              <tbody className="text-sm">
                {Array.isArray(data) && data.length > 0 ? (
                  <>
                    {data.map((payment, index) => (
                      <tr
                        key={stableKeys[index]}
                        className={`text-gray-900/70 block lg:table-row ${
                          index % 2 === 0 ? "bg-white/20" : ""
                        }`}
                      >
                        <td className={cellClass} data-label={"Date"}>
                          {getDateFormat(payment?.date)}
                        </td>
                        <td className={cellClass} data-label={"Title"}>
                          {payment?.contentTitle}
                        </td>
                        <td className={cellClass} data-label={"Product Name"}>
                          {payment?.productName}
                        </td>
                        <td className={cellClass} data-label={"Order Number"}>
                          <span>
                            {payment?.orderNumber}
                            {copyText === payment?.orderNumber ? (
                              <span className="text-black ml-2" title="Copied">
                                <ContentCopyTwoTone
                                  sx={{ fontSize: 16, color: "#C1C0C0" }}
                                />
                              </span>
                            ) : (
                              <span
                                className="text-black/50 ml-2 cursor-copy"
                                title="Copy"
                                onClick={() => copyTextFunc(payment?.orderNumber)}
                              >
                                <ContentCopyOutlined
                                  sx={{ fontSize: 16, color: "#C1C0C0" }}
                                />
                              </span>
                            )}
                          </span>
                        </td>
                        <td className={cellClass} data-label={"Payment Method"}>
                          <div className="flex items-center">
                            {/* {(payment.paymentIcon) && (
                                              <img src={payment.paymentIcon} alt='' className='w-8 h-8 object-contain mr-2' />
                                          )} */}
                            <span>
                              {payment?.paymentMethod?.type}{" "}
                              {payment?.paymentMethod?.cardtype}{" "}
                              {payment?.paymentMethod?.cardno}
                            </span>
                          </div>
                        </td>
                        <td className={cellClass} data-label={"Transaction Type"}>
                          {payment?.transactionType}
                        </td>
                        <td className={cellClass} data-label={"Amount"}>
                          {payment?.totalAmount?.currency}{" "}
                          {payment?.totalAmount?.amount}
                        </td>
                        <td className={cellClass} data-label={"Receipt"}>
                          {loadingItem === payment?.transactionId ? (
                            <button className="text-blue-500" title="Loading">
                              <RefreshOutlined
                                sx={{ fontSize: 30, color: "blue" }}
                                className="animate-spin"
                              />
                            </button>
                          ) : (
                            <button
                              className="text-blue-500"
                              title="Download"
                              onClick={() =>
                                handlePDFDownload(payment?.transactionId)
                              }
                            >
                              <PictureAsPdfOutlined
                                sx={{ fontSize: 20, color: "#11355E" }}
                              />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (<NoPaymentFound/>)}
              </tbody>
            ) : (
              <tbody>
                <PaymentLoading />
              </tbody>
            )}
            </>
          )}
        </table>
      </div>
    </div>
  );
};
export default PaymentHistory;

const NoPaymentFound = () => {
  return (
    <tr>
      <td
        colSpan={12}
        className="text-center text-base py-4 text-[#DA312C]">
          No Payment History Found!
      </td>
    </tr>
  );
}

const PaymentError = () => {
  return (
    <tr>
      <td
        colSpan={12}
        className="text-center text-base py-4 text-[#DA312C]">
          Opps! Something went wrong. Please try again later.
      </td>
    </tr>
  );
}

const PaymentLoading = () => {
  return (
    <>
    {Array(3).fill(0).map((_:any, index:any) => (
        <tr
          className={`text-gray-900/70 block lg:table-row`}
          key={index}>
          <td className={cellClass} data-label={"Date"}>
            <div className="w-[100px]">
              <Skeleton
                baseColor="#f8f9fa"
                highlightColor="#FAFAFA"
                className="h-[18px]"
              />
            </div>
          </td>
          <td className={cellClass} data-label={"Content Title"}>
            <div className="w-[140px]">
              <Skeleton
                baseColor="#f8f9fa"
                highlightColor="#FAFAFA"
                className="h-[18px]"
              />
            </div>
          </td>
          <td className={cellClass} data-label={"Product Name"}>
            <div className="w-[140px]">
              <Skeleton
                baseColor="#f8f9fa"
                highlightColor="#FAFAFA"
                className="h-[18px]"
              />
            </div>
          </td>
          <td className={cellClass} data-label={"Order Number"}>
            <div className="w-[120px]">
              <Skeleton
                baseColor="#f8f9fa"
                highlightColor="#FAFAFA"
                className="h-[18px]"
              />
            </div>
          </td>
          <td className={cellClass} data-label={"Payment Method"}>
            <div className="w-[120px]">
              <Skeleton
                baseColor="#f8f9fa"
                highlightColor="#FAFAFA"
                className="h-[18px]"
              />
            </div>
          </td>
          <td className={cellClass} data-label={"Transaction Type"}>
            <div className="w-[130px]">
              <Skeleton
                baseColor="#f8f9fa"
                highlightColor="#FAFAFA"
                className="h-[18px]"
              />
            </div>
          </td>
          <td className={cellClass} data-label={"Amount"}>
            <div className="w-[70px]">
              <Skeleton
                baseColor="#f8f9fa"
                highlightColor="#FAFAFA"
                className="h-[18px]"
              />
            </div>
          </td>
        </tr>
    ))}
    </>
  )
}