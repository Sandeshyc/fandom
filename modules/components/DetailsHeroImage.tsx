import React from 'react';
import ReactVideoPlayer from '@/components/ReactPlayer';
import useIsMobile from '@/hooks/useIsMobile';
import { getThumbnailLandscape } from '@/utils/getData';

type dataProps = {
    data: any,
    module: any
}
const DetailsHeroImage = (inputProps:dataProps) => {    
    const {data} = inputProps
    // trailerUrl 
    let videoURL = data?.trailerUrl;
    let thumb = getThumbnailLandscape(data);
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
    const isMobile = useIsMobile();
    return (
        <div className="relative z-0 mb-[-100px] md:mb-[-180px]">
            <div className="shadow-md rounded-t-lg jk_player h-[350px] md:h-[90vh] max-h-[100%] min-h-[400px] md:min-h-[700px]"  style={{backgroundImage: `url(${thumb})`, backgroundSize: 'cover', backgroundPosition: 'center top'}}>
                {(videoURL)?
                    (<ReactVideoPlayer videoURL={videoURL} control={false} poster={thumb} play={true}/>)
                    :
                    null
                }
            </div>
            <div className={`absolute bottom-0 left-0 w-full h-full z-10 bg-black/${(isMobile)?'30':(videoURL)?'20':'30'}`}/>
        </div>
    );
}