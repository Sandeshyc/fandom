import React from 'react';
import WarningMessage from '@/modules/Identities/WarningMessage';
type Props = {
    data: any;
};
const RentPlayNotice = (inputProps: Props) => {
    const { data } = inputProps;
    return (
        <>
        {(data?.message)&&(
            <WarningMessage 
                message={data?.message}
                textColor='#ffffffbb'
                iconColor='#B38B18'
            />
        )}
        </>
    );
}
export default RentPlayNotice