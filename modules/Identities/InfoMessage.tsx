import React from 'react';
import { ReportProblem, HelpOutlined, Info, ContactSupportOutlined, InfoOutlined } from '@mui/icons-material';
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
        <div className={`flex flex-wrap justify-start items-center w-[150px] max-w-full ${className} `} style={styles}>
            <div className='w-[25px] flex justify-start items-center'>
                <Info
                sx={{ 
                    color: iconColor,
                    fontSize: '20px',
                    marginRight: '8px',
                }}/>
            </div>
            <div className='w-[80px] grow'>
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