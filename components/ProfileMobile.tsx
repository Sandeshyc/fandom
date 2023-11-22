import { type } from "os";
import React, {useEffect} from "react";
import { MobileIcon } from "@/utils/CustomSVGs";
type ProfileMobileProps = {
    isUpdateMode: boolean;
    errors: any; 
    touched: any;
    values: any;
    handleChange: any;
}
const ProfileMobile = (
    {
        isUpdateMode,
        errors,
        touched,
        values,
        handleChange,
    }: ProfileMobileProps
) => {
    return(
        <div className="w-full">
            {(!isUpdateMode)?<label className='w-full text-[14px] text-[#FFFFFFB8]'>Mobile</label>:null}
            {(isUpdateMode)?<><ProfileMobileGroup
                errors={errors}
                touched={touched}
                values={values}
                handleChange={handleChange}
            />{(errors.userPhone && touched.userPhone)?<p className='text-[#FF3636] text-[14px] py-1'>{errors.userPhone}</p>:null}</>:<p className='text-[14px] text-[#fff] py-1'>{(values.userPhone)?values.userPhone:'_'}</p>}
        </div>
    );
}
export default ProfileMobile;

type ProfileMobileGroupProps = {
    errors: any; 
    touched: any;
    values: any;
    handleChange: any;
}
const ProfileMobileGroup = (
    {
        errors,
        touched,
        values,
        handleChange,
    }: ProfileMobileGroupProps
) => {
    return(
        <div className="w-full">
            <div className="flex flex-wrap w-full items-center text-[14px] px-2 py-1 border rounded-md border-[#767680] h-[48px] bg-[#767680] bg-opacity-[22%]">
                <div className="flex">
                    <MobileIcon/>
                    <ProfileCountryCode
                        errors={errors}
                        touched={touched}
                        values={values}
                        handleChange={handleChange}/>
                </div>
                <div className="mx-2 text-[#CCCCCD]">|</div>
                <div className="grow w-[150px] bg-red">
                    <ProfileMobileField
                    errors={errors}
                    touched={touched}
                    values={values}
                    handleChange={handleChange} />
                </div>
            </div>
        </div>
    );
}

type ProfileCountryCodeProps = {
    errors: any; 
    touched: any;
    values: any;
    handleChange: any;
}
const ProfileCountryCode = (
    {
        errors,
        touched,
        values,
        handleChange,
    }: ProfileCountryCodeProps
) => {
    return(
        <select 
            name="userCountryCode"
            id="userCountryCode"
            value={values.userCountryCode}
            onChange={handleChange}
            className='w-full text-[14px] bg-transparent pl-2'>
            <option value="+91">+91</option>
            <option value="+92">+92</option>
            <option value="+88">+88</option>
            <option value="+02">+02</option>
        </select>
    );
}

type ProfileMobileFieldProps = {
    errors: any; 
    touched: any;
    values: any;
    handleChange: any;
}
const ProfileMobileField = (
    {
        errors,
        touched,
        values,
        handleChange,
    }: ProfileMobileFieldProps
) => {
    return(
        <div className="w-full">
            <input 
            name="userPhone"
            id="userPhone"
            value={values.userPhone}
            onChange={handleChange}
            placeholder="e.g. 012340 56789"
            type="text" 
            className='w-full text-[14px] bg-transparent focus:outline-none'/>
        </div>
    );
}