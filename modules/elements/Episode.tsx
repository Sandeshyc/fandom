import React from 'react';
import ReadMoreDescription from '@/modules/Identities/ReadMoreDescription';
import Buttons from '@/modules/Identities/Buttons';
const Episode = () => {
    return (
    <div className='mb-8 flex flex-wrap border-b border-white/40 pb-8 last:border-none'>
        <div className='w-full sm:w-1/2 md:w-1/3 sm:pr-4 mb-2 sm:mb-0'>
            <img src="https://images2.vudu.com/assets/content/placard/252165-301" alt="img" className='rounded-md' />
        </div>
        <div className='w-full sm:w-1/2 md:w-2/3 lg:w-1/3'>
            <h3 className='text-lg mb-2'>1. The First Exile</h3>
            <p className='mb-1 flex items-center flex-wrap my-2 text-white/70'>
                <span className="border-white/80 border px-1 mr-1 mb-1 text-xs rounded-sm">HDX</span>
                <span className="border-white/80 border px-1 mr-2 mb-1 text-xs rounded-sm">TV-PG</span>
                <span className='text-xs mb-1'>44m . Feb 1, 2006</span>
            </p>
            <div className='text-sm mt-4 text-white/70'>
            <ReadMoreDescription
                text="The 16 castaways are divided into four tribes of four: Older Men, Older Women, Younger Men and Younger Women. This season, at least one Survivor each episode is banished to a separate island miles away from camp. But that's not all bad: there's a hidden Immunity Idol somewhere on Exile Island."
            />
            </div>
        </div>
        <div className='w-full lg:w-1/3 md:text-center md:pl-2'>
            <Buttons
                type="blue"
                className="mt-4"
                onClick={() => {}}
            >
                Rent
            </Buttons>
        </div>
    </div>);
}
export default Episode;