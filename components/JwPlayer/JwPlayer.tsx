import { set } from "lodash";
import React, { useState, useEffect, useRef } from "react";

interface VideoPlayerProps {
    image : string;
    video : string;
    control : boolean;
    autoplay : boolean;
    isComplited : () => void;
    caption?: any,
}

const VideoPlayer: React.FC<VideoPlayerProps>  = ({image, video, control, autoplay, isComplited, caption }) => {
    const playerRef = useRef();

    useEffect(() => {
        if ( video === undefined || video === "" || !playerRef.current || typeof window === "undefined" ) return;

        // make track are ready
        let tracks: any = [];
        if (caption) {
            caption.forEach((track: any, index: number) => {
                tracks.push({
                    file: track.url,
                    label: track.label,
                    kind: "captions",
                    "default": index === 0 ? true : false
                })
            });
        }
                    
            

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
            // multiple audio tracks
            tracks: tracks,
            // enable casting
            "cast": {},


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

        /* xx // on mouse out pause video
        playerRef.current.addEventListener("mouseout", function() {
            player.pause();
        });

        // on mouse over play video
        playerRef.current.addEventListener("mouseover", function() {
            player.play();
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
            // player.remove();
            player.stop();
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