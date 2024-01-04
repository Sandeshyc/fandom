import React from 'react';
import { useRouter } from 'next/router';
import PlayButton from '@/components/PlayButton';
import ViewDetailsButton from '@/modules/Identities/ViewDetailsButton';
import ReactVideoPlayer from '@/components/ReactPlayer';
type Props = {
  data: any;
};
const Billboard = ({data}:Props) => {
  data = data[(Math.floor(Math.random() * data?.length))]
  return (
    <div className={`relative billboardSec`}>   
      <div className={`relative w-full overflow-hidden object-cover transition duration-500 jk_player min-h-[400px] h-[250px] sm:h-[300px] md:h-[85vh] md:min-h-[700px] max-h-[85vh]`}>
        <div className='brightness-[60%] h-full'>
          <ReactVideoPlayer videoURL={data?.videoUrl} poster={data?.thumbnailUrl} />
        </div>
        <div className='preview'></div>
      </div>
      <div className={`absolute bottom-[0%] pb-6 sm:pb-10 lg:pb-16 xl:pb-25 pl-4 md:pl-16 transition`}>
        <p className="text-white text-2xl md:text-5xl h-full w-[85%] lg:w-[50%] lg:text-6xl drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[12px] md:text-lg mt-2 mb-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl line-clamp-4">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          {(data?.allowed)?(<PlayButton movieId={data?._id} />):(<GoBuy movieId={data?._id}/>)}
          <ViewDetailsButton movieId={data?._id} />
        </div>
      </div>
    </div>
  )
}
export default Billboard;

interface GoBuyProps {
  movieId: string;
}
const GoBuy = (
  {movieId}:GoBuyProps
) => {
  const router = useRouter();
  return (
    <button 
      onClick={() => {
        router.push(`/details/${movieId}/?viewPlan=true`);
      }}
      className="text-white rounded-full py-2 px-3 text-base min-w-[180px] h-[44px] transition bg-gradient-to-l from-blue-500 to-blue-600 hover:bg-gradient-to-r">Rent</button>
  )
}