import React, { useEffect, useState } from "react";
import {CheckCircleOutline} from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import { Roboto } from "next/font/google";
import { CloseOutlined } from "@mui/icons-material";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});
const AlreadyPurchased = () => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    window.location.reload();
  };
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="Email Verify Modal"
        aria-describedby="Email Verify Modal"
        onClose={handleClose}
        className={`flex justify-center items-center ${roboto.className}`}
      >
        <div className="rounded-md w-[90%] max-w-[540px] bg-white relative text-[#5F576F] border border-white/70">
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={handleClose}
          >
            <CloseOutlined sx={{ fontSize: 28 }} className="text-[#454545]" />
          </div>
          <div className="p-4 pt-8 min-h-[250px] flex justify-center items-center">
            <div className="text-center">
              <CheckCircleOutline 
                sx={{ fontSize: 60 }} 
                className="text-green-500 mb-2"
              />
              <h3 className="text-[#5F576F] text-center text-2xl font-semibold mb-2">
                You have already purchased this item.
              </h3>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AlreadyPurchased;
