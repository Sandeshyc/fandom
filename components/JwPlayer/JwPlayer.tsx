import { set } from "lodash";
import React, { useState, useEffect, useRef } from "react";

interface VideoPlayerProps {
    image : string;
    video : string;
    control : boolean;
    autoplay : boolean;
    isComplited : () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps>  = ({image, video, control, autoplay, isComplited }) => {
    const playerRef = useRef(null);

    useEffect(() => {
        if ( video === undefined || video === "" || !playerRef.current || typeof window === "undefined" ) return;

        playerRef.current.innerHTML = "<div className='h-full' />";
        playerRef.current.style ="opacity: 0"

        const player = window.jwplayer(playerRef.current.firstChild);

        player.setup({

            file: video,
            image: image,
            aspectratio: "16:9",
            autostart: autoplay,
            mute: true,
            controls: control,
            displaytitle: true,
            // displaydescription: true,
            stretching: "fill",
            preload: "auto",
            responsive: true,
            repeat: true,

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

        

        /* if(autoplay === true) {
            // player is ready 
            player.on('ready', function() {
                player.play();
            });

            // un mute video
            player.on('play', function() {
                // player.setMute(false);
            });
        } */

       /*  player.on('ready', function() {
                
                
        }); */

        // on playing video
        player.on('play', function() {
            console.log('play');
            // show the player once it's ready
            playerRef.current.style ="opacity: 1"
        });

        // on pause video
        player.on('pause', function() {
            console.log('pause');
        });

        // on complete video
        player.on('complete', function() {
            console.log('jw video complete');
            // if isComplited is passed as props
            if(isComplited){
                isComplited(true);
            }
        });

        // clear on unmount
        return () => {
            player.remove();
        };

    }, [video, autoplay]);


    const styling={
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
    }

    return (
        <>
            <div className="h-full"  style={styling}>
                <div ref={playerRef} className="h-full" >
                    <div className="h-full" />
                </div>
            </div>
        </>
    )
};

// default props
VideoPlayer.defaultProps = {
    image: "",
    video: "",
    control: true,
    autoplay: true,

};

export default VideoPlayer;