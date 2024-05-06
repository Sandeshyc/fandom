import React, {use, useEffect} from 'react';
import { useRouter } from 'next/router';
import Mapper from '@/modules/ModuleMapper';
import {getComponent} from '@/modules';
import useMovieDetails from '@/hooks/useMovieDetails';
import useClientLocaion from '@/hooks/useClientLocaion';
import useIsMobile from '@/hooks/useIsMobile';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';
import Preloader from "@/modules/skeletons/Preloader";

const bgImage = 'url("/images/new-bg.png")';
const Channel = () => {
    const [isReady, setIsReady] = React.useState(false);
    const router = useRouter();
    const isMobile = useIsMobile();
    // const [region, setRegion] = React.useState('PH'); // Need to update
    const { channelId } = router.query;
    const [isError, setIsError] = React.useState(false);
    const [userIdToken, setUserIdToken] = React.useState('');

    const {data: clientLocation, error: locationError}:any = useClientLocaion();
    const region = clientLocation?.country?.isoCode;

    const { data: movieDetails, isLoading, error} = useMovieDetails(channelId as string, userIdToken, (isMobile)?'mobile':'web', region); // Need to upate
    console.log('isLoading', isLoading, 'movieDetails', movieDetails, 'error', error);
    // console.log('movieDetails', movieDetails);
    // console.log('isLoading', isLoading);
    // console.log('error', error);
    // const { data: movieDetails, isLoading} = useMovieDetails(movieId as string, userIdToken, (isMobile)?'mobile':'web');
    useEffect(() => {
        setIsReady(true);
        const userInfo = window.localStorage.getItem('userInfo');
        if (userInfo) {
        const userInfoObj = JSON.parse(userInfo);
        if(userInfoObj.sub) {
            setUserIdToken(userInfoObj.sub);
        }
        }    
    }, []);

    useEffect(() => {
        // console.log('movieId', movieId);
        if(isLoading && !channelId){
        setIsError(true);
        }
    }, [isLoading]);

    useEffect(() => {    
        const userInfo = window.localStorage.getItem('userInfo');
        if (userInfo) {
        const userInfoObj = JSON.parse(userInfo);
        if(userInfoObj.sub) {
            // setUserIdToken(userInfoObj.sub);
        }else{
            // router.push('/auth');
        }
        }else{
        // router.push('/auth');
        }
    }, []);

    return (<>
        {(isReady && !isLoading && movieDetails)?<>
        <div className="text-white bg-[#000000] overflow-x-hidden bg-gradient-to-b from-[#050505] via-[#1E1E1E] to-[#000000]" 
        style={{
            // backgroundImage: bgImage,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% auto',
            backgroundPosition: 'right '+ 50 + 'vh',
        }}>
            <Mapper
            modules={movieDetails}
            itemCode = {channelId as string}
            getComponent = {getComponent}
            isLoading = {isLoading}/>
        </div>
        </>:<Preloader/>}
        {(error || isError || locationError) && <ErrorPopUp message={'Sorry, Something went wrong!'} errorMsg={error}/>}
    </>
    )
}
export default Channel;