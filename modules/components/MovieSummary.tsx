import React from 'react';
import PublishDate from '@/modules/Identities/PublishDate';
import Title from '@/modules/Identities/Title';
import {capFirstLetter} from '@/utils/capFirstLetter';
import { stableKeys } from '@/utils/stableKeys';
import { yearFromDate, getTimeDifference } from '@/utils/yearFromDate';
import { getThumbnailPortrait } from '@/utils/getData';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';

type dataProps = {
    data: any,
    module: any
}
const MovieSummary = (inputProps:dataProps) => {

  const {data} = inputProps

    const postar = getThumbnailPortrait(data);
    // get year from date
    let releaseYear = data?.releaseDate;
    if(releaseYear){
      releaseYear = yearFromDate(releaseYear);
    }
    const publishRemaining = getTimeDifference(data?.publishSchedule);
    // console.log('publishRemaining : ', data?.publishSchedule, publishRemaining)
    return (<>
      {(data?._id)?(
      <div className='text-white z-10 relative mt-[-80px] md:mt-[-150px] bg-gradient-to-t from-black/90 from-30% to-transparent to-75%'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap items-end pb-4 lg:pb-8'>
            <div className='w-full lg:w-2/3 mb-4 lg:mb-0'>
              <div className="flex flex-wrap items-end w-full">
                <div className='w-[100px] sm:w-[120px] mr-3 bg-zinc-700 aspect-[6/9] rounded-md overflow-hidden'>
                  <img src={postar} alt={data?.title} className='w-full text-zinc-500 object-cover h-full flex justify-center items-center' />
                </div>
                <div className='grow w-[100px]'>
                  <div className='block lg:hidden h-full mb-2 lg:mb-3'>
                    <Title tag='h1' size='xl'>{data?.title}</Title>
                  </div>
                  <div className='hidden lg:block h-full mb-2 lg:mb-3'>
                    <Title tag='h1' size='4xl'>{data?.title}</Title>
                  </div>
                  {(publishRemaining?.day < 0 || publishRemaining?.hour < 0 || publishRemaining?.minute < 0) &&
                    <PublishDate publishDate={data?.publishSchedule} short={true}/>
                  }
                  <p className='mb-1 flex items-center flex-wrap my-2 text-white/70 text-xs'>
                    {(data?.quality)?(<span className="border-gray-500 border px-1 mr-1 mb-1 rounded-sm">{data?.quality}</span>):null}
                    {(data?.contentRating)?(<span className="border-gray-500 border px-1 mr-1 mb-1 rounded-sm">{data?.contentRating}</span>):null}
                    {(Array.isArray(data?.closeCaptions) && data?.closeCaptions.length > 0)?(<span className="border-gray-500 border px-1 mr-1 mb-1 rounded-sm">CC</span>):null}
                    {(data?.duration)?(<span className='mb-1'>{data?.duration}</span>):null}
                  </p>
                  {(Array.isArray(data?.genre) && data?.genre?.length > 0)&&
                    <div className='popUpGenre flex flex-wrap items-center text-contentColor/70'>
                      {data?.genre?.map((itemTxt:string, index:number) => 
                      <span key={stableKeys[index]} className="inline-flex items-center text-sm mr-2 last:mr-0">{capFirstLetter(itemTxt)}
                      </span>)}
                      {(releaseYear)&&<span className="inline-flex items-center text-sm mr-2 last:mr-0">{releaseYear}
                      </span>}
                    </div>}
                </div>
              </div>                
            </div>
          </div>
        </div>
      </div>
      )
      :
      (
        <ErrorPopUp message={"Sorry, This content is not available now."}/>
      )}
      </>
    );
  
}
export default MovieSummary;