import React from 'react';
import PublishDate from '@/modules/Identities/PublishDate';
import Title from '@/modules/Identities/Title';
type dataProps = {
    data: any;
}
const MovieSummary = ({data}:dataProps) => {
  const postar = data?.thumbnailPortraitUrl || data?.thumbnailLandscapeUrl || '';
    return (
      <div className='text-white z-10 relative mt-[-100px] md:mt-[-250px] bg-gradient-to-t from-black/90 from-50% to-transparent to-100%'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap items-end pb-8'>
            <div className='w-full lg:w-2/3 mb-4 lg:mb-0'>
              <div className="flex flex-wrap items-end w-full">
                <div className='w-[100px] sm:w-[120px] mr-2 bg-zinc-700 aspect-[6/9] rounded-md'>
                  <img src={postar} alt={data?.title} className='w-full text-zinc-500' />
                </div>
                <div className='grow w-[100px] '>
                  <div className=' h-full mb-2 lg:mb-3'>
                    <Title tag='h1' size='4xl'>{data?.title}</Title>
                  </div>
                  <p className='mb-1 flex items-center flex-wrap my-2 text-white/70 text-xs'>
                    {(data?.quality)?(<span className="border-gray-500 border px-1 mr-1 mb-1 rounded-sm">{data?.quality}</span>):null}
                    {(data?.contentRating)?(<span className="border-gray-500 border px-1 mr-1 mb-1 rounded-sm">{data?.contentRating}</span>):null}
                    {(data?.duration)?(<span className='mb-1'>{data?.duration}</span>):null}
                  </p>
                  {(data?.publishSchedule)?(<p className="mb-1 flex items-center text-white/70"><PublishDate publishDate={data?.publishSchedule} short={true} /></p>):null}
                </div>
              </div>                
            </div>
          </div>
        </div>
      </div>
    );
  
}
export default MovieSummary;