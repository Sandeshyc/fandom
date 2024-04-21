import React from 'react';
import BadgeDesktop from '@/modules/Identities/BadgeDesktop';
type Props = {
    header: {
        text: string;
        type: string;        
    } | any;
    className?: string;
    style?: React.CSSProperties;
}
const CardHeader = ({header, 
    className, 
    style
}:Props) => {
    if(className === undefined) className = '';
    if(style === undefined) style = {};
    const text = header?.text;
    const type = header?.type || 'primary';
    if(!text) return null;
    return (
        <BadgeDesktop
        text={text}
        theme={type}
        className={className}
        style={style}
        />
    );
}
export default CardHeader;