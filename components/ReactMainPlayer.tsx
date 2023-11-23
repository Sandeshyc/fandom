import React from 'react'
import ReactPlayer from 'react-player'

type Props = {
    videoURL: string, 
    control?: boolean,   
    poster?: string, 
}

const ReactMainVideoPlayer = (
    {
        videoURL,
        control = false,
        poster = '',
    }: Props
) => {
    return (
        <>
        <div 
            className={`w-screen h-screen`} 
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
        </>
    )
}

export default ReactMainVideoPlayer