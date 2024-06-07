import { type } from "os";
import React, { useEffect, useState, forwardRef } from "react";
import { isDate, isEmpty } from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@/utils/CustomSVGs";
import { CalendarMonth } from "@mui/icons-material";
type ProfileBirthdayeProps = {
  isUpdateMode: boolean;
  birthday: Date | string | null;
  setBirthday: (date: Date) => void;
  errors: any;
  touched: any;
  values: any;
  handleChange: any;
};
const ProfileBirthday = ({
  isUpdateMode,
  birthday,
  setBirthday,
  errors,
  touched,
  values,
  handleChange,
}: ProfileBirthdayeProps) => {


  console.log('isBirthday: ', isDate(birthday));
  if(!isDate(birthday)){
    birthday = new Date(birthday || "");
  }

  // set maxdate is today - 13 years
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  // set min date is today - 100 years
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);

  const birthday2 = new Date(maxDate);
  // const birthday2 = new Date('2011-10-12');
  // console.log('birthday: ', birthday);
  let setSelectDate = new Date();
  if (birthday2 && isItDate(birthday2)) {
    setSelectDate = birthday2;
    // console.log('setSelectDate: ', setSelectDate, isDate(birthday2).toString());
    // console.log('saim  ', isItDate(birthday2));
  }
  const handelDataChange = (date: Date) => {
    setBirthday(date);
    setSelectDate = date;
    // set select date to values.userBirthday
    // newDate format is YYYY-MM-DD
    let newDate = "";
    if (date) {
      newDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
    handleChange({
      target: {
        name: "userBirthday",
        value: newDate || "",
      },
    });
  };
  return (
    <div className="w-full">
      {(!isUpdateMode)&& (
        <>
        <label className="w-full text-[14px] font-semibold text-[#454545]">
          Birthday
        </label>
        <p className="text-[14px] text-[#454545] py-1 h-[34px]">
          {birthday && birthday !== null ? showDate(birthday) : "_"}
        </p>
        </>
      )}
      {(isUpdateMode)&& (
        <>
          <div className="customDatePicker">
            <div className="relative w-full text-[14px] px-2 py-1 bg-[#FFF] bg-opacity-[22%] border rounded-md border-[#C1C0C0] h-[48px] text-left">
                <div className="w-full absolute top-0 left-0 h-full z-20">
                  <DatePicker
                    name="userBirthday"
                    dropdownMode="select"
                    maxDate={maxDate}
                    minDate={minDate}
                    onChange={handelDataChange}
                    // onChange={(date) => setSelectedDate(date)}
                    placeholderText={isEmpty(values.userBirthday) ? "Birthday" : ""}
                    dateFormat="yyyy-MM-dd"
                    selected={(birthday && isItDate(birthday)) ? birthday : null}
                    isClearable={(birthday && isItDate(birthday)) ? true : false}
                    customInput={<ExampleCustomInput />}
                    showYearDropdown
                    showMonthDropdown
                  />
                </div>
                {(isEmpty(values.userBirthday))&&(
                  <>
                  <p className="absolute top-0 left-0 text-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-1 h-[48px] flex items-center z-10">
                    Birth Date
                  </p>
                  <div className="absolute top-[13px] z-10 right-0 px-2 flex justify-center items-center h-[18px] lg:h-[24px] text-[10px]">
                    <CalendarMonth
                      sx={{
                        fontSize: 18,
                        color: "#5F576F",
                      }}/>
                  </div>
                  </>
                )}
              </div>
          </div>
          {(errors.userBirthday && touched.userBirthday)&& (
            <p className="text-[#FF3636] text-[14px] py-1">
              {errors.userBirthday}
            </p>
          )}
        </>
      )}
    </div>
  );
};
export default ProfileBirthday;

const showDate = (date: any) => {
  if (!date) return "";
  // format date 2024-10-12
  if(isDate(date)){
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }
  if (isDate(date))
    return (
      getDayWithSuffix(date.getDate()) +
      " " +
      new Intl.DateTimeFormat("en", { month: "short" }).format(date) +
      " " +
      date.getFullYear()
    );
  if (typeof date === "string") return date.split("T")[0];
  return "";
};

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
};

const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
  <button type="button" className="w-full text-[#5F576F] placeholder-[#C1C0C0] text-[14px] lg:text-[16px] px-4 py-2 rounded-lg h-[48px] text-left" onClick={onClick} ref={ref}>
    {value}
  </button>
));