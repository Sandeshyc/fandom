import React, { useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
type ProfileHeadProps = {
  profileExpanded: boolean;
  toggleProfile: () => void;
};
const ProfileHead = ({ profileExpanded, toggleProfile }: ProfileHeadProps) => {
  return (
    <div className="flex justify-between">
      <div className="pr-2">
        <p className="text-lg lg:text-[22px] text-[#11355E] font-semibold">
          Profile Details
        </p>
      </div>
      <button type="button" onClick={toggleProfile} className="w-[25px]">
        <ChevronDownIcon
          className={`active:opacity-65 h-6 w-6 text-[#11355E] ${
            profileExpanded ? "rotate-180" : null
          }`}
        />
      </button>
    </div>
  );
};
export default ProfileHead;
