import React from 'react';
import FavoriteButton from '@/components/FavoriteButton';
import Buttons from '@/components/identites/Buttons';
import { ThumbUp, Shop } from '@mui/icons-material';
import { ShareIcon } from '@heroicons/react/24/solid';


const PackageDetailsHeroBanner = () => {
    let thumb = 'https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5302/1535302-a-e90748391e0d';
    return (<div className="relative z-0 mb-16">
        <div className="shadow-md rounded-t-lg jk_player h-[350px] md:h-[70vh] max-h-[100%]"  style={{backgroundImage: `url(${thumb})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
        <div className="absolute bottom-0 left-0 w-full min-h-[200px] z-10 bg-gradient-to-t from-black from-25% via-black/50 via-70% to-transparent to-100% pt-32 pb-16">
            <div className="text-white max-w-[1600px] mx-auto px-[15px] z-10 relative my-4">
                <h1 className="text-2xl md:text-4xl h-full lg:text-5xl mb-2 lg:mb-3">{'Action'}</h1>
                <p className="mb-1 flex items-center flex-wrap my-2">
                    <span className="text-gray-300 mr-2 text-xl">{'8 Movies'}</span>
                    <span className="text-gray-300 text-base">{'(6 Movies are abilabale from Philippine)'}</span>
                </p>
                <p className="my-4">A struggling actress gets lost in Japan and meets a young man whom she convinces to accompany her during her trip. As they develop feelings for each other, she becomes torn between returning home and staying with him A struggling actress gets lost in Japan and meets a young man whom she convinces to accompany her during her trip. As they develop feelings for each other, she becomes torn between returning home and staying with him</p>
                <div className="flex flex-row items-center mb-1">
                    <span className="text-gray-300 mr-4">{'2023'}</span>
                    <p className="border-gray-500 border px-1 mr-1 text-xs">{'HD'}</p>
                    <p className="border-gray-500 border px-1 mr-1 text-xs">{'13+'}</p>
                </div>      
                    <p className="mb-1"><span className="text-gray-300">Content Provider:</span> {'ABS-CBN'}
                </p>
            </div>  

            <div className="text-white max-w-[1600px] mx-auto px-[15px] z-10 relative my-4">
                <p className='mb-2 text-[14px]'>
                    <Shop className="text-[#FFD62C] mr-2" />
                    Available to buy</p>
                <div className="flex flex-row gap-4 items-center lg:mb-5 flex-wrap">            
                    <Buttons
                        onClick={() => {
                            console.log('Rent');                        
                        }} 
                    className="bg-neutral-300 hover:bg-neutral-400 text-black text-base rounded-full transition mr-4">{'Rent'}</Buttons>            
                    <div className='flex flex-row gap-8 items-center mb-0 flex-wrap'>
                        <FavoriteButton movieId={'646060a827f7cf4ef0256bc8'} isInWatchList={false}/>
                        <div className="cursor-pointer group/item w-9 h-9 lg:w-9 lg:h-9 flex justify-center items-center transition">
                            <ThumbUp className="text-white group-hover/item:text-neutral-300 w-6" />
                        </div>
                        <div className="cursor-pointer group/item w-9 h-9 flex justify-center items-center transition">
                            <ShareIcon className="text-white group-hover/item:text-neutral-300 w-6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    </div>);
  
}
export default PackageDetailsHeroBanner;