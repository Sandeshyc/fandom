import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { CloseOutlined } from "@mui/icons-material";
import { Roboto } from "next/font/google";
import Title from "@/modules/Identities/Title";
import Link from "next/link";
import useCheckEntitlement from "@/hooks/useCheckEntitlement";
import { getAllowedItems } from "@/utils/getData";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { convertESTtoLocalTime } from "@/utils/yearFromDate";
import { stableKeys } from "@/utils/stableKeys";
const cellClass = `before:mr-4 before:font-medium before:text-gray-900 p-2 lg:py-4 flex flex-wrap justify-between lg:table-cell border-b border-gray-300/50 lg:first:pl-0 whitespace-nowrap`;
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});
type Props = {
    voucher: any;
    planName: string;
}
const VoucherDetailsPopUp = ({
    voucher,
    planName
}:Props) => {
  const [isOpened, setIsOpened] = useState(false);
  console.log('VoucherDetailsPopUp::voucher', voucher);
  const handleClose = () => {
    setIsOpened(false);
  };
  return (
    <>
    <Modal
        open={isOpened}
        onClose={handleClose}
        className={`flex justify-center bg-black/40 items-center ${roboto.className}`}
      >
        <div className="rounded-md w-[90%] max-w-[1200px] bg-white relative text-[#5F576F] border border-white/70">
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={handleClose}>
            <CloseOutlined sx={{ fontSize: 28 }} className="text-[#454545]" />
          </div>
          <div className="p-4 pt-8">
            <Title tag="h3" size="2xl" color="text-[#5F576F]" className="mb-8 text-center">
              Voucher Details of <span className="italic">{planName}</span>
            </Title>
            <div className="w-full overflow-y-hidden lg:overflow-x-auto">
              <table className="w-full text-left paymentHistoryTable">
                <thead className="hidden lg:table-header-group text-[#454545]">
                  <tr className="px-4">
                    <th className="p-2 whitespace-nowrap font-semibold min-w-[180px] pl-0">
                      Title
                    </th>
                    <th className="p-2 whitespace-nowrap font-semibold min-w-[180px]">
                      Description
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
                  <tr
                    className={`text-gray-900/70 block lg:table-row`}>
                    <td
                      className={cellClass}
                      data-label={"Title"}
                    >{voucher?.voucherTitle}</td>
                    <td
                      className={cellClass}
                      data-label={"Description"}>
                      {voucher?.voucherDiscount} {voucher?.voucherTitle}
                    </td>
                    <td
                      className={cellClass}
                      data-label={"Voucher Code"}>
                      {voucher?.voucherCode}
                    </td>
                    <td
                      className={cellClass}
                      data-label={"Start date"}
                    >
                      {convertESTtoLocalTime(
                        voucher?.startDate as string
                      )}
                    </td>
                    <td className={cellClass} data-label={"End date"}>
                      {convertESTtoLocalTime(
                        voucher?.expiryDate as string
                      )}
                    </td>
                    <td className={cellClass} data-label={"Action"}>
                      <Link
                        href={voucher?.Browse || "#"}
                        className="underline"
                      >
                        Browse page
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal>
      <button
        type="button"
        className="bg-[#1B82F2] text-[#fff] px-2 py-1 rounded-md"
        onClick={() => setIsOpened(true)}>
        Voucher Details
      </button>
    </>
  );
};
export default VoucherDetailsPopUp;
