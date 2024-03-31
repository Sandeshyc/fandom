import React from 'react'
import { ClockIcon } from '@heroicons/react/24/outline';
import {dateToDay, yearFromDate} from 'utils/yearFromDate';

interface TextHighlightProps {
    children: React.ReactNode,
    className?: string,
}

const TxtHL = ({children, className,} : TextHighlightProps) => {
    return (
        <span className={`text-green-400 lg:font-bold mx-1 ${className}`}> {children} </span>
    )
}

interface Props  {
    endDate: string,
    short?: boolean,
    base?: number,
}

const CountDownDate = ({endDate, short = true, base = 0.5} : Props) => {
    // console.log('endDate', endDate);
    const {day, hour, minute} = dateToDay(endDate); // Day Hour Minute
    // console.log('day, hour, minuted: ', day, hour, minute);

    let Print  = <></>;
    if(day === 0 && hour === 0 && minute === 0){
        Print = <><span className="text-green-500 lg:font-bold"> Published!</span></>
    }else if(short){
        if(day === 0 && hour === 0){
            Print = <><TxtHL>{minute}</TxtHL> minutes left!</>
        }else if(day === 0){
            Print = <><TxtHL>{hour}</TxtHL> hours left!</>
        }else{
            Print = <><TxtHL>{day}</TxtHL> days left!</>
        }
    }else{
        Print = <><TxtHL>{day}</TxtHL> days, <TxtHL>{hour}</TxtHL> hours &  <TxtHL>{minute}</TxtHL> minutes left!</>
    }

    return (
        <p className="flex flex-wrap items-center text-xs">
            {Print}
        </p>
    )
}

export default CountDownDate