import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import checkAuthentication from '@/utils/checkAuth';
import { stableKeys } from '@/utils/stableKeys';
import PlayButtonSmall from '@/components/PlayButtonSmall';
import FavoriteButton from '@/components/FavoriteButton';
import PurchaseBadge from '@/modules/Identities/PurchaseBadge';
import BadgeDesktop from '@/modules/Identities/BadgeDesktop';
import { ShareIcon } from '@heroicons/react/24/solid';
import SocialShare from '@/modules/elements/SocialShare';
let settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };

type CarouselProps = {
    items: any[];
};

const Carousel = ({items}:CarouselProps) => {
    return (<div className='pb-4 pt-[55px] bg-gradient-to-t from-black from-50% to-gray-800 to-100% overflow-hidden'>
        <div className='mx-[4vw] mobileCarousel scale-[0.8]'>
            <Slider {...settings}>
                {items?.map((item, index) => {
                    return <CarouselItem key={stableKeys[index]} item={item}/>
                })}
            </Slider>
        </div>
    </div>);
}
export default Carousel;

type CarouselItemProps = {
    item: any;
};
const CarouselItem = ({item}:CarouselItemProps) => {
    const thumb = item?.thumbnailPotrait || item?.thumbnailUrl;
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const _checkAuthentication = async () => {
        const isAuthenticated = await checkAuthentication();
        setIsAuthenticated(isAuthenticated);
        }
        _checkAuthentication();
    }, []);
    const handleToggle = () => {
        setOpen(!open);
    }
    return (<div className='w-full aspect-[6/9] bg-zinc-900 rounded-md relative' >
        {(item?.allowed)?<PurchaseBadge 
        className='!w-[100px] text-center rounded-br-xl rounded-tr-none'
        style={{
            left: '50%',
            transform: 'translateX(-50%)',
        }}/>:
        <BadgeDesktop text="Sale" theme="orange" className='!w-[100px] text-center rounded-br-xl rounded-tr-none'
        style={{
            left: '50%',
            transform: 'translateX(-50%)',
        }}/>}
        <div className='w-full h-full rounded-lg cursor-pointer' onClick={() => router.push(`/details/${item?._id}`)}>
            <img src={thumb} alt={item?.title} className='w-full h-full object-cover rounded-lg'/>
        </div>
        <div className='absolute bottom-0 left-0 w-full p-2 pb-4 pt-12 bg-gradient-to-t from-black/60 from-60% to-transparent to-85%'>
            <p className='text-white text-lg font-medium text-center mb-2 drop-shadow-md'>
                {item?.title}
            </p>
            <div className='flex justify-center'>
                <PlayButtonSmall 
                    movieId={item?._id}
                    classes='mr-4 bg-white/40 hover:bg-white/50'
                    innerClass='text-white'
                />
                {(isAuthenticated)&&
                <FavoriteButton 
                    movieId={item?._id}
                    classes='mr-4 bg-white/40 hover:bg-white/50'
                    style={{
                        borderWidth: 0,
                    }}
                    innerClass='text-white'
                />}
                
                {(item?._id)?<>
                    <button 
                        onClick={handleToggle}
                        className="cursor-pointer group/item w-8 h-8 flex justify-center items-center transition bg-[#fff]/30 hover:bg-[#fff]/40 rounded-full">
                        <ShareIcon className="text-white group-hover/item:text-neutral-300 w-4" />
                    </button>
                    <SocialShare 
                        open={open}
                        setOpen={setOpen}
                        url={`${process.env.NEXT_PUBLIC_SSO_DOMAIN}/details/${item?._id}`}
                        title={item?.title}
                    />
                </>:null}
            </div>
        </div>
    </div>);
}