import { type } from "os";
import React, { useEffect } from "react";
import { UserIcon } from "@/utils/CustomSVGs";

type ProfileNameProps = {
  isUpdateMode: boolean;
  errors: any;
  touched: any;
  values: any;
  handleChange: any;
};
const ProfileName = ({
  isUpdateMode,
  errors,
  touched,
  values,
  handleChange,
}: ProfileNameProps) => {
  return (
    <div className="w-full md:flex md:flex-wrap">
      {!isUpdateMode ? (
        <label className="w-full font-semibold text-[#454545]">Name</label>
      ) : null}
      {isUpdateMode ? (
        <>
          <div className="mb-3 md:w-[50%] w-full  md:pr-2">
            <ProfileNameField
              errors={errors}
              touched={touched}
              values={values}
              handleChange={handleChange}
            />
          </div>
          <div className="mb-3 md:w-[50%] w-full md:pl-2">
            <ProfileLastNameField
              errors={errors}
              touched={touched}
              values={values}
              handleChange={handleChange}
            />
          </div>
        </>
      ) : (
        <p className="text-[14px] text-[#454545] py-1">
          {values.firstName || values.lastName
            ? values.firstName + " " + values.lastName
            : "_"}
        </p>
      )}
    </div>
  );
};
export default ProfileName;

type ProfileFirstNameProps = {
  errors: any;
  touched: any;
  values: any;
  handleChange: any;
};
const ProfileNameField = ({
  errors,
  touched,
  values,
  handleChange,
}: ProfileFirstNameProps) => {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          placeholder="First Name"
          type="text"
          className="w-full text-[14px] px-2 py-1 pl-10 border rounded-md border-[#C1C0C0] h-[48px] bg-[#FFF] bg-opacity-[22%] text-[#454545]"
        />
        <div className="absolute top-0 left-2 flex justify-center items-center h-full">
          <UserIcon />
        </div>
      </div>
      {errors.firstName && touched.firstName ? (
        <p className="text-[#FF3636] text-[14px] py-1">{errors.firstName}</p>
      ) : null}
    </div>
  );
};

type ProfileLastNameProps = {
  errors: any;
  touched: any;
  values: any;
  handleChange: any;
};

const ProfileLastNameField = ({
  errors,
  touched,
  values,
  handleChange,
}: ProfileLastNameProps) => {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          type="text"
          className="w-full text-[14px] px-2 py-1 pl-10 border rounded-md border-[#C1C0C0] h-[48px] bg-[#FFF] bg-opacity-[22%] text-[#454545]"
        />
        <div className="absolute top-0 left-2 flex justify-center items-center h-full ">
          <UserIcon />
        </div>
      </div>
    </div>
  );
};
