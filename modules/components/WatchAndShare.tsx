import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import PlayButton from '@/components/PlayButton';
import WatchTrailerBtn from '@/components/WatchTrailerBtn';
import Buy from '@/components/Buy';
import FavoriteButton from '@/components/FavoriteButton';
import WishListButton from '@/modules/Identities/WishListButton';
import Buttons from '@/modules/Identities/Buttons';
import { ThumbUp, RestartAlt } from '@mui/icons-material';
import { ShareIcon } from '@heroicons/react/24/solid';
import { PlayIcon } from '@heroicons/react/24/solid';
import { stableKeys } from '@/utils/stableKeys';
import {ReportProblem} from '@mui/icons-material';
import useIsMobile from '@/hooks/useIsMobile';
import WatchAndBuy from '@/modules/components/WatchAndBuy';
import ShareBtnGroup from '@/modules/components/ShareBtnGroup';
import SocialShare from '@/modules/elements/SocialShare';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';
import checkAuthentication from '@/utils/checkAuth';
import RentButton from '@/modules/elements/Purchase/RentButton';
import WarningMessage from '@/modules/Identities/WarningMessage';
import PackagesPopup from '@/modules/elements/Purchase/PackagesPopup';


type dataProps = {
    data: any,
    module: any
}
const WatchAndShare = (inputProps:dataProps) => {

    const {data} = inputProps


    // console.log('data', data);
    const [open, setOpen] = useState(false);
    const [isPackagePopupOpen, setIsPackagePopupOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const isMobile = useIsMobile();
    const handleToggle = () => {
        setOpen(!open);
    }
    useEffect(() => {
        const _checkAuthentication = async () => {
            const isAuthenticated = await checkAuthentication();
            setIsAuthenticated(isAuthenticated);
        }
        _checkAuthentication();
    }, []);
    return (<>
        {(data && data?._id)?(
            <div className='text-white z-10 relative bg-gradient-to-t from-black from-50% to-black/90 to-100% pb-8'>
                <div className='container mx-auto px-4'>
                    {(data?.messages && data?.messages?.length > 0)&&(
                        <WarningMessage
                            message={data?.messages}
                        />
                    )}
                    {(isPackagePopupOpen)&&(
                        <PackagesPopup 
                            allowedPlans={data?.allowedPlans}
                            data={data}
                            movieId={data?._id}
                            isPackagePopupOpen={isPackagePopupOpen}
                            setIsPackagePopupOpen={() => setIsPackagePopupOpen(false)}
                        />
                    )}
                    <div className='w-full flex flex-wrap items-center'>      
                        <div className='mr-4'>
                            {(data?.allowed)?(
                                <>
                                {(data?.currentTime)?(
                                    <Buttons
                                    onClick={() => router.push(`/watch/${data?._id}`)} 
                                    type='white'>
                                        <PlayIcon className="w-6 text-black mr-2" /> Resume
                                    </Buttons>
                                )
                                :
                                (
                                    <PlayButton movieId={data?._id}/>
                                )}
                                </>
                            ):(
                                <>
                                {(data?.canBuy)?(
                                    <RentButton type='active'
                                    onClick={() => setIsPackagePopupOpen(true)}
                                    >Rent</RentButton>
                                )
                                :
                                (
                                    <RentButton type='disabled'>Rent</RentButton>
                                )}
                                </>
                            )}                            
                        </div>
                        {
                        (!(data?.isPackage) && data?.allowed && data?.currentTime)?
                            (
                            <div className='mr-4'>
                                <Buttons
                                onClick={() => router.push(`/watch/${data?._id}?t=restart`)} 
                                type='white'>
                                    <RestartAlt className="w-6 text-black mr-2" /> Restart
                                </Buttons>
                            </div>
                            )
                        :
                            (
                            <div className='mr-4'>
                                <WatchTrailerBtn movieId={data?._id} />
                            </div>
                            )
                        }
                        {(isAuthenticated)&&<WishListButton movieId={data?._id} isInWatchList={data?.isInWatchList}/>}
                        <button 
                            onClick={handleToggle}
                            className="cursor-pointer group/item w-9 h-9 flex justify-center items-center transition">
                            <ShareIcon className="text-white group-hover/item:text-neutral-300 w-6" />
                        </button>
                        <SocialShare 
                            open={open}
                            setOpen={setOpen}
                            url={`${process.env.NEXT_PUBLIC_SSO_DOMAIN}/details/${data?._id}`}
                            title={data?.title}
                        />
                    </div>
                </div>
            </div>
        )
        :
        <ErrorPopUp message={"Sorry, Something went wrong!"} errorMsg={'Movie ID Not Found!'}/>
        }
    </>);
    
  
}
export default WatchAndShare;