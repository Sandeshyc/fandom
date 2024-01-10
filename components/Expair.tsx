import React from 'react'
import { ClockIcon } from '@heroicons/react/24/outline';
import {dateToDay, yearFromDate} from 'utils/yearFromDate';

interface TextHighlightProps {
    children: React.ReactNode,
    className?: string,
}

const TxtHL = ({children, style, className,} : TextHighlightProps) => {
    return (
        <span className={`text-green-400 text-[12px] lg:text-xs lg:font-bold mx-1 ${className}`} style={style}> {children} </span>
    )
}

interface EnititlementEndDateProps  {
    endDate: string,
    short?: boolean,
    base?: number,
}

const EnititlementEndDate = ({endDate, short = true, base = 0.5} : EnititlementEndDateProps) => {
    // console.log('endDate', endDate);
    const {day, hour, minute} = dateToDay(endDate); // Day Hour Minute

    let Print  = <></>;
    if(day === 0 && hour === 0 && minute === 0){
        Print = <><span className="text-red-500 lg:font-bold"> Expired!</span></>
    }else if(short){
        if(day === 0 && hour === 0){
            Print = <><TxtHL>{minute}</TxtHL> minutes left to watch!</>
        }else if(day === 0){
            Print = <><TxtHL>{hour}</TxtHL> hours left to watch!</>
        }else{
            Print = <><TxtHL>{day}</TxtHL> days left to watch!</>
        }
    }else{
        Print = <><TxtHL>{day}</TxtHL> days, <TxtHL>{hour}</TxtHL> hours &  <TxtHL>{minute}</TxtHL> minutes left to watch!</>
    }

    return (
        <p className="flex flex-wrap items-center text-sm">
            <ClockIcon className="text-white w-[16px] h-[16px] mr-1"/> {Print}
        </p>
    )
}

export default EnititlementEndDate