import {dateToDay} from 'utils/yearFromDate';
export const isOnAir = (onAir:string) => {
    const {day, hour, minute} = dateToDay(onAir);
    if(day === 0 && hour === 0 && minute === 0){
        return true;
    }
    return false;
}