import { type } from "os";
import React, {useEffect} from "react";
import { EmailIcon } from "@/utils/CustomSVGs";
type ProfileEmailProps = {
    isUpdateMode: boolean;
    email: string;
    setEmail: (email: string) => void;
}
const ProfileEmail = (
    {
        isUpdateMode,
        email,
        setEmail
    }: ProfileEmailProps
) => {
    return(
        <div className="w-full">
            {(!isUpdateMode)?<label className='w-full text-[14px] text-[#FFFFFFB8]'>Email</label>:null}
            {(isUpdateMode)?<div className="relative"><input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="text" 
            className='w-full text-[14px] px-2 py-1 pl-10 border rounded-md border-[#767680] h-[48px] bg-[#767680] bg-opacity-[22%]'/><div className="absolute top-0 left-2 flex justify-center items-center h-full">
            <EmailIcon/>
          </div>
        </div>:<p className='text-[14px] text-[#fff] py-1'>{(email)?email:'_'}</p>}
        </div>
    );
}
export default ProfileEmail;