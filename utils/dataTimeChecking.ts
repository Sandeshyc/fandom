import {dateToDay} from 'utils/yearFromDate';
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