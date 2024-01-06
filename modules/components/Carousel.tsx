import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { stableKeys } from '@/utils/stableKeys';
import PlayButtonSmall from '@/components/PlayButtonSmall';
import FavoriteButton from '@/components/FavoriteButton';
import PurchaseBadge from '@/modules/Identities/PurchaseBadge';
import { ShareIcon } from '@heroicons/react/24/solid';
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
    // console.log('items: ', items);
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
    return (<div className='w-full aspect-[6/9] bg-zinc-900 rounded-md relative' >
        {(item?.allowed)?<PurchaseBadge 
        className='!w-[100px] text-center rounded-br-xl rounded-tr-none'
        style={{
            left: '50%',
            transform: 'translateX(-50%)',
        }}/>:
        null}
        <img src={thumb} alt={item?.title} className='w-full h-full object-contain rounded-lg'/>
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
                <FavoriteButton 
                    movieId={item?._id}
                    classes='mr-4 bg-white/40 hover:bg-white/50'
                    style={{
                        borderWidth: 0,
                    }}
                    innerClass='text-white'
                />
                <div className="cursor-pointer group/item w-8 h-8 flex justify-center items-center transition bg-[#fff]/30 hover:bg-[#fff]/40 rounded-full">
                    <ShareIcon className="text-white group-hover/item:text-neutral-300 w-4" />
                </div>
            </div>
        </div>
    </div>);
}