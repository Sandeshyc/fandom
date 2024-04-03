import React from 'react';
import ReactVideoPlayer from '@/components/ReactPlayer';
import useIsMobile from '@/hooks/useIsMobile';


type dataProps = {
    data: any,
    module: any
}
const DetailsHeroImage = (inputProps:dataProps) => {
    
    const {data} = inputProps


    // trailerUrl 
    let videoURL = data?.trailerUrl;
    const vidoes = data?.videoUrls;
    if(!videoURL && Array.isArray(vidoes) && vidoes.length > 0){
        // is label is trailer then use url
        videoURL = vidoes?.find((video:any) => video?.label === 'Trailer');
        if(videoURL){
            videoURL = videoURL?.url;
        }
    }
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
    const isMobile = useIsMobile();
    return (
        <div className="relative z-0 mb-[-100px] md:mb-[-180px]">
            <div className="shadow-md rounded-t-lg jk_player h-[350px] md:h-[75vh] max-h-[100%] min-h-[400px] md:min-h-[700px]"  style={{backgroundImage: `url(${thumb})`, backgroundSize: 'cover', backgroundPosition: 'center top'}}>
                {(videoURL)?
                    (<ReactVideoPlayer videoURL={videoURL} control={false} poster={thumb}/>)
                    :
                    null
                }
            </div>
            <div className={`absolute bottom-0 left-0 w-full h-full z-10 bg-black/${(isMobile)?'70':(videoURL)?'60':'70'}`}/>
        </div>
    );
}