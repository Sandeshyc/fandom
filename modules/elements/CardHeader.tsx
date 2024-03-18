import React from 'react';
import BadgeDesktop from '@/modules/Identities/BadgeDesktop';
type Props = {
    header: {
        text: string;
        type: string;
    }
}
const CardHeader = ({header}:Props) => {
    const text = header?.text;
    const type = header?.type || 'primary';
    if(!text) return null;
    return (
        <BadgeDesktop
        text={text}
        theme={type}
        />
    );
}
export default CardHeader;