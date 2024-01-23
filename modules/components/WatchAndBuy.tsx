import React from "react";
import { useRouter } from 'next/router';
import WatchTrailerBtn from '@/components/WatchTrailerBtn';
import Buy from '@/components/Buy';
import { RestartAlt, ReportProblem } from '@mui/icons-material';
import { PlayIcon } from '@heroicons/react/24/solid';
import PlayButton from '@/components/PlayButton';
import Buttons from '@/components/identites/Buttons';
import { stableKeys } from '@/utils/stableKeys';
import WarningMessage from '@/modules/Identities/WarningMessage';
import MovieRentButtonMobile from '@/modules/Identities/MovieRentButtonMobile';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';
type Props = {
    data: any;
}
const WatchAndBuy = ({data}:Props) => {
    const router = useRouter();
    return (<>
        <div className="relative z-10 px-4">
            {(data?.canBuy === false && Array.isArray(data?.messages) && data?.messages.length) ?  (
            <WarningMessage
                message={data.messages.map((message : string, index : number) => <p key={stableKeys[index]}>{message}</p>)}
                iconColor='#EAB307'
                textColor='#fff'
                className='mb-2'
                styles={{
                    maxWidth: '410px',
                }}
            />): null}
            {(data?._id)?
            <div className="flex flex-row items-center lg:mb-5 flex-wrap justify-between">
                <MovieRentButtonMobile data={data}/>                
                {data?.isPackage ? null : 
                (data?.allowed && data?.currentTime)?(<Buttons
                onClick={() => router.push(`/watch/${data?._id}?t=restart`)} 
                styles={{width: '48%'}}
                type='white'>
                <RestartAlt className="w-6 text-black mr-2" /> Restart</Buttons>):(<WatchTrailerBtn movieId={data?._id} />)}
            </div>:
            <ErrorPopUp 
            message='Test'/>}
        </div>
    </>);
}
export default WatchAndBuy;