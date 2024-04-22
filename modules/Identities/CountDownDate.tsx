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
            Print = <><TxtHL>{minute}</TxtHL> {(minute > 1)?'minutes':'minute'} left!</>
        }else if(day === 0){
            Print = <><TxtHL>{hour}</TxtHL> {(hour > 1)?'hours':'hour'} left!</>
        }else{
            Print = <><TxtHL>{day}</TxtHL> {(day > 1)?'days':'day'} left!</>
        }
    }else{
        Print = <><TxtHL>{day}</TxtHL> {(day > 1)?'days':'day'}, <TxtHL>{hour}</TxtHL> {(hour > 1)?'hours':'hour'} &  <TxtHL>{minute}</TxtHL> {(minute > 1)?'minutes':'minute'} left!</>
    }

    return (
        <span className="flex flex-wrap items-center text-xs">
            {Print}
        </span>
    )
}

export default CountDownDate