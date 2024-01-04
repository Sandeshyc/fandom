import React from 'react';
import ReactVideoPlayer from '@/components/ReactPlayer';

type dataProps = {
    data: any;
}
const DetailsHeroImage = ({data}:dataProps) => {
    const videoURL = data?.trailerUrl ? data?.trailerUrl : '';
    let thumb = '';
    if( data?.thumbnailUrl ){
        thumb = data?.thumbnailUrl;
    }
    return (<DetailsHeroBanner
        thumb={thumb}
        videoURL={videoURL}
    />);
  
}
export default DetailsHeroImage;
type Props = {
    thumb: string;
    videoURL?: string;
}
export const DetailsHeroBanner = ({thumb, videoURL}:Props) => {
    return (<div className="relative z-0 mb-[-140px] md:mb-[-200px]">
    <div className="shadow-md rounded-t-lg jk_player h-[350px] md:h-[75vh] max-h-[100%] min-h-[400px] md:min-h-[700px]"  style={{backgroundImage: `url(${thumb})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
    {(videoURL)?(<ReactVideoPlayer videoURL={videoURL} control={false} poster={thumb}/>):null}
    </div>
    <div className="absolute bottom-0 left-0 w-full h-[300px] z-10 bg-gradient-to-t from-black from-30% to-transparent to-100%"/>    
</div>);
}