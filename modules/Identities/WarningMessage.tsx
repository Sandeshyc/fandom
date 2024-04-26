import React from 'react';
import { ReportProblem } from '@mui/icons-material';
type Props = {
    message: string;
    iconColor?: string;
    textColor?: string;
    className?: string;
    styles?: React.CSSProperties;
}
const WarningMessage = ({ 
    message,
    iconColor,
    textColor,
    className,
    styles,
}: Props) => {
    iconColor = iconColor || '#EAB307';
    textColor = textColor || '#fff';
    return (
        <div className={`border border-yellow-500/70 p-2 py-1 flex flex-wrap items-center mb-2 rounded-md bg-black bg-opacity-40 max-w-[410px] ${className} `} style={styles}>
            <div className='w-[25px]'>
                <ReportProblem
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
export default WarningMessage;