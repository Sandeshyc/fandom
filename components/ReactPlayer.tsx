import React from 'react'
import ReactPlayer from 'react-player'
import {
    VolumeOff,
    VolumeUp,
} from '@mui/icons-material';

type Props = {
    videoURL: string, 
    control?: boolean,   
    poster?: string, 
}

const ReactVideoPlayer = (
    {
        videoURL,
        control = false,
        poster = '',
    }: Props
) => {
    const { innerWidth: width, innerHeight: height } = window;
    const [isMute, setIsMute] = React.useState(true);
    const tooggleMute = () => {
        setIsMute(!isMute);
    }
    return (
        <>
        <div className='w-full h-full overflow-hidden'>
            <div className='relative h-0 pt-[56.2%]'>
                <div className='absolute bottom-2 right-2 w-[40px] rounded-full h-[40px] z-50 bg-black flex justify-center items-center'
                    onClick={tooggleMute}
                    >
                    {(!isMute)?(<VolumeUp className='w-[20px] h-[20px] m-auto text-white'/>):(<VolumeOff className='w-[20px] h-[20px] m-auto text-white'/>)}
                    
                </div>
                <div 
                    className={`absolute top-0 left-0 w-full h-full z-0 hidden sm:block`} 
                    style={{
                        backgroundImage: `url(${poster})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}>
                    {(videoURL && (innerWidth > 1200))?(<ReactPlayer 
                    url={videoURL} 
                    width='100%'
                    height='100%'
                    playing={true}
                    muted={isMute}
                    loop={true}
                    controls={control}
                    delay={500}
                    style={{
                        backgroundColor: 'black',
                        backgroundImage: `url(${poster})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                    />):null}
                </div>
                <div 
                    className={`absolute top-0 left-0 w-full h-full z-0 sm:hidden`} 
                    style={{
                        backgroundImage: `url(${poster})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}></div>
            </div>
        </div>
        </>
    )
}

export default ReactVideoPlayer