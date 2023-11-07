import { type } from "os";
import React, {useEffect} from "react";
type ProfileNameProps = {
    isUpdateMode: boolean;
    name: string;
    setName: (name: string) => void;
}
const ProfileName = (
    {
        isUpdateMode,
        name,
        setName
    }: ProfileNameProps
) => {

    return(
        <div className="w-full">
            <label className='w-full text-[14px] text-[#FFFFFFB8]'>Name</label>
            {(isUpdateMode)?<input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text" 
            className='w-full text-[14px] px-2 py-1 bg-transparent border rounded-md border-[#C6BCC6] h-[34px]'/>:<p className='text-[14px] text-[#fff] py-1 h-[34px]'>{(name)?name:'_'}</p>}
        </div>
    );
}
export default ProfileName;