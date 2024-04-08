import React, {useCallback} from 'react';
import { useRouter } from 'next/router';
import ReadMoreDescription from '@/modules/Identities/ReadMoreDescription';
import Buttons from '@/modules/Identities/Buttons';
import { yearFromDate, getTimeDifference, getDateFormat,
    convertESTtoLocalTime } from '@/utils/yearFromDate';
type Props = {
    episode:any
    slNo:number | string
}
const Episode = ({episode, slNo}:Props) => {
    if(!episode) return null;
    const router = useRouter();
    const title = episode?.title;
    const thumbnail = episode?.thumbnailBannerUrl;
    const description = episode?.description;
    let publishDate = episode?.publishSchedule;
    if(publishDate){
        publishDate = convertESTtoLocalTime(publishDate);
    }      
    if(!slNo){
        slNo = '';
    }else{
        slNo = slNo + '. ';
    }
    const redirectToRent = useCallback(() => {
        router.push(`/details/${episode?._id}?viewPlan=true`);      
    }, [episode, slNo]);
    const redirectToDetails = useCallback(() => {
        router.push(`/details/${episode?._id}`);      
    }, [episode, slNo]);
    
    const redirectToWatch = useCallback(() => {
        router.push(`/watch/${episode?._id}`);
    }, [episode, slNo]);
    return (
    <div className='mb-8 flex flex-wrap border-b border-white/40 pb-8 last:border-none'>
        <div className='w-full sm:w-1/2 md:w-1/3 sm:pr-4 mb-2 sm:mb-0'>
            <div className='aspect-[9/6] bg-gray-800 cursor-pointer rounded-md overflow-hidden relative max-h-[160px]'
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
                    {publishDate}
                </span>
            </p>
            <div className='text-sm mt-4 text-white/70'>
            <ReadMoreDescription
                text={description}
            />
            </div>
        </div>
        <div className='w-full lg:w-1/3 md:text-center md:pl-2'>
            {(episode?.allowed)? (
                <Buttons 
                    onClick={redirectToWatch} 
                    type='white'>
                        Play Now
                </Buttons>) 
            : (     
            <Buttons
                type="blue"
                className="mt-4"
                onClick={redirectToRent}>
                Rent
            </Buttons>
            )}
        </div>
    </div>);
}
export default Episode;