import { set } from "lodash";
import React, { useState, useEffect, useRef } from "react";

import usePlayerEvent from "@/hooks/usePlayerEvent";

interface VideoPlayerProps {
    image : string;
    video : string;
    control : boolean;
    autoplay : boolean;
    isComplited : () => void;
    caption?: any,
    pictureInPicture: boolean;
    data : any;
}

const VideoPlayer: React.FC<VideoPlayerProps>  = ({image, video, control, autoplay, isComplited, caption, pictureInPicture, data }) => {
    const playerRef = useRef();
    const {logPlayerEvent} = usePlayerEvent();
    const styling={
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
    }
    useEffect(() => {
        try{ 

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
            playerRef.current.style ="opacity: 0.5"

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
                // enable picture in picture
                "pip": {
                    "enabled": pictureInPicture
                },

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
                logPlayerEvent({
                    "eventType": "player",
                    "eventName": "play",
                    "meta": {
                        "itemCode": data?._id,
                    }
                });
                console.log('play');
                // show the player once it's ready
                playerRef.current.style ="opacity: 1"
            });

            // on pause video
            player.on('pause', function() {
                console.log('pause');
                logPlayerEvent({
                    "eventType": "player",
                    "eventName": "pause",
                    "meta": {
                        "itemCode": data?._id,
                    }
                });
            });

            // on complete video
            player.on('complete', function() {
                logPlayerEvent({
                    "eventType": "player",
                    "eventName": "completed",
                    "meta": {
                        "itemCode": data?._id,
                    }
                });
                console.log('jw video complete');
                // if isComplited is passed as props
                if(isComplited){
                    isComplited(true);
                }
            });

            player.on('error', function(error : any) {
                logPlayerEvent({
                    "eventType": "player",
                    "eventName": "error",
                    "meta": {
                        "itemCode": data?._id,
                        "errorCode": error?.code,
                        "errorType": error?.type,
                        "error": error?.message,
                    }
                });
                console.log('error');
            });

            // clear on unmount
            return () => {
                // player.remove();
                player.stop();
            };
        } catch(e){ console.error(e); }

    }, [video, autoplay]);

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
    pictureInPicture: false,
};

export default VideoPlayer;