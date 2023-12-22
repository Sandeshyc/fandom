import React from 'react';
import { useRouter } from 'next/router';
import Buttons from '@/components/identites/Buttons';
import {
    OffersIcon
} from '@/utils/CustomSVGs';

const bgImage = '/images/amazingDeals.png';

interface MovieListProps {
}
const AmazingDeals: React.FC<MovieListProps> = () => {
  const router = useRouter();

  return (
    <div className={`my-[4vw]`}>
        <div className='container mx-auto max-w-[1680px] border border-[#262626] rounded-md'
        style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }}>
            <div className='flex flex-col justify-center lg:flex-row flex-wrap items-center py-6 px-6 md:px-8 lg:px-12 xl:px-20 bg-gradient-to-b lg:bg-gradient-to-r from-[#0F0F0F] from-45% via-[#0245F2]/30 via-75% to-[#0245F2]/20 to-95%'
            style={{
                minHeight: '410px',
            }}>
                <div className='w-[100%] lg:w-[70%] mb-6 lg:mb-0'>
                    <h3 className='text-4xl xl:text-6xl font-normal mb-2 lg:mb-4'>
                        Get Amazing Deals & Offers
                    </h3>
                    <p className='text-base font-light'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                    </p>
                </div>
                <div className='w-[100%] lg:w-[30%] lg:pl-4 lg:flex lg:justify-end'>
                    <Buttons
                        onClick={ () => router.push('/')}
                        type='white'
                        className='min-w-[240px] h-[48px] text-[#0245F2] hover:bg-[#eee]'
                        >
                        <OffersIcon/>
                        <span className='ml-2 text-[#0245F2]'>See All Offers </span>   
                    </Buttons>
                </div>
            </div>
        </div>
    </div>
  );
}

export default AmazingDeals;

