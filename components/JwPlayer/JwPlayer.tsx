import { set } from "lodash";
import React, { useState, useEffect, useRef, use } from "react";

import usePlayerEvent from "@/hooks/usePlayerEvent";
import axios from "axios";
import ErrorPopUp from "@/modules/elements/ErrorPopUp";
import { getCookie } from "@/utils";
import {
    getFingerPrintId,
    setEventRecord
} from "@/services/api";


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
    const [fingerPrintId, setFingerPrintId] = useState('');
    const [userId, setUserId] = useState('');
    const [accessToken, setAccessToken] = useState('');
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

    console.log('caption: ', caption);
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

        const _getFingerPrintId = async () => {
            const response = await getFingerPrintId();
            if(response.status === 'success'){
                setFingerPrintId(response.fingerPrintId);
            }
        }
        _getFingerPrintId();

        const userInfo = window.localStorage.getItem('userInfo');
        if(userInfo) {
            const userInfoObj = JSON.parse(userInfo);
            if(userInfoObj.sub) {
                setUserId(userInfoObj.sub);
            }            
        }
        const provider = window.localStorage.getItem('provider');
        if(provider === 'firebase'){
            const accessToken = window.localStorage.getItem('googleIndentityAccessToken');
            if(accessToken){
                setAccessToken(accessToken);
            }
        }else{
            const accessToken = window.localStorage.getItem('oneLogInAccessToken');
            if(accessToken){
                setAccessToken(accessToken);
            }
        }
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
                    image: '',
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
                if(x !== null && x !== undefined && x.current === 0){
                    setTimeout(() => {
                        // console.log('set volume', x.current);
                        player.setVolume(50);
                        x.current = 1;
                    }, 500);
                }
                const eventData = {
                    "eventType": "play",
                    "data": {
                        "deviveId": fingerPrintId,
                        "sessionId": accessToken,
                        "userId": userId,
                        "assetId": data?._id,
                        "contentTitle": data?.title,
                        "time": player.getPosition(),
                    }
                };
                setEventRecord(eventData);
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

                const eventData = {
                    "eventType": "pause",
                    "data": {
                        "deviveId": fingerPrintId,
                        "sessionId": accessToken,
                        "userId": userId,
                        "assetId": data?._id,
                        "contentTitle": data?.title,
                        "time": player.getPosition(),
                    }
                };
                setEventRecord(eventData);
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
                        forwardDisplayButton.classList.add('custom-forward-button');
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
                    rewindControlBarButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#fff" id="replay-10s"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8zm-1.1 11h-.85v-3.26l-1.01.31v-.69l1.77-.63h.09V16zm4.28-1.76c0 .32-.03.6-.1.82s-.17.42-.29.57-.28.26-.45.33-.37.1-.59.1-.41-.03-.59-.1-.33-.18-.46-.33-.23-.34-.3-.57-.11-.5-.11-.82v-.74c0-.32.03-.6.1-.82s.17-.42.29-.57.28-.26.45-.33.37-.1.59-.1.41.03.59.1.33.18.46.33.23.34.3.57.11.5.11.82v.74zm-.85-.86c0-.19-.01-.35-.04-.48s-.07-.23-.12-.31-.11-.14-.19-.17-.16-.05-.25-.05-.18.02-.25.05-.14.09-.19.17-.09.18-.12.31-.04.29-.04.48v.97c0 .19.01.35.04.48s.07.24.12.32.11.14.19.17.16.05.25.05.18-.02.25-.05.14-.09.19-.17.09-.19.11-.32.04-.29.04-.48v-.97z"></path></svg>';
                    const forwardControlBarButton = rewindControlBarButton.cloneNode(true);
                    if(forwardControlBarButton){
                        // forwardControlBarButton.style.transform = "scaleX(-1)";
                        forwardControlBarButton.ariaLabel = "Forward 10 Seconds";
                        forwardControlBarButton.classList.add('custom-forward-button');
                        forwardControlBarButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#fff" id="forward-10s"><path d="M18.92 13c-.5 0-.91.37-.98.86-.48 3.37-3.77 5.84-7.42 4.96-2.25-.54-3.91-2.27-4.39-4.53C5.32 10.42 8.27 7 12 7v2.79c0 .45.54.67.85.35l3.79-3.79c.2-.2.2-.51 0-.71l-3.79-3.79c-.31-.31-.85-.09-.85.36V5c-4.94 0-8.84 4.48-7.84 9.6.6 3.11 2.9 5.5 5.99 6.19 4.83 1.08 9.15-2.2 9.77-6.67.09-.59-.4-1.12-1-1.12zm-8.02 3v-4.27h-.09l-1.77.63v.69l1.01-.31V16zm3.42-4.22c-.18-.07-.37-.1-.59-.1s-.41.03-.59.1-.33.18-.45.33-.23.34-.29.57-.1.5-.1.82v.74c0 .32.04.6.11.82s.17.42.3.57.28.26.46.33.37.1.59.1.41-.03.59-.1.33-.18.45-.33.22-.34.29-.57.1-.5.1-.82v-.74c0-.32-.04-.6-.11-.82s-.17-.42-.3-.57-.29-.26-.46-.33zm.01 2.57c0 .19-.01.35-.04.48s-.06.24-.11.32-.11.14-.19.17-.16.05-.25.05-.18-.02-.25-.05-.14-.09-.19-.17-.09-.19-.12-.32-.04-.29-.04-.48v-.97c0-.19.01-.35.04-.48s.06-.23.12-.31.11-.14.19-.17.16-.05.25-.05.18.02.25.05.14.09.19.17.09.18.12.31.04.29.04.48v.97z"/></svg><div class="jw-reset-text jw-tooltip jw-tooltip-rewind" dir="auto"><div class="jw-text">Forward 10 Seconds</div></div>';
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