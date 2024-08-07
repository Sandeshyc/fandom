import { useState } from "react";
import Title from "@/modules/Identities/Title";
import { formatDateRange, isExpired } from "@/utils/yearFromDate";
import {
  CloseOutlined,
  ContentCopyOutlined,
  ContentCopyTwoTone,
} from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import { Button, IconButton, Tooltip } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Roboto } from "next/font/google";

const cellClass = `before:mr-4 before:font-medium before:text-gray-900 p-2 lg:py-4 flex flex-wrap justify-between lg:table-cell border-b border-gray-300/50 lg:first:pl-0 whitespace-nowrap`;

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

type VoucherType = {
  description: string;
  detailsPage: string;
  discount: string;
  endDate: string;
  membershipId: string;
  productName: string;
  startDate: string;
  status: string;
  title: string;
  voucherCode: string;
};

type Props = {
  vouchers: VoucherType[];
  planName: string;
};
const VoucherDetailsPopUp = ({ vouchers, planName }: Props) => {
  const [isOpened, setIsOpened] = useState(false);
  // console.log('VoucherDetailsPopUp::voucher', vouchers);
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
            onClick={handleClose}
          >
            <CloseOutlined sx={{ fontSize: 28 }} className="text-[#454545]" />
          </div>
          <div className="p-4 pt-8">
            <Title
              tag="h3"
              size="2xl"
              color="text-[#5F576F]"
              className="mb-8 text-center"
            >
              Available Vouchers of{" "}
              <span className="font-semibold">{planName}</span>
            </Title>
            <div className="w-full overflow-y-hidden lg:overflow-x-auto">
              <table className="w-full text-left paymentHistoryTable">
                <thead className="hidden lg:table-header-group text-[#454545]">
                  <tr className="px-4">
                    <th className="p-2 whitespace-nowrap font-semibold min-w-[130px] pl-0">
                      Product
                    </th>
                    <th className="p-2 whitespace-nowrap font-semibold min-w-[130px] pl-0">
                      Title
                    </th>
                    <th className="p-2 whitespace-nowrap font-semibold min-w-[80px]">
                      Discount
                    </th>
                    <th className="p-2 whitespace-nowrap font-semibold min-w-[100px]">
                      Voucher Code
                    </th>
                    <th className="p-2 whitespace-nowrap font-semibold min-w-[180px]">
                      Validity Period
                    </th>
                    <th className="p-2 whitespace-nowrap font-semibold min-w-[80px] text-center">
                      More Details
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {Array.isArray(vouchers) && vouchers.length > 0 ? (
                    vouchers.map((voucher, index) => (
                      <VoucherDetails
                        key={`${voucher.membershipId}-${index}`}
                        voucher={voucher}
                      />
                    ))
                  ) : (
                    <NoVoucherFound />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal>
      <button
        type="button"
        className="bg-[#1B82F2] text-[#fff] px-2 py-1 rounded-md mt-2"
        onClick={() => setIsOpened(true)}
      >
        Available Vouchers
      </button>
    </>
  );
};
export default VoucherDetailsPopUp;

const NoVoucherFound = () => {
  return (
    <tr>
      <td colSpan={12} className="text-center text-base py-4 text-[#DA312C]">
        No vouchers found!
      </td>
    </tr>
  );
};

const VoucherDetails = ({ voucher }: { voucher: any }) => {
  const [copyText, setCopyText] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const copyTextFunc = (text: string) => {
    navigator?.clipboard?.writeText(text);
    setCopyText(text);
  };

  return (
    <tr className={`text-gray-900/70 block lg:table-row`}>
      <td className={cellClass} data-label={"Product"}>
        {voucher?.productName ?? "No Product Name"}
      </td>
      <td className={`${cellClass} items-center `} data-label={"Title"}>
        <div className="whitespace-normal break-words max-w-[60%] md:max-w-[100%]">
          {voucher?.title}
          <span>
            <Tooltip
              title={voucher?.description}
              open={showTooltip}
              onOpen={() => setShowTooltip(true)}
              onClose={() => setShowTooltip(false)}
            >
              <IconButton onClick={() => setShowTooltip(!showTooltip)}>
                <InfoIcon className="pl-1" />
              </IconButton>
            </Tooltip>
          </span>
        </div>
      </td>
      <td className={`${cellClass} text-right`} data-label={"Discount"}>
        <span className="md:pr-16">{voucher?.discount}</span>
      </td>
      <td className={cellClass} data-label={"Voucher Code"}>
        <span>
          {voucher?.voucherCode}
          {copyText === voucher?.voucherCode ? (
            <span className="text-black ml-2" title="Copied">
              <ContentCopyTwoTone sx={{ fontSize: 16, color: "#222" }} />
            </span>
          ) : (
            <span
              className="text-black/50 ml-2 cursor-copy"
              title="Copy"
              onClick={() => copyTextFunc(voucher?.voucherCode)}
            >
              <ContentCopyOutlined sx={{ fontSize: 16, color: "#C1C0C0" }} />
            </span>
          )}
        </span>
      </td>
      <td className={cellClass} data-label={"Validity Period"}>
        {formatDateRange(voucher?.startDate, voucher?.endDate)}
      </td>

      <td
        className={cellClass}
        data-label={"More Details"}
        style={{ textAlign: "center" }}
      >
        {voucher?.detailsPage ? (
          <a
            href={voucher?.detailsPage}
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            Details
          </a>
        ) : (
          <span>-----</span>
        )}
      </td>
    </tr>
  );
};
