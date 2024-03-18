import React from 'react';
import ReactVideoPlayer from '@/components/ReactPlayer';
interface Props {
    thumbnailUrl: string;
    trailerUrl?: string;
}
const BillboardBanner = ({thumbnailUrl, trailerUrl}:Props) => {
    return(
        <div className={`relative w-full overflow-hidden object-cover transition duration-500 jk_player min-h-[400px] h-[250px] sm:h-[300px] md:h-[85vh] md:min-h-[700px] max-h-[85vh]`}>
          <div className='brightness-[60%] h-full'>
            <ReactVideoPlayer videoURL={trailerUrl || ''} poster={thumbnailUrl} />
          </div>
          <div className='preview'></div>
        </div>
    );
}
export default BillboardBanner;