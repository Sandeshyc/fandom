import { type } from "os";
import React, {useEffect} from "react";
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
            <label className='w-full text-[14px] text-[#FFFFFFB8]'>Gender</label>
            {(isUpdateMode)?<select
                        className='w-full text-[14px] px-2 py-1 bg-transparent border rounded-md border-[#C6BCC6] h-[34px]' defaultValue={gender}>
                        <option value={''}>-- select --</option>
                        <option value={'Male'}>Male</option>
                        <option value={'Female'}>Female</option>
                        <option value={'Other'}>Other</option>
                      </select>:<p className='text-[14px] text-[#fff] py-1 h-[34px]'>{(gender)?gender:'_'}</p>}
        </div>
    );
}
export default ProfileGender;