import { type } from "os";
import React, {useEffect} from "react";
import {UserIcon} from "@/utils/CustomSVGs";

type ProfileNameProps = {
    isUpdateMode: boolean;
    name: string;
    lastName: string;
    setName: (name: string) => void;
    setLastName: (lastName: string) => void;
}
const ProfileName = (
    {
        isUpdateMode,
        name,
        lastName,
        setName,
        setLastName
    }: ProfileNameProps
) => {

    return(
        <div className="w-full md:flex md:flex-wrap">
            {(!isUpdateMode)?<label className='w-full text-[14px] text-[#FFFFFFB8]'>Name</label>:null}

            {(isUpdateMode)?<><div className="mb-3 md:w-[50%] w-full  md:pr-2"><ProfileNameField
                name={name}
                setName={setName}
            /></div>
            <div className="mb-3 md:w-[50%] w-full md:pl-2">
            <ProfileLastNameField
                lastName={lastName}
                setLastName={setLastName}
            /></div>
            </>:<p className='text-[14px] text-[#fff] py-1'>{(name || lastName)?name+' '+lastName:'_'}</p>}
        </div>
    );
}
export default ProfileName;

type ProfileFirstNameProps = {
    name: string;
    setName: (name: string) => void;
}
const ProfileNameField = (
    {
        name,
        setName,
    }: ProfileFirstNameProps
) => {

    return(
        <div className="w-full">
            <div className="relative">
                <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First Name"
                    type="text" 
                    className='w-full text-[14px] px-2 py-1 pl-10 border rounded-md border-[#767680] h-[48px] bg-[#767680] bg-opacity-[22%]'/><div className="absolute top-0 left-2 flex justify-center items-center h-full">
                    <UserIcon/>
                </div>
            </div>
        </div>
    );
}

type ProfileLastNameProps = {
    lastName: string;
    setLastName: (lastName: string) => void;
}

const ProfileLastNameField = (
    {
        lastName,
        setLastName,
    }: ProfileLastNameProps
) => {

    return(
        <div className="w-full">
            <div className="relative">
                <input 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    type="text" 
                    className='w-full text-[14px] px-2 py-1 pl-10 border rounded-md border-[#767680] h-[48px] bg-[#767680] bg-opacity-[22%]'/><div className="absolute top-0 left-2 flex justify-center items-center h-full">
                    <UserIcon/>
                </div>
            </div>
        </div>
    );
}