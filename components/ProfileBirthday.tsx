import { type } from "os";
import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@/utils/CustomSVGs";
type ProfileBirthdayeProps = {
    isUpdateMode: boolean;
}
const ProfileBirthday = (
    {
        isUpdateMode
    }: ProfileBirthdayeProps
) => {
    const [birthday, setBirthday] = useState(null);

    return(
        <div className="w-full">
            {(!isUpdateMode)?<label className='w-full text-[14px] text-[#FFFFFFB8]'>Birthday</label>:null}
            {(isUpdateMode)?<div className="flex flex-wrap items-center text-[14px] px-2 py-1 bg-[#767680] bg-opacity-[22%] border rounded-md border-[#C6BCC6] h-[48px]">
            <CalendarIcon/>
            <div className="relative grow w-[80px]">
                <DatePicker
                selected={birthday}
                onChange={(date) => setBirthday(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText={(!birthday)?'Birthday':''}
                className="w-full text-[14px] text-[#fff] px-2 bg-transparent outline-none z-10 relative"/>
                {/* <p className="w-full text-[12px] text-[#fff] px-2 bg-transparent outline-none absolute m-0 p-0 top-0 left-0 h-full w-full z-0">{birthday?.toDateString()}</p> */}
            </div>
        </div>:<p className='text-[14px] text-[#fff] py-1 h-[34px]'>{(birthday && (birthday !== null))?birthday?.toDateString():'_'}</p>}
        </div>
    );
}
export default ProfileBirthday;
