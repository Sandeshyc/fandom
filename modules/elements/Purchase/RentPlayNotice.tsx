import React from 'react';
import WarningMessage from '@/modules/Identities/WarningMessage';
import InfoMessage from '@/modules/Identities/InfoMessage';
type Props = {
    data: any;
};
const RentPlayNotice = (inputProps: Props) => {
    const { data } = inputProps;
    return (
        <>
        {(data?.message)&&(
            <>
            {(data?.message === 'Coming soon!')?(
                <InfoMessage 
                    message={data?.message}
                    textColor='#ffffffbb'
                    iconColor='#fff'
                />
            ):(
                <WarningMessage 
                    message={data?.message}
                    textColor='#ffffffbb'
                    iconColor='#B38B18'
                />
            )}
            </>
        )}
        </>
    );
}
export default RentPlayNotice