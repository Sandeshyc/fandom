import React from 'react';
import { Waypoint } from 'react-waypoint';
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
    const [inView, setInView] = React.useState(false);

    const handleWaypointEnter = () => {
        console.log('enter');
        setInView(true);
    }

    const handleWaypointLeave = () => {
        console.log('leave');
        setInView(false);
    }

    return (
        <Waypoint 
        scrollableAncestor={window}
        onEnter={handleWaypointEnter} 
        onLeave={handleWaypointLeave}
        topOffset= {300}
        >
            <div className="relative z-0 mb-[-100px] lg:mb-[-140px]">
                <div className="shadow-md rounded-t-lg jk_player h-[350px] md:h-[90vh] max-h-[100%] min-h-[400px] md:min-h-[700px] bg-gray-700"  style={{backgroundImage: `url(${thumb})`, backgroundSize: 'cover', backgroundPosition: 'center top'}}>
                    {(videoURL)?
                        (<ReactVideoPlayer videoURL={videoURL} control={false} poster={thumb} play={inView}/>)
                        :
                        null
                    }
                </div>
                <div className={`absolute bottom-0 left-0 w-full h-full z-10 bg-black/${(isMobile)?'30':(videoURL)?'20':'30'}`}/>
            </div>
        </Waypoint>
    );
}