import { type } from "os";
import React, {useEffect} from "react";
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
            <label className='w-full text-[14px] text-[#FFFFFFB8]'>Email</label>
            {(isUpdateMode)?<input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text" 
            className='w-full text-[14px] px-2 py-1 bg-transparent border rounded-md border-[#C6BCC6] h-[34px]'/>:<p className='text-[14px] text-[#fff] py-1 h-[34px]'>{(email)?email:'_'}</p>}
        </div>
    );
}
export default ProfileEmail;