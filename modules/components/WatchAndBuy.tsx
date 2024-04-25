import React from "react";
import { useRouter } from 'next/router';
import WatchTrailerBtn from '@/components/WatchTrailerBtn';
import Buy from '@/components/Buy';
import { RestartAlt, ReportProblem } from '@mui/icons-material';
import { PlayIcon } from '@heroicons/react/24/solid';
import PlayButton from '@/components/PlayButton';
import Buttons from '@/modules/Identities/Buttons';
import { stableKeys } from '@/utils/stableKeys';
import WarningMessage from '@/modules/Identities/WarningMessage';
import MovieRentButtonMobile from '@/modules/Identities/MovieRentButtonMobile';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';
import RentPlayNotice from '@/modules/elements/Purchase/RentPlayNotice';
import TrailerRestartButton from '@/modules/elements/Purchase/TrailerRestartButton';
import RentPlayButtonAction from '@/modules/elements/Purchase/RentPlayButtonAction';
type Props = {
    data: any;
}
const WatchAndBuy = ({data}:Props) => {
    const router = useRouter();
    return (<>
        <div className="relative z-10 px-4 bg-black/90">
            <RentPlayNotice data={data?.allowed} />
            {(data?._id)?
            <div className="flex flex-row items-center lg:mb-5 flex-wrap justify-between mx-[-7px]">
                <div className='w-1/2 px-[7px]'>
                    <RentPlayButtonAction
                        data={data}
                        allowedData={data?.allowed}
                        size='full'
                    />                                                       
                </div>
                <div className='w-1/2 px-[7px]'>
                    <TrailerRestartButton
                        data={data?.allowed}
                        itemId={data?._id}
                        currentTime={data?.currentTime}
                        size='full'
                    />
                </div>                
            </div>:
            <ErrorPopUp 
            message='Sorry, Something went wrong!'/>}
        </div>
    </>);
}
export default WatchAndBuy;