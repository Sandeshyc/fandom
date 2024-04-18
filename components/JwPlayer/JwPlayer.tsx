import { set } from "lodash";
import React, { useState, useEffect, useRef, use } from "react";

import usePlayerEvent from "@/hooks/usePlayerEvent";
import axios from "axios";
import ErrorPopUp from "@/modules/elements/ErrorPopUp";
import { getCookie } from "@/utils";


interface VideoPlayerProps {
    image : string;
    video : {
        HLS: string;
        DASH: string;
    }
    control : boolean;
    autoplay : boolean;
    isComplited : () => void;
    caption?: any,
    pictureInPicture: boolean;
    data : any;
    isRestart?: boolean;
}

const kid = process.env.NEXT_PUBLIC_DKID || '';
let kidEnc = kid as string;
if(kid){
    kidEnc = Buffer.from(kid).toString('base64');
    console.log('kid: ', kidEnc);
}




const VideoPlayer: React.FC<VideoPlayerProps>  = ({image, video, control, autoplay, isComplited, caption, pictureInPicture, data, isRestart }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);
    const playerRef = useRef();
    const {logPlayerEvent} = usePlayerEvent();
    const [firstPlay, setFirstPlay] = useState(true);
    const [drmError, setDrmError] = useState(false);
    const x = useRef(0);
    const [drmTokens, setDrmTokens] = useState<any>({
        widevine: '',
        fairplay: '',
        playready: '',
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
                
                // get DRM tokens from cookies
                let token = getCookie(`tfctDT_${kidEnc}`);
                console.log('token cookie: ', token);
                if(token){
                    token = JSON.parse(token);
                    setDrmTokens(token);
                    return;
                }

                // get DRM tokens from API
                const tokens = await axios ({
                    method: 'get',
                    url: `${process.env.NEXT_PUBLIC_API_URL}/item/${kid}/dkey`,
                });
                console.log('tokens: ', tokens?.data?.data);
                if(tokens?.data?.data){
                    // save token in cookies with 30 day expiry
                    const tokes_string = JSON.stringify(tokens?.data?.data);
                    document.cookie = `tfctDT_${kidEnc}=${tokes_string}; max-age=${60*60*23*3}; path=/`;
                    setDrmTokens(tokens?.data?.data);
                }

            } catch(e){ 
                console.error('DRM error :');
                setDrmError(true)
                console.error(e); 
            }
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
            // if no video url then return
            if(!video || (!video?.HLS && !video?.DASH)){
                setDrmError(true);
                return;
            }
            
            console.log('drmTokens.fairplay: ', drmTokens.fairplay);
            if ( video === undefined || !playerRef.current || typeof window === "undefined" || !drmTokens.widevine ) return;
            // make track are ready
            let tracks: any = [];

            if (caption && Array.isArray(caption) && caption.length > 0){
                caption.forEach((track: any, index: number) => {
                    tracks.push({
                        file: track.url,
                        label: track.caption,
                        kind: "captions",
                        "default": index === 0,
                    })
                });
                // tracks.push({
                //     file: caption,
                //     kind: "captions",
                //     "default": true,
                //     // label: "English"
                // })
            }

            playerRef.current.innerHTML = "<div className='h-full' />";
            playerRef.current.style ="opacity: 0.5"

            const player = window.jwplayer(playerRef.current.firstChild);
            console.log('player: ', player);
            console.log('playerRef.current.firstChild: ', playerRef.current.firstChild);

            if(!player || !playerRef.current.firstChild) return;
            player.setup({
                playlist:  [{ 
                    image: image,
                    sources:  [{
                        "type": "hls",
                        file: video?.HLS,
                        "drm": {
                            "fairplay": {
                                "certificateUrl": "https://mcnassets.akamaized.net/Test/fairplay.cer",
                                "processSpcUrl": drmTokens?.fairplay,
                                licenseRequestHeaders : [
                                    {
                                        "name": "Content-Type",
                                        "value": "application/octet-stream"
                                    }
                                ]
                            },
                        } 
                    },{ 
                        file: video?.DASH,
                        "drm": {
                            "widevine": {
                                "url": drmTokens?.widevine,
                            }
                        }  
                    },{
                        file: video?.DASH,
                        "drm": {
                            "playready": {
                                "url": drmTokens?.playready,
                            }
                        }
                    }],
                    // multiple audio tracks
                    tracks: tracks,
                    // tracks:[
                    //     {
                    //       "file" : "https://abs-vcms.akamaized.net/media/input/alovestory_2007_f1_restoredlocal_wmk-165229/output/Thumbnails/ALoveStory_2007_F1_RestoredLocal_000001.vtt",
                    //       "kind" : "thumbnails"
                    //     }
                    // ]
                }],
                // file: video,
                // image: image,
                // type: "application/vnd.apple.mpegurl",
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
                setDrmError(false);
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
                setIsPlaying(false);
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
                setDrmError(true);
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
        } catch(e){ 
            console.error(e); 
            setDrmError(true);
        }

    }, [video, autoplay, drmTokens.widevine]);

    // Fast Forward
    useEffect(() => {
        const playerContainerSelector = '#jwplayer-container';
        const player = window.jwplayer(playerRef.current.firstChild);
        const playerContainer = document.querySelector(playerContainerSelector);
        if(playerContainer){
            const rewindContainer = playerContainer.querySelector('.jw-display-icon-rewind');
            // console.log('rewindContainer: ', rewindContainer);
            if(rewindContainer){
                const forwardContainer = rewindContainer.cloneNode(true);
                // console.log('forwardContainer: ', forwardContainer);
                if(forwardContainer){
                    const forwardDisplayButton = forwardContainer.querySelector('.jw-icon-rewind');
                    // console.log('forwardDisplayButton: ', forwardDisplayButton);
                    if(forwardDisplayButton){
                        forwardDisplayButton.style.transform = "scaleX(-1)";
                        forwardDisplayButton.ariaLabel = "Forward 10 Seconds"
                        // add class to forward button
                        // forwardDisplayButton.classList.add('custom-forward-button');
                        // console.log('forwardDisplayButton: ', forwardDisplayButton);
                        const nextContainer = playerContainer.querySelector('.jw-display-icon-next');
                        // console.log('nextContainer: ', nextContainer);
                        if(nextContainer){
                            nextContainer.parentNode.insertBefore(forwardContainer, nextContainer);
                            nextContainer.style.display = 'none';
                        }

                    }
                }
            }
            
            const buttonContainer = playerContainer.querySelector('.jw-button-container');
            if(buttonContainer){
                const rewindControlBarButton = buttonContainer.querySelector(".jw-icon-rewind");
                // console.log('rewindControlBarButton: ', rewindControlBarButton);
                if(rewindControlBarButton){
                    const forwardControlBarButton = rewindControlBarButton.cloneNode(true);
                    if(forwardControlBarButton){
                        forwardControlBarButton.style.transform = "scaleX(-1)";
                        forwardControlBarButton.ariaLabel = "Forward 10 Seconds";
                        rewindControlBarButton.parentNode.insertBefore(forwardControlBarButton, rewindControlBarButton.nextElementSibling);

                        [forwardControlBarButton].forEach(button => {
                            button.onclick = () => {
                                if(player){
                                    console.log('forward 10 sec', player);
                                    player.seek((player.getPosition() + 10));
                                }else{
                                    console.log('forward 10 sec');
                                }
                            }
                        })

                    }
                }
            }

            // add onclick handlers
            // add onclick handlers
            
        }

        

    }, [isReady]);

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
            {drmError? <ErrorPopUp message="Sorry for the interruptions, will be fixed soon!"/> : null}
        </>
    )
};

// default props
VideoPlayer.defaultProps = {
    image: "",
    video: {
        HLS: "",
        DASH: "",
    },
    control: true,
    autoplay: true,
    pictureInPicture: false,
};

export default VideoPlayer;