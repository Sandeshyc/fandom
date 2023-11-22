import React from 'react'
import ReactPlayer from 'react-player'

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
    return (
        <div className='w-full h-full overflow-hidden'>
            <div className='relative h-0 pt-[56.2%]'>
                <div 
                    className={`absolute top-0 left-0 w-full h-full z-0`} 
                    style={{
                        backgroundImage: `url(${poster})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}>
                    {(videoURL)?(<ReactPlayer 
                    url={videoURL} 
                    width='100%'
                    height='100%'
                    playing={true}
                    muted={true}
                    loop={true}
                    controls={control}
                    style={{
                        backgroundColor: 'black',
                    }}
                    />):null}
                </div>
            </div>
        </div>
    )
}

export default ReactVideoPlayer