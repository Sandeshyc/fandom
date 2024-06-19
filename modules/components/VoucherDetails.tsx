import React, { useState, useEffect } from "react";
import Link from "next/link";
import useCheckEntitlement from "@/hooks/useCheckEntitlement";
import { getAllowedItems } from "@/utils/getData";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
    ContentCopyOutlined,
    ContentCopyTwoTone,
    CloseOutlined,
} from "@mui/icons-material";
import { convertESTtoLocalTime } from "@/utils/yearFromDate";
import { stableKeys } from "@/utils/stableKeys";
const cellClass = `before:mr-4 before:font-medium before:text-gray-900 p-2 lg:py-4 flex flex-wrap justify-between lg:table-cell border-b border-gray-300/50 lg:first:pl-0 whitespace-nowrap`;
type Props = {
    allowedItemLists: any[];
}
const VoucherDetails = ({
    allowedItemLists
}:Props) => {
  const [expanded, setExpanded] = useState(false);
  const [copyText, setCopyText] = useState("");
  const copyTextFunc = (text: string) => {
    navigator?.clipboard?.writeText(text);
    setCopyText(text);
  };
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      {
        Array.isArray(allowedItemLists) &&
        allowedItemLists.length > 0 && (
          <>
          <div className="px-4 md:px-12 mb-[2vw]">
            <div className="container mx-auto max-w-[996px] w-full">
              <div
                className={`p-4 border border-[#C1C0C0] rounded-md bg-[#FFF] bg-opacity-[22%]`}
              >
                <div className="flex justify-between">
                  <div className="pr-2">
                    <p className="text-lg lg:text-[22px] text-[#11355E] font-medium">
                        Available Vouchers
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={toggleExpanded}
                    className="w-[25px]"
                  >
                    <ChevronDownIcon
                      className={`active:opacity-65 h-6 w-6 text-[#11355E] ${
                        expanded ? "rotate-180" : null
                      }`}
                    />
                  </button>
                </div>
                <div
                  className={`text-[#11355E] py-4 rounded-md mt-4 flex justify-between flex-wrap ${
                    !expanded ? "hidden" : "flex"
                  }`}
                >
                  <div className="w-full overflow-y-hidden lg:overflow-x-auto">
                    <table className="w-full text-left paymentHistoryTable">
                      <thead className="hidden lg:table-header-group text-[#454545]">
                        <tr className="px-4">
                          <th className="p-2 whitespace-nowrap font-semibold min-w-[120px] pl-0">
                            Member ID
                          </th>
                          <th className="p-2 whitespace-nowrap font-semibold min-w-[180px] pl-0">
                            Title
                          </th>
                          <th className="p-2 whitespace-nowrap font-semibold min-w-[120px]">
                            Voucher Code
                          </th>
                          <th className="p-2 whitespace-nowrap font-semibold min-w-[180px]">
                            Start date
                          </th>
                          <th className="p-2 whitespace-nowrap font-semibold min-w-[180px]">
                            End date
                          </th>
                          <th className="p-2 whitespace-nowrap font-semibold min-w-[80px]">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {allowedItemLists.map((item, index) => {
                          return (
                            <tr
                              key={stableKeys[index]}
                              className={`text-gray-900/70 block lg:table-row ${
                                index % 2 === 0 ? "bg-white/20" : ""
                              }`}
                            >
                              <td
                                className={cellClass}
                                data-label={"Member ID"}
                              >
                                {item?.membership?.membershipId}
                              </td>
                              <td
                                className={cellClass}
                                data-label={"Title"}
                              >
                                {item?.content?.contentTitle}
                              </td>
                              <td
                                className={cellClass}
                                data-label={"Voucher Code"}>
                                <span>
                                    {item?.voucher?.voucherCode}
                                    {copyText === item?.voucher?.voucherCode ? (
                                    <span className="text-black ml-2" title="Copied">
                                        <ContentCopyTwoTone
                                        sx={{ fontSize: 16, color: "#222" }}
                                        />
                                    </span>
                                    ) : (
                                    <span
                                        className="text-black/50 ml-2 cursor-copy"
                                        title="Copy"
                                        onClick={() => copyTextFunc(item?.voucher?.voucherCode)}
                                    >
                                        <ContentCopyOutlined
                                        sx={{ fontSize: 16, color: "#C1C0C0" }}
                                        />
                                    </span>
                                    )}
                                </span>
                              </td>
                              <td
                                className={cellClass}
                                data-label={"Start date"}
                              >
                                {convertESTtoLocalTime(
                                  item?.header?.startDate as string
                                )}
                              </td>
                              <td className={cellClass} data-label={"End date"}>
                                {convertESTtoLocalTime(
                                  item?.header?.expiryDate as string
                                )}
                              </td>
                              <td className={cellClass} data-label={"Action"}>
                                <Link
                                  href={item?.content?.pageDirectory || "#"}
                                  className="underline">
                                  Browse page
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
        )}
    </>
  );
};
export default VoucherDetails;