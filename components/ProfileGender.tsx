import { type } from "os";
import React, {useEffect} from "react";
import { UserIcon, DropDownIcon } from "@/utils/CustomSVGs";
type ProfileGendereProps = {
    isUpdateMode: boolean;
    gender: string;
    setGender: (gender: string) => void;
}
const ProfileGender = (
    {
        isUpdateMode,
        gender,
        setGender
    }: ProfileGendereProps
) => {

    return(
        <div className="w-full">
            {(!isUpdateMode)?<label className='w-full text-[14px] text-[#FFFFFFB8]'>Gender</label>:null}
            {(isUpdateMode)?<ProfileGenderField 
                gender={gender}
                setGender={setGender}
            />:<p className='text-[14px] text-[#fff] py-1'>{(gender)?gender:'_'}</p>}
        </div>
    );
}
export default ProfileGender;

type ProfileGenderFiledProps = {
    gender: string;
    setGender: (gender: string) => void;
}
const ProfileGenderField = (
    {
        gender,
        setGender
    }: ProfileGenderFiledProps
) => {
    return(
        <div className="flex flex-wrap items-center text-[14px] px-2 py-1 bg-[#767680] bg-opacity-[22%] border rounded-md border-[#C6BCC6] h-[48px]">
            <UserIcon/>
            <div className="relative grow w-[80px]">
                <select
                    className={`bg-transparent w-full text-[14px] text-[#fff] pl-2 appearance-none outline-none before:content-["${UserIcon}"] z-10 relative`}
                    onChange={(e) => setGender(e.target.value)}
                    defaultValue={gender}>
                    <option value={''}>Gender</option>
                    <option value={'Male'}>Male</option>
                    <option value={'Female'}>Female</option>
                    <option value={'Other'}>Other</option>
                    </select>
                <div className="absolute right-0 top-0 h-full flex items-center">
                    <DropDownIcon/>
                </div>
            </div>
        </div>
    )
}