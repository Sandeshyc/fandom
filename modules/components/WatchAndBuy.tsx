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

            <div className="flex flex-row gap-4 items-center lg:mb-5 flex-wrap"> 
            
            {(data?.allowed)?(<>{data?.isPackage ? null : (data?.currentTime)?(<Buttons
                onClick={() => router.push(`/watch/${data?._id}`)} 
                className="w-[100px]"
                type='white'><PlayIcon className="w-6 text-black mr-2" /> Resume</Buttons>):(<PlayButton movieId={data?._id}/>)}</>):(
                <Buy 
                    movieId={data?._id} 
                    allowedPlans={data?.allowedPlans}
                    messages={data?.messages}
                    allowed={data?.allowed}
                    data={data}
                    />
                )}
            {data?.isPackage ? null : 
                (data?.allowed && data?.currentTime)?(<Buttons
                onClick={() => router.push(`/watch/${data?._id}?t=restart`)} 
                type='white'><RestartAlt className="w-6 text-black mr-2" /> Restart</Buttons>):(<WatchTrailerBtn movieId={data?._id} />)}
            </div>
        </div>
    </>);
}
export default WatchAndBuy;