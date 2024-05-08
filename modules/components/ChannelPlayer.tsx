import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import VideoPlayer from '@/components/JwPlayer/JwPlayer';
import { getThumbnailLandscape } from '@/utils/getData';
const captionURL = null;
type dataProps = {
    data: any,
    module: any
}
const ChannelPlayer = (inputProps:dataProps) => {
    const {data} = inputProps;
    const router = useRouter();
    const [backBtnActive, setBackBtnActive] = React.useState(false);
    const [mouseActive, setMouseActive] = React.useState(true);
    const thumb = getThumbnailLandscape(data);
    const [videoURL, setVideoURL] = React.useState(
        {
          'HLS': data?.hlsVideo,
          'DASH': data?.dashVideo,
        }
    );

    let timeout: NodeJS.Timeout;
    const onMouseMove = () => {
        clearTimeout(timeout);        
        setMouseActive(true);
        timeout = setTimeout(() => {
            setMouseActive(false);
        }, 3000);
    }
    const handleBack = () => {
        if(!backBtnActive){
          router.back();
          setBackBtnActive(true);
        }
    }    
    useEffect(() => {
        setVideoURL({
            'HLS': data?.hlsVideo,
            'DASH': data?.dashVideo,
        });
    }, [data]);
    return (
        <div className="h-screen w-screen bg-black flex items-center" onMouseMove={onMouseMove}>
            {mouseActive && (<nav className={`fixed w-full p-4 z-50 top-1 flex flex-row items-center gap-8 bg-opacity-70 transition-opacity ease-in duration-700 ${(backBtnActive)?'opacity-50':'opacity-100'} videoPageNav`}>
                <ArrowLeftIcon 
                    onClick={handleBack} 
                    className={`w-8 md:w-12 text-white ${(backBtnActive)?'cursor-wait':'cursor-pointer'} hover:opacity-80 transition border-2 border-blue-500 rounded-full p-1`} 
                    />
                <p className="text-white text-1xl md:text-3xl font-bold">
                    <span className="font-light">Watching:</span> {data?.title}
                </p>
            </nav>)}
            <div className="jk_jwp_full h-screen w-screen" style={{
                backgroundImage: `url(${thumb})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                }}>
                {(data.allowed.allowed && data.allowed.canPlay)?
                    <VideoPlayer 
                    image={thumb}
                    video={videoURL} 
                    caption={captionURL}
                    control={true}
                    autoplay={true}
                    isComplited={() => {}}
                    data={data}
                    isRestart={false}
                    pictureInPicture={true}/>
                :null}
            </div>
        </div>
    );
}
export default ChannelPlayer;