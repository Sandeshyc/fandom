import React, { useRef, useEffect, useState } from 'react';
import ErrorPopUp from "@/modules/elements/ErrorPopUp";
import useDrm from "@/hooks/useDrm";
import usePlayerEvent from "@/hooks/usePlayerEvent";
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
let closeCaption = [] as any;
const BitMovinPlayer: React.FC<VideoPlayerProps>  = ({image, video, control, autoplay, isComplited, caption, pictureInPicture, data, isRestart }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const { getDrmTokens } = useDrm();
    const {logPlayerEvent} = usePlayerEvent();
    const [fingerPrintId, setFingerPrintId] = useState('');
    const [userId, setUserId] = useState('');
    const [accessToken, setAccessToken] = useState('');

    // console.log('bitmovin player caption::', caption);    
    if(Array.isArray(caption) && caption.length > 0){
        closeCaption = caption.map((item: any, index:number) => {
            return {
                id: 'ssub' + (index+1),
                lang: item.caption,
                label: item.caption,
                url: item.url,
                kind: "subtitle"
            }
        });
    }
    // console.log('bitmovin player closeCaption::', closeCaption);
    const playerRef = useRef<any>(null);
    const [drmTokens, setDrmTokens] = useState<any>({
        widevine: '',
        fairplay: '',
        playready: '',
    });
    const [drmError, setDrmError] = useState(false);
    // console.log('drmTokens: ', drmTokens, drmError);
    const [sources, setSources] = useState({
        dash: video.DASH || '',
        hls: video.HLS || '',
        poster: image || '',
        drm: {
            widevine: {
                LA_URL: drmTokens.widevine || '',
            },
            fairplay: {
                LA_URL: drmTokens.fairplay || '',
            },
            playready: {
                LA_URL: drmTokens.playready || '',
            }
        },
    });    

    const [config, setConfig] = useState({
        key: process.env.NEXT_PUBLIC_BITMOVIN_KEY,
        cast: {
            enable: true
        },
        playback: {
            autoplay: autoplay,
            muted: false,
            controls: control,
            playsinline: false,
            loop: false,
            autoQualitySwitching: true,
            playbackSpeedSelectionEnabled: true,
            playbackSpeedControlEnabled: true,
            defaultPlaybackSpeed: 1,
        },
        style: {
            width: '100%',
            aspectratio: '16:9',
        },
        skin: {
            screenLogoImage: ""
        }
    });

    useEffect(() => {
        const _getDrmTokens = async () => {
            const returnResponse = await getDrmTokens();
            if(returnResponse.status === 'success'){
                setDrmTokens(returnResponse.data);
            }else if(returnResponse.status === 'error'){
                setDrmError(true);
            }
        }
        _getDrmTokens();
    }, [video, autoplay]);

    useEffect(() => {        
        var playerContainer = document.getElementById("bitmovinPlayer");
        const player = new window.bitmovin.player.Player(playerContainer, config);
        player?.load(sources).then(function() {
            setIsLoaded(true);
            if(Array.isArray(closeCaption) && closeCaption.length > 0){
                closeCaption.forEach((subtitle:any, index:number) => {
                    player?.subtitles?.add(subtitle);
                    if(index === 0){
                        player?.subtitles?.enable(subtitle.id, false);
                    }
                });
            }

            if(pictureInPicture){
                player?.pip?.enable();
            }
            if(!isRestart && data?.currentTime && data?.videoDuration && data?.currentTime < data?.videoDuration){
                player?.seek(data?.currentTime);
            }
            player?.setVolume(50);

        });
        player.on('paused', function () {
            const currentTime = player?.getCurrentTime();
            const duration = player?.getDuration();
            logPlayerEvent({
                "eventType": "player",
                "eventName": "pause",
                "meta": {
                    "itemCode": data?._id,
                    "currentTime": currentTime,
                    "duration": duration,
                }
            });
            console.log('Video Pause', currentTime, duration);
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
        player.on('play', function () {
            logPlayerEvent({
                "eventType": "player",
                "eventName": "play",
                "meta": {
                    "itemCode": data?._id,
                }
            });
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
        player.on('completed', function () {
            logPlayerEvent({
                "eventType": "player",
                "eventName": "completed",
                "meta": {
                    "itemCode": data?._id,
                }
            });
            if(isComplited){
                isComplited();
            }
        });
        player.on('error', function (error:any) {
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
            console.log('Video Error', error);
        });
        return () => {
            player?.destroy();
            if(playerContainer){
                // playerContainer.innerHTML = '';
            }
        };
    }, [sources]);
    useEffect(() => {
        setSources({
            dash: video.DASH || '',
            hls: video.HLS || '',
            poster: image || '',
            drm: {
                widevine: {
                    LA_URL: drmTokens.widevine || '',
                },
                fairplay: {
                    LA_URL: drmTokens.fairplay || '',
                },
                playready: {
                    LA_URL: drmTokens.playready || '',
                }
            },
        })
    },[drmTokens]);
    useEffect(() => {
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
    },[data?._id]);
    return (
        <>
        <div id="bitmovinPlayer" className={`w-screen max-h-full h-full bg-black`} ref={playerRef}></div>
        {drmError? <ErrorPopUp message="Sorry for the interruptions, will be fixed soon!"/> : null}
        </>
    );
};
export default BitMovinPlayer;