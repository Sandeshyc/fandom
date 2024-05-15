import React from 'react';
import {
    AccessTimeOutlined
} from '@mui/icons-material';
import {
    convertESTtoLocalTime,
} from "@/utils/yearFromDate";

type Props = {
    footer: {
        text: string;
        type: string;
        iconType?: string;
        textType?: string;
    } | any;
}
const CardFooter = ({footer}:Props) => {
    const text = footer?.text;
    let type = footer?.type || 'primary';
    const textType = footer?.textType;
    if(!text) return null;
    if(textType === 'badge'){
        return (
            <div className='flex flex-wrap justify-center w-full'>
                <p className={`mx-auto text-center min-w-[100px] text-[12px] py-1 px-3 w-auto rounded-tl-lg rounded-tr-lg shadow-lg bg-gradient-to-l from-red-700 to-red-500 text-white`}>
                    {text}
                </p>
            </div>
        )
    }
    return (
        <div className={`inline-block mb-2 mx-2 text-white bg-opacity-80 px-1 rounded-md  bg-black py-1`}>
            <p className='flex flex-wrap items-center text-[10px] lg:text-xs'>
                {(footer?.iconType === 'clock')&&<AccessTimeOutlined className='mr-1' 
                    sx={{fontSize: '1rem'}}
                />}
                {(textType === 'date' || textType === 'Date')?(convertESTtoLocalTime(text))
                :
                (text)
                }
            </p>
        </div>
    );
}
export default CardFooter;