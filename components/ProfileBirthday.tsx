import { type } from "os";
import React, {useEffect} from "react";
type ProfileBirthdayeProps = {
    isUpdateMode: boolean;
    birthday: string;
    setBirthday: (birthday: string) => void;
}
const ProfileBirthday = (
    {
        isUpdateMode,
        birthday,
        setBirthday
    }: ProfileBirthdayeProps
) => {

    return(
        <div className="w-full">
            <label className='w-full text-[14px] text-[#FFFFFFB8]'>Birthday</label>
            {(isUpdateMode)?<input 
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            type="date" 
            className='w-full text-[14px] px-2 py-1 bg-transparent border rounded-md border-[#C6BCC6] h-[34px]'/>:<p className='text-[14px] text-[#fff] py-1 h-[34px]'>{(birthday)?birthday:'_'}</p>}
        </div>
    );
}
export default ProfileBirthday;