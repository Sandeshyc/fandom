import React from 'react'
import ReactPlayer from 'react-player'

type Props = {
    videoURL: string, 
    control?: boolean,   
    poster?: string, 
    isMute?: boolean,
    play?: boolean,
    className?: string,
}

const ReactVideoPlayer = (
    {
        videoURL,
        control = false,
        poster = '',
        isMute = true,
        play = true,
        className = '',
    }: Props
) => {
    const { innerWidth: width, innerHeight: height } = window;
    return (
        <>
        <div className={`w-full h-full overflow-hidden ${className}`}>
            <div className='relative h-full w-full ReactPlayerVideoCover'>
                <div className={`absolute top-0 left-0 w-full h-full z-0 hidden sm:block`} 
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
                    playing={play}
                    muted={isMute}
                    pip={false}
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