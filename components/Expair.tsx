import React from 'react'
import { ClockIcon } from '@heroicons/react/24/outline';
import {dateToDay} from 'utils/yearFromDate';
import {
    AccessTime
} from '@mui/icons-material';

interface TextHighlightProps {
    children: React.ReactNode,
    className?: string,
    style?: React.CSSProperties,
}

const TxtHL = ({children, style, className,} : TextHighlightProps) => {
    return (
        <span className={`text-green-400 lg:font-bold mx-1 first:ml-0 ${className}`} style={style}> {children} </span>
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
            Print = <><TxtHL>{minute}</TxtHL> {minute > 1 ? ' minutes' : ' minute'} left</>
        }else if(day === 0){
            Print = <><TxtHL>{hour}</TxtHL> {hour > 1 ? ' hours' : ' hour'} left</>
        }else{
            Print = <><TxtHL>{day}</TxtHL> 
            {day > 1 ? ' days' : ' day'} left</>
        }
    }else{
        Print = <><TxtHL>{day}</TxtHL> {day > 1 ? 'days' : 'day'}, <TxtHL>{hour}</TxtHL> {hour > 1 ? 'hours' : 'hour'} &  <TxtHL>{minute}</TxtHL> {minute > 1 ? 'minutes' : 'minute'} left</>
    }

    return (
        <p className="text-[12px] sm:text-sm md:text-base mb-0 md:mb-1 flex items-center">
            <span className='w-[26px]'>
                <AccessTime 
                sx={{
                    color: "white",
                    fontSize: "18px",
                }}
                className="mr-1"/>
            </span>
            <span>{Print}</span>
        </p>
    )
}

export default EnititlementEndDate