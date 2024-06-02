import { type } from "os";
import React, { useEffect } from "react";
import { UserIcon, DropDownIcon } from "@/utils/CustomSVGs";
type ProfileGendereProps = {
  isUpdateMode: boolean;
  errors: any;
  touched: any;
  values: any;
  handleChange: any;
};
const ProfileGender = ({
  isUpdateMode,
  errors,
  touched,
  values,
  handleChange,
}: ProfileGendereProps) => {
  return (
    <div className="w-full">
      {!isUpdateMode ? (
        <label className="w-full text-[14px] font-semibold text-[#454545]">
          Gender
        </label>
      ) : null}
      {isUpdateMode ? (
        <>
          <ProfileGenderField values={values} handleChange={handleChange} />
          {errors.userGender && touched.userGender ? (
            <p className="text-[#FF3636] text-[14px] py-1">
              {errors.userGender}
            </p>
          ) : null}
        </>
      ) : (
        <p className="text-[14px] text-[#454545] py-1">
          {values.userGender ? values.userGender : "_"}
        </p>
      )}
    </div>
  );
};
export default ProfileGender;

type ProfileGenderFiledProps = {
  values: any;
  handleChange: any;
};
const ProfileGenderField = ({
  values,
  handleChange,
}: ProfileGenderFiledProps) => {
  return (
    <div className="flex flex-wrap items-center text-[14px] px-2 py-1 bg-[#FFF] bg-opacity-[22%] border rounded-md border-[#C1C0C0] h-[48px]">
      <UserIcon />
      <div className="relative grow w-[80px]">
        <select
          className={`bg-transparent w-full text-[14px] text-[#454545] pl-2 appearance-none outline-none before:content-["${UserIcon}"] z-10 relative`}
          name="userGender"
          id="userGender"
          defaultValue={values.userGender}
          onChange={handleChange}
        >
          <option value={""}>Gender</option>
          <option value={"Male"}>Male</option>
          <option value={"Female"}>Female</option>
          <option value={"Other"}>Other</option>
        </select>
        <div className="absolute right-0 top-0 h-full flex items-center">
          <DropDownIcon />
        </div>
      </div>
    </div>
  );
};
