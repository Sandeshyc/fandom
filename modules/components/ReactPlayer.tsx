import React from 'react'
import ReactPlayer from 'react-player'

type Props = {
    videoURL?: any, 
    control?: boolean,   
    poster?: string, 
    isMute?: boolean,
    play?: boolean,
}
const ReactVideoPlayer = (
    {
        videoURL,
        control = false,
        poster = '',
        isMute = true,
        play = true,
    }: Props
) => {
    return (
        <ReactPlayer 
            url= {videoURL}
            light={poster}
            width='100%'
            height='100%'
            playing={play}
            muted={isMute}
            pip={false}
            loop={true}
            controls={control}
            delay={500}
            volume={0.5}
            style={{
                backgroundColor: 'black',
                backgroundImage: `url(${poster})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        />
    )
}

export default ReactVideoPlayer