import { set } from "lodash";
import React, { useState, useEffect, useRef, use } from "react";

import usePlayerEvent from "@/hooks/usePlayerEvent";
import axios from "axios";

interface VideoPlayerProps {
    image : string;
    video : string;
    control : boolean;
    autoplay : boolean;
    isComplited : () => void;
    caption?: any,
    pictureInPicture: boolean;
    data : any;
    isRestart?: boolean;
}




const VideoPlayer: React.FC<VideoPlayerProps>  = ({image, video, control, autoplay, isComplited, caption, pictureInPicture, data, isRestart }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);
    const playerRef = useRef();
    const {logPlayerEvent} = usePlayerEvent();
    const [firstPlay, setFirstPlay] = useState(true);
    const x = useRef(0);
    const [drmTokens, setDrmTokens] = useState<any>({
        widevine: '',
        fairplay: '',
    });

    // console.log('video: ', video);
    const styling={
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
    }

    useEffect(() => {
        (async () => {
            try{
                if(!data?._id || drmTokens.widevine !== '') return;
                console.log('itemID : ', data?._id);
                const tokens = await axios ({
                    method: 'get',
                    url: `${process.env.NEXT_PUBLIC_API_URL}/item/${data?._id}/dkey`,
                });
                console.log('tokens: ', tokens?.data?.data);
                if(tokens?.data?.data){
                    setDrmTokens(tokens?.data?.data);
                }
            } catch(e){ console.error(e); }
        })();
    }, [data?._id]);
    
    useEffect(() => {
        // if player take more than 10 sec to load then show slow internet message
        setTimeout(() => {
            if(!isPlaying){
                console.log('slow internet, reload ');
            }
        }, 20000);
    }, [isReady]);


    useEffect(() => {
        try{ 
            console.log('drmTokens.widevine: ', drmTokens.widevine);
            if ( video === undefined || video === "" || !playerRef.current || typeof window === "undefined" || !drmTokens.widevine ) return;
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
            if(!player) return;
            player.setup({
                playlist:  [{ 
                    image: image,
                    sources:  [{ 
                      file:  "https://abs-vcms.akamaized.net/media/input/angpulubiatangprinsesa_1997_f1_restoredintl_wmk-165224/output/dash/AngPulubiAtAngPrinsesa_1997_F1_RestoredIntl_WMK-165224.mpd",
                      "drm": {
                        "widevine": {
                          "url": drmTokens?.widevine,
                          }
                      }  
                    },{ 
                      file:  "https://abs-vcms.akamaized.net/media/input/angpulubiatangprinsesa_1997_f1_restoredintl_wmk-165224/output/hls/AngPulubiAtAngPrinsesa_1997_F1_RestoredIntl_WMK-165224.m3u8",
                      "drm": {
                        "fairplay": {
                          "certificateUrl": "https://mcnassets.akamaized.net/Test/fairplay.cer",
                          "processSpcUrl": drmTokens?.fairplay,
                        }
                      } 
                    }]  
                }],
                // file: video,
                // image: image,
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

            // setTimeout(() => {
            //     console.log('Vidoe is Paused');
            //     player.pause();
            // }, 10000);
            // if(isPause){
            //     console.log('Vidoe is Paused inside');
            //     player.pause();
            // }

            // on ready video
            player?.on('ready', function() {
                console.log('Video Ready');
                setIsReady(true);
                if(!isRestart && data?.currentTime && data?.videoDuration && data?.currentTime < data?.videoDuration){
                    player.seek(data?.currentTime);
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
            player?.on('play', function() {
                console.log('Video Play');
                setIsPlaying(true);
                setIsBuffering(false);
                logPlayerEvent({
                    "eventType": "player",
                    "eventName": "play",
                    "meta": {
                        "itemCode": data?._id,
                    }
                });
                // console.log('play');
                // show the player once it's ready
                playerRef.current.style ="opacity: 1"
                if(x && x.current === 0){
                    setTimeout(() => {
                        // console.log('set volume', x.current);
                        player.setVolume(50);
                        x.current = 1;
                    }, 500);
                }
            });

            // on pause video
            player?.on('pause', function() {
                const currentTime = player.getPosition();
                const duration = player.getDuration();
                console.log('Video Pause');
                setIsBuffering(false);
                logPlayerEvent({
                    "eventType": "player",
                    "eventName": "pause",
                    "meta": {
                        "itemCode": data?._id,
                        "currentTime": currentTime,
                        "duration": duration,
                    }
                });
            });

            // on before play video
            player?.on('load', function() {
                console.log('Video beforePlay');
                setIsBuffering(false);
                
            });


            // on loading video
            player?.on('buffer', function() {
                // logPlayerEvent({
                //     "eventType": "player",
                //     "eventName": "buffer",
                //     "meta": {
                //         "itemCode": data?._id,
                //     }
                // });
                console.log('buffer');
                const timeout = setTimeout(() => {
                    setIsBuffering(true);
                }, 5000);
                // clear timeout
                // clearTimeout(timeout);
                
            });

            // on complete video
            player?.on('complete', function() {
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

            player?.on('error', function(error : any) {
                console.log('error: ', error);
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
                // player.pause();
                // player.stop();
                player?.remove();
                // setTimeout(() => {-
                //     player.stop();
                // }, 1000);                
            };
        } catch(e){ console.error(e); }

    }, [video, autoplay, drmTokens.widevine]);

    return (
        <>
            {/* IsPlay: {isPlaying.toString()} <br/>
            IsBuffering: {isBuffering.toString()} <br/>
            <br/> */}
            <div className="h-full"  style={styling}>
                <div ref={playerRef} className="h-full" id="jwplayer-container">
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