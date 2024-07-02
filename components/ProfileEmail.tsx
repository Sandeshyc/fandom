import { type } from "os";
import React, { useEffect } from "react";
import { EmailIcon } from "@/utils/CustomSVGs";
type ProfileEmailProps = {
  isUpdateMode: boolean;
  errors: any;
  touched: any;
  values: any;
  handleChange: any;
};
const ProfileEmail = ({
  isUpdateMode,
  errors,
  touched,
  values,
  handleChange,
}: ProfileEmailProps) => {
  return (
    <div className="w-full">
      {!isUpdateMode ? (
        <label className="w-full text-[14px] font-semibold text-[#454545]">
          Email
        </label>
      ) : null}
      {isUpdateMode ? (
        <>
          <div className="relative">
            <input
              name="userEmail"
              id="userEmail"
              value={values}
              onChange={handleChange}
              placeholder="Email"
              type="text"
              disabled={true}
              className="text-[#454545] w-full text-[14px] px-2 py-1 pl-10 border rounded-md border-[#C1C0C0] h-[48px] bg-[#FFF] bg-opacity-[22%] cursor-not-allowed"
            />
            <div className="absolute top-0 left-2 flex justify-center items-center h-full">
              <EmailIcon />
            </div>
          </div>
          {errors && touched ? (
            <p className="text-[#FF3636] text-[14px] py-1">{errors}</p>
          ) : null}
        </>
      ) : (
        <p className="text-[14px] text-[#454545] py-1">
          {values ? values : "_"}
        </p>
      )}
    </div>
  );
};
export default ProfileEmail;
