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
    const type = footer?.type || 'primary';
    const textType = footer?.textType;
    if(!text) return null;
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