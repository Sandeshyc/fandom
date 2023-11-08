import { type } from "os";
import React, {useEffect} from "react";
import { MobileIcon } from "@/utils/CustomSVGs";
type ProfileMobileProps = {
    isUpdateMode: boolean;
    mobile: string;
    countryCode: string;
    setCountryCode: (countryCode: string) => void;
    setMobile: (mobile: string) => void;
}
const ProfileMobile = (
    {
        isUpdateMode,
        mobile,
        setMobile,
        countryCode,
        setCountryCode
    }: ProfileMobileProps
) => {
    return(
        <div className="w-full">
            {(!isUpdateMode)?<label className='w-full text-[14px] text-[#FFFFFFB8]'>Mobile</label>:null}
            {(isUpdateMode)?<ProfileMobileGroup
                mobile={mobile}
                setMobile={setMobile}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
            />:<p className='text-[14px] text-[#fff] py-1'>{(mobile)?countryCode+' '+mobile:'_'}</p>}
        </div>
    );
}
export default ProfileMobile;

type ProfileMobileGroupProps = {
    mobile: string;
    countryCode: string;
    setCountryCode: (countryCode: string) => void;
    setMobile: (mobile: string) => void;
}
const ProfileMobileGroup = (
    {
        mobile,
        setMobile,
        countryCode,
        setCountryCode
    }: ProfileMobileGroupProps
) => {
    return(
        <div className="w-full">
            <div className="flex flex-wrap w-full items-center text-[14px] px-2 py-1 border rounded-md border-[#767680] h-[48px] bg-[#767680] bg-opacity-[22%]">
                <div className="flex">
                    <MobileIcon/>
                    <ProfileCountryCode
                        countryCode={countryCode}
                        setCountryCode={setCountryCode}/>
                </div>
                <div className="mx-2 text-[#CCCCCD]">|</div>
                <div className="grow w-[150px] bg-red">
                    <ProfileMobileField
                    mobile={mobile}
                    setMobile={setMobile}/>
                </div>
            </div>
        </div>
    );
}

type ProfileCountryCodeProps = {
    countryCode: string;
    setCountryCode: (countryCode: string) => void;
}
const ProfileCountryCode = (
    {
        countryCode,
        setCountryCode
    }: ProfileCountryCodeProps
) => {
    return(
        <select 
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className='w-full text-[14px] bg-transparent pl-2'>
            <option value="+91">+91</option>
            <option value="+92">+92</option>
            <option value="+88">+88</option>
            <option value="+02">+02</option>
        </select>
    );
}

type ProfileMobileFieldProps = {
    mobile: string;
    setMobile: (mobile: string) => void;
}
const ProfileMobileField = (
    {
        mobile,
        setMobile
    }: ProfileMobileFieldProps
) => {
    return(
        <div className="w-full">
            <input 
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="e.g. 012340 56789"
            type="text" 
            className='w-full text-[14px] bg-transparent focus:outline-none'/>
        </div>
    );
}