import React, {useEffect, useState} from 'react';
import WishListButton from '@/modules/Identities/WishListButton';
import { ShareIcon } from '@heroicons/react/24/solid';
import SocialShare from '@/modules/elements/SocialShare';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';
import checkAuthentication from '@/utils/checkAuth';
import RentPlayButtonAction from '@/modules/elements/Purchase/RentPlayButtonAction';
import RentPlayNotice from '@/modules/elements/Purchase/RentPlayNotice';
import TrailerRestartButton from '@/modules/elements/Purchase/TrailerRestartButton';
import {
    AccessTimeOutlined
} from '@mui/icons-material';
import { isOnAir } from "@/utils/dataTimeChecking";
import {
    convertESTtoLocalTime,
  } from "@/utils/yearFromDate";

type dataProps = {
    data: any,
    module: any
}
const WatchAndShare = (inputProps:dataProps) => {

    const {data} = inputProps
    const onAirDate = data?.onAirDate;

    // console.log('data', data);
    const [open, setOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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
                    {(onAirDate && !isOnAir(onAirDate))?( 
                        <div className='block mb-4'>
                            <RentPlayNotice data={data?.allowed} />
                            <p className="text-white/90 text-sm mt-1 flex justify-start aligns-center">
                                <AccessTimeOutlined className='mr-1' 
                                    sx={{fontSize: '1.2rem'}}/>
                                <span>{convertESTtoLocalTime(data?.onAirDate as string)}</span>
                            </p> 
                        </div>                  
                    )
                    :(
                        <RentPlayNotice data={data?.allowed} />
                    )}
                    <div className='w-full flex flex-wrap items-center'>      
                        <div className='mr-4'>
                            <RentPlayButtonAction
                                data={data}
                                allowedData={data?.allowed}
                                size='lg'
                            />                                                       
                        </div>
                        <div className='mr-4'>
                            <TrailerRestartButton
                                data={data?.allowed}
                                itemId={data?._id}
                                currentTime={data?.currentTime}
                            />
                        </div>                        
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
        <ErrorPopUp message={"This content is not available now."}/>
        }
    </>);
    
  
}
export default WatchAndShare;