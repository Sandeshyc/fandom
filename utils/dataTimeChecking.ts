import {dateToDay} from 'utils/yearFromDate';
import { isDate, isEmpty } from "lodash";

export const isOnAir = (onAir:string) => {
    const {day, hour, minute} = dateToDay(onAir);
    if(day === 0 && hour === 0 && minute === 0){
        return true;
    }
    return false;
}



export const isItDate = (date: any) => {
    return date instanceof Date && !isNaN(date.valueOf());
}
  
export const getDayWithSuffix = (day: number) => {
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

export const showDate = (date: any) => {
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