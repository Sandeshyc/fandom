import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { updateProfile } from "@/services/api";
type Props = {
  profileData: any;
};
const CommunicationDetails = ({ profileData }: Props) => {
  // console.log('profileData: ', profileData);
  const [userid, setUserid] = React.useState("");
  const [expanded, setExpanded] = useState(false);
  const [marketing, setMarketing] = useState(profileData?.marketing);
  const [validateError, setValidateError] = useState("");
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const toggleMarketingHandle = () => {
    const data = {
      userId: userid,
      marketing: !marketing ? true : false,
    };
    // console.log('data: ', data);
    const _updateProfile = async () => {
      const response = await updateProfile(data);
      // console.log('response: ', response);
      if (response.status === "success") {
        setMarketing(!marketing);
        setValidateError("");
      } else {
        setValidateError("Something went wrong");
      }
    };
    _updateProfile();
  };
  useEffect(() => {
    const userInfo = window.localStorage.getItem("userInfo");
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if (userInfoObj.sub) {
        setUserid(userInfoObj.sub);
      }
    }
  }, []);
  return (
    <div
      className={`p-4 border border-[#C1C0C0] rounded-md bg-[#FFF] bg-opacity-[22%]`}
    >
      <div className="flex justify-between">
        <div className="pr-2">
          <p className="text-lg lg:text-[22px] text-[#11355E] font-medium">
            Communication Details
          </p>
        </div>
        <button type="button" onClick={toggleExpanded} className="w-[25px]">
          <ChevronDownIcon
            className={`active:opacity-65 h-6 w-6 text-[#11355E] ${
              expanded ? "rotate-180" : null
            }`}
          />
        </button>
      </div>
      <div
        className={`text-[#11355E] p-4 rounded-md mt-4 flex justify-between flex-wrap ${
          !expanded ? "hidden" : "flex"
        }`}
      >
        <InputCheckbox
          id="marketing"
          label="I agree to receive marketing communications (until I unsubscribe)."
          checked={marketing}
          onChange={toggleMarketingHandle}
        />
        {validateError && (
          <p className="w-full text-sm text-red-600">{validateError}</p>
        )}
      </div>
    </div>
  );
};
export default CommunicationDetails;

type InputCheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const InputCheckbox = ({
  id,
  label,
  checked,
  onChange,
}: InputCheckboxProps) => {
  return (
    <div className="flex flex-wrap w-full ">
      <div className="w-[70px]">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="hidden"
          id={id}
        />
        <label
          htmlFor={id}
          className={`relative block rounded-full w-12 h-6 transition-colors duration-300 focus:outline-none ${
            checked ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute left-0 top-0 inline-block w-6 h-6 transform transition-transform duration-300 rounded-full shadow-lg bg-white ${
              checked ? "translate-x-full" : ""
            }`}
          ></span>
        </label>
      </div>
      <p className="w-[200px] grow">{label}</p>
    </div>
  );
};
