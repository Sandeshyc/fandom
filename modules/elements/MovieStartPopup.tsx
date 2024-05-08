import React from 'react';
import { useRouter } from 'next/router';
import Text from '@/modules/Identities/Text';
import {
    Info
} from '@mui/icons-material';
import {
    setEntitlementValidity
} from '@/services/api';
type Props = {
    setIsMovieStartPopUp : any;
    backUrl: string;
    validityPeriod: number | string;
    userId: string;
    contentId: string;
    transactionId: string;
}
const MovieStartPopup = ({
    setIsMovieStartPopUp,
    backUrl,
    validityPeriod,
    userId,
    contentId,
    transactionId
}:Props) => {
    const route = useRouter();
    const handleStart = async () => {
        const data = {
            "contentId": contentId,
            "transactionId": transactionId
        };
        const res = await setEntitlementValidity(userId, data);
        // console.log('res', res);
        if(res.status === 'success'){
            setIsMovieStartPopUp(false);
            // route.push(backUrl);
        }else{
            // console.log('Error: ', res.message);        
        }
    }
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black/60 z-50 flex justify-center items-center'>
            <div className='bg-gray-900 w-[420px] max-w-[90%] relative text-white border border-white/70 rounded-lg p-4'>
                <div className='flex mb-2'>
                    <Info 
                    sx={{
                        color: 'white',
                        fontSize: 30
                    }}
                    className='mr-2'
                    />
                    <Text size='lg'>Once you start, you will have {validityPeriod} {(validityPeriod as number > 1)?'hours':'hour'} to finish this content!</Text>
                </div>                
                <div className='flex justify-end mt-4'>
                    <button 
                    onClick={handleStart}
                    className='bg-red-500 text-white text-sm px-3 py-1 rounded-md mr-2'>Start now</button>
                    <button 
                    onClick={() => {
                        route.push(backUrl);
                    }}
                    className='bg-gray-500 text-white text-sm px-3 py-1 rounded-md'>Later</button>
                </div>
            </div>
        </div>
    )
}
export default MovieStartPopup;