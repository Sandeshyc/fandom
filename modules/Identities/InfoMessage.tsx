import React from 'react';
import { ReportProblem, HelpOutlined } from '@mui/icons-material';
type Props = {
    message: string;
    iconColor?: string;
    textColor?: string;
    className?: string;
    styles?: React.CSSProperties;
}
const InfoMessage = ({ 
    message,
    iconColor,
    textColor,
    className,
    styles,
}: Props) => {
    iconColor = iconColor || '#EAB307';
    textColor = textColor || '#fff';
    return (
        <div className={`p-2 flex flex-wrap items-center mb-2 max-w-[410px] ${className} `} style={styles}>
            <div className='w-[25px]'>
                <HelpOutlined
                sx={{ 
                    color: iconColor,
                    fontSize: '20px',
                    marginRight: '8px',
                }}/>
            </div>
            <div className='w-[180px] flex-grow'>
                <p
                className='text-xs xl:text-sm'
                style={{
                    color: textColor,                
                }}
                >{message}</p>
            </div>
        </div>
    );
};
export default InfoMessage;