import React from 'react';
import BadgeMobile from '@/modules/Identities/BadgeMobile';
type Props = {
    header: {
        text: string;
        type: string;
    } | any;
}
const CardHeaderMobile = ({header}:Props) => {
    const text = header?.text;
    const type = header?.type || 'blue';
    if(!text) return null;
    return (
        <BadgeMobile
        text={text}
        theme={type}
        />
    );
}
export default CardHeaderMobile;