import React, { useEffect, useState } from 'react';
import Navigation from "@/modules/components/Navigation";
import Header from '@/modules/elements/Header';
import Footer from '@/components/Footer';
import BottomNavigation from '@/modules/elements/Navigation/BottomNavigation';
import ReelHeading from '@/modules/elements/ReelHeading';
import useIsMobile from '@/hooks/useIsMobile';

import RollImage from '@/modules/Identities/RollImage';
const bgImage = 'url("/images/new-bg.png")';
const Offers = () => {
    const isMobile = useIsMobile();
    return (
        <div className="pt-16 lg:pt-32 text-white bg-gradient-to-b from-[#050505] via-[#1E1E1E] to-[#000000]"
        style={{
            // backgroundImage: bgImage,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% auto',
            backgroundPosition: 'right '+ 30 + '%',
        }}>
        {isMobile?<Header/>:<Navigation/>}
        <div className={`px-4 mb-[3vw] min-h-[75vh] container max-w-[2400px] mx-auto`}>
            <ReelHeading title="Deals and Offers" />
            <div className='flex flex-wrap pb-4 mx-[-15px]'>
                {Array.from({length: 8}, (_, i) => {
                    return (
                    <div className="w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 p-[15px]" 
                    key={i}>
                        <SampleCard i={i}/>
                    </div>
                    )
                })}
            </div>
        </div>
        {isMobile?<BottomNavigation/>:<Footer/>}
        </div>
    );
}
export default Offers;

export const SampleCard = ({i}:{i:number}) => {
    const randomImages = [
        'https://st2.depositphotos.com/3591429/11817/i/450/depositphotos_118171144-stock-photo-drawing-icons-with-text.jpg',
        'https://amc-theatres-res.cloudinary.com/image/upload/v1704493820/amc-cdn/general/discount-matinees/mkt_2616_2024__discount_matinee_4pm-25_percent_web_promo_1250x892_v02.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT5tQzJ_FHUJLLeNN7XO5xWRU19ByQDKKxIfLlOZeX0ZPA3_QPsBjpkJziDHUOrjVuat4&usqp=CAU',
        'https://m.media-amazon.com/images/I/51G0YY3oSYL._AC_UF894,1000_QL80_.jpg',
        'https://images.pond5.com/cinema-sign-street-entrance-movie-footage-237821891_iconl.jpeg',
        'https://img.freepik.com/premium-vector/two-cinema-tickets-vector-flat-design_159144-288.jpg',
        'https://amc-theatres-res.cloudinary.com/image/upload/v1704493820/amc-cdn/general/discount-matinees/mkt_2616_2024__discount_matinee_4pm-25_percent_web_promo_1250x892_v02.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT5tQzJ_FHUJLLeNN7XO5xWRU19ByQDKKxIfLlOZeX0ZPA3_QPsBjpkJziDHUOrjVuat4&usqp=CAU',
        'https://m.media-amazon.com/images/I/51G0YY3oSYL._AC_UF894,1000_QL80_.jpg',
    ]
    return (
    <div 
    className={`group bg-zinc-900 rounded-md col-span relative movieCard cursor-pointer aspect-[16/9]`} >
      <div className='img relative h-full w-full rounded-md overflow-hidden'>   
        <p className={`text-center min-w-[100px] text-[11px] lg:text-xs py-1 px-2 lg:px-4 w-auto absolute top-0 right-0 z-20 rounded-bl-xl rounded-tr-md shadow-lg bg-gradient-to-l from-orange-700 to-orange-500 text-white/90`}>50% off</p>
        <img src={randomImages[i]} className='w-full h-full bg-red-500 !object-cover' alt="Test" />
      </div>
    </div>
    );
}