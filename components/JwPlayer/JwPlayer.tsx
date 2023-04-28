import { background } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";

interface VideoPlayerProps {
    image : string;
    video : string;
    control : boolean;
}



const VideoPlayer: React.FC<VideoPlayerProps>  = ({image, video, control}) => {
    const playerRef = useRef(null);
    console.log('image', image);

    useEffect(() => {
        if ( video === undefined || video === "" || !playerRef.current || typeof window === "undefined" ) return;

        const player = window.jwplayer(playerRef.current);
        player.setup({

            file: video,
            image: image,
            aspectratio: "16:9",
            // autostart: true,
            // mute: true,
            controls: control,
            displaytitle: true,
            // displaydescription: true,
            stretching: "fill",
            preload: "auto",
            responsive: true,

            sharing: {
                sites: ["facebook","twitter","email","linkedin","pinterest"]
            },
            intl: {
                en: {
                    sharing: {
                    heading: "Share this awesome video"
                    }
                }
            }
            
        });

        player.on('ready', function() {
            setTimeout(() => {
                player.play();
            }, 500);
        });

        // on playing video
        player.on('play', function() {
            console.log('play');
        });

        // on pause video
        player.on('pause', function() {
            console.log('pause');
        });

    }, [video]);


    const styling={
        backgroundImage: `url(${image})`,
    }

    return (
        <>
            <div className="max-h-screen" style={styling}>
                <div ref={playerRef}></div>
            </div>
        </>
    )
};

// default props
VideoPlayer.defaultProps = {
    control: true,
    image: "",
};

export default VideoPlayer;