import React, {useCallback} from 'react';
import { useRouter } from 'next/router';
import ReadMoreDescription from '@/modules/Identities/ReadMoreDescription';
import {convertESTtoLocalTime } from '@/utils/yearFromDate';
import { getThumbnailLandscape } from '@/utils/getData';
import RentPlayButtonAction from '@/modules/elements/Purchase/RentPlayButtonAction';
import RentPlayNotice from '@/modules/elements/Purchase/RentPlayNotice';
type Props = {
    episode:any
    slNo:number | string
}
const Episode = ({episode, slNo}:Props) => {
    if(!episode) return null;
    const router = useRouter();
    const title = episode?.title;
    const thumbnail = getThumbnailLandscape(episode);
    const description = episode?.description;
    let releaseDate = episode?.releaseDate;
    if(releaseDate){
        releaseDate = convertESTtoLocalTime(releaseDate);
    }      
    if(!slNo){
        slNo = '';
    }else{
        slNo = slNo + '. ';
    }
    const redirectToRent = `/details/${episode?._id}?viewPlan=true`;
    const redirectToWatch = `/watch/${episode?._id}`;
    const redirectToDetails = useCallback(() => {
        router.push(`/details/${episode?._id}`);      
    }, [episode, slNo]);
    
    return (
    <div className='mb-8 flex flex-wrap border-b border-white/40 pb-8 last:border-none'>
        <div className='w-full sm:w-1/2 md:w-1/3 sm:pr-4 mb-2 sm:mb-0'>
            <div className='aspect-[16/9] bg-gray-800 cursor-pointer rounded-md overflow-hidden relative max-h-[160px]'
                onClick={redirectToDetails}>
                <img src={thumbnail} alt={title} className='rounded-md w-full h-full object-cover aspect-[9/6]' />
            </div>
        </div>
        <div className='w-full sm:w-1/2 md:w-2/3 lg:w-1/3'>
            <h3 className='text-lg mb-2'>{slNo +' '+ title}</h3>
            <p className='mb-1 flex items-center flex-wrap my-2 text-white/70'>
                {(episode?.quality)?(<span className="border-white/80 border px-1 mr-1 mb-1 text-xs rounded-sm">{episode?.quality}</span>):null}
                {(episode?.contentRating)?(<span className="border-white/80 border px-1 mr-1 mb-1 text-xs rounded-sm">{episode?.contentRating}</span>):null}
                <span className='text-xs mb-1'>
                    {(episode?.duration)&&episode?.duration + ' . '}
                    {releaseDate}
                </span>
            </p>
            <div className='text-sm mt-4 text-white/70'>
            <ReadMoreDescription
                text={description}
            />
            </div>
        </div>
        <div className='w-full lg:w-1/3 md:text-center md:pl-2 mt-2 lg:mt-0'>
            <RentPlayButtonAction 
                data={episode}
                allowedData={episode?.allowed}
                size='lg'
            />
            <div className='mt-2 text-left'>
                <RentPlayNotice data={episode?.allowed} />
            </div>
        </div>
    </div>);
}
export default Episode;