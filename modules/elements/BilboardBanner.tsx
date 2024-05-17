import React from 'react';
import ReactVideoPlayer from '@/components/ReactPlayer';
import { Waypoint } from 'react-waypoint';

interface Props {
    thumbnailUrl: string;
    trailerUrl?: any;
    isActive?: boolean;
}
const BillboardBanner = ({thumbnailUrl, trailerUrl, isActive}:Props) => {
  const [inView, setInView] = React.useState(false);

  const handleWaypointEnter = () => {
    console.log('enter');
    setInView(true);
  }

  const handleWaypointLeave = () => {
    console.log('leave');
    setInView(false);
  }

  return(
    <Waypoint 
    onEnter={handleWaypointEnter} 
    onLeave={handleWaypointLeave}
    topOffset= {300}
    // bottomOffset='20%'
    >
      <div className={`relative w-full overflow-hidden object-cover transition duration-500 jk_player min-h-[400px] h-[250px] sm:h-[300px] md:h-[90vh] md:min-h-[700px] max-h-[90vh]`}
      style={{
        backgroundImage: `url(${thumbnailUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
      >
        <div className='brightness-[60%] h-full'>
          {(isActive) &&
            <ReactVideoPlayer videoURL={trailerUrl} poster={thumbnailUrl} play={isActive && inView}/>
          }
        </div>
        <div className='preview'></div>
      </div>
    </Waypoint>
  );
}
export default BillboardBanner;