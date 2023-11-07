import { type } from "os";
import React, {useEffect} from "react";
type ProfileMobileProps = {
    isUpdateMode: boolean;
    mobile: string;
    setMobile: (mobile: string) => void;
}
const ProfileMobile = (
    {
        isUpdateMode,
        mobile,
        setMobile
    }: ProfileMobileProps
) => {
    return(
        <div className="w-full">
            <label className='w-full text-[14px] text-[#FFFFFFB8]'>Mobile</label>
            {(isUpdateMode)?<input 
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            type="text" 
            className='w-full text-[14px] px-2 py-1 bg-transparent border rounded-md border-[#C6BCC6] h-[34px]'/>:<p className='text-[14px] text-[#fff] py-1 h-[34px]'>{(mobile)?mobile:'_'}</p>}
        </div>
    );
}
export default ProfileMobile;