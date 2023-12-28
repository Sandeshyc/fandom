import React, { useEffect, } from 'react';
import ReactVideoPlayer from '@/components/ReactPlayer';

type dataProps = {
    data: any;
}
const DetailsHeroBanner = ({data}:dataProps) => {
    const videoURL = data?.trailerUrl ? data?.trailerUrl : '';
    let thumb = '';
    if( data?.thumbnailUrl ){
        thumb = data?.thumbnailUrl;
    }
    return (<div className="relative z-0 mb-[-160px]">
        <div className="shadow-md rounded-t-lg jk_player h-[350px] md:h-[70vh] max-h-[100%]"  style={{backgroundImage: `url(${thumb})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        {(videoURL)?(<ReactVideoPlayer videoURL={videoURL} control={false} poster={thumb}/>):null}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[200px] z-10 bg-gradient-to-t from-black from-30% to-transparent to-100%"/>    
    </div>);
  
}
export default DetailsHeroBanner;