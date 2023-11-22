import { type } from "os";
import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@/utils/CustomSVGs";
import { isDate } from "lodash";
type ProfileBirthdayeProps = {
    isUpdateMode: boolean;
    birthday: Date | null;
    setBirthday: (date: Date) => void;
    errors: any; 
    touched: any;
    values: any;
    handleChange: any;
}
const ProfileBirthday = (
    {
        isUpdateMode,
        birthday,
        setBirthday,
        errors,
        touched,
        values,
        handleChange,
    }: ProfileBirthdayeProps
) => {
    // set maxdate is today - 13 years
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 13);  

    // set min date is today - 100 years
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);

    const birthday2 = new Date(maxDate);
    // const birthday2 = new Date('2011-10-12');
    // console.log('birthday: ', birthday);
    let setSelectDate = new Date();
    if(birthday2 && isItDate(birthday2)){
        setSelectDate = birthday2;
        // console.log('setSelectDate: ', setSelectDate, isDate(birthday2).toString());
        // console.log('saim  ', isItDate(birthday2));
    }
    const handelDataChange = (date: Date) => {
        setBirthday(date);
        setSelectDate = date;  
        // set select date to values.userBirthday
        values.userBirthday = date;
        
    }  
    return(
        <div className="w-full">
            {(!isUpdateMode)?<label className='w-full text-[14px] text-[#FFFFFFB8]'>Birthday</label>:null}
            {(isUpdateMode)?<><div className="flex flex-wrap items-center text-[14px] px-2 py-1 bg-[#767680] bg-opacity-[22%] border rounded-md border-[#C6BCC6] h-[48px]">
            <CalendarIcon/>
            <div className="relative grow w-[80px]">
                <DatePicker
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                maxDate={maxDate}
                minDate={minDate}
                selected={setSelectDate}
                onChange={handelDataChange}
                placeholderText={(!birthday)?'Birthday':''}
                className="w-full text-[14px] text-transparent px-2 bg-transparent outline-none z-10 relative"/>
                <p className="w-full text-[12px] text-[#fff] px-2 bg-transparent outline-none absolute m-0 p-0 top-0 left-0 h-full z-0">{(!birthday)?'Birthday':showDate(birthday)}</p>
            </div>
        </div>
        {(errors.userBirthday && touched.userBirthday)?<p className='text-[#FF3636] text-[14px] py-1'>{errors.userBirthday}</p>:null}
        </>:<p className='text-[14px] text-[#fff] py-1 h-[34px]'>
            {(birthday && (birthday !== null))?showDate(birthday):'_'}
            </p>}
        </div>
    );
}
export default ProfileBirthday;

const showDate = (date: any) => {
    if(!date) return '';
    if(isDate(date)) return getDayWithSuffix(date.getDate()) +' '+ new Intl.DateTimeFormat('en', { month: 'short' }).format(date) + ' ' + date.getFullYear();
    if(typeof date === 'string') return date.split('T')[0];
    return '';
}


function getDayWithSuffix(day: number) {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
}

const isItDate = (date: any) => {
    return date instanceof Date && !isNaN(date.valueOf());
}
