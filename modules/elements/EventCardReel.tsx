import React, { useState, useEffect } from 'react';
import {
    CalendarMonthTwoTone,
    FiberManualRecord
} from '@mui/icons-material';
import Text from '@/modules/Identities/Text';
import Title from '@/modules/Identities/Title';
import FavoriteButton from '@/modules/Identities/FavoriteButton';
import Buttons from '@/modules/Identities/Buttons';
const EventCardReel = () => {
    return(
        <div className={`group bg-zinc-900 rounded-md relative border border-contentColor/10`} >
            <div className='flex flex-wrap flex-col sm:flex-row'>
                <div className='w-full h-auto sm:w-1/3 sm:bg-zinc-700 sm:aspect-[6/9] cursor-pointer'>
                    <img src="https://images2.vudu.com/assets/content/poster/3002402-144" alt="ABS-CBN Logo" className='w-1/2 sm:w-full sm:h-full scale-105 object-contain rounded-md bg-zinc-500 mx-auto' />
                </div>
                <div className='sm:w-2/3 p-4'>
                    <Title tag='h3' size='xl'>Beloved</Title>
                    <div className='mt-2 mb-4 text-white/60'>
                        <Text size='sm' clamp={4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</Text>
                    </div>
                    <p className='text-white/70 text-sm mb-1 flex align-top'>
                        <CalendarMonthTwoTone 
                        sx={{
                            fontSize: '1.2rem',
                        }}
                        className='mr-1' />
                        <span>Starts From</span>
                    </p>
                    <p className='text-white/90 text-sm mb-4'>
                        <span>12th November 2023</span>
                        <span className='mx-2'>
                            <FiberManualRecord 
                            sx={{
                                fontSize: '0.5rem',
                            }}/>
                        </span>
                        <span>8:00 PM Onwards</span>
                    </p>
                    <div className='flex flex-row items-center justify-end gap-2 mt-6'>
                        <FavoriteButton isInWatchList={false} onClick={()=>{}} />
                        <Buttons onClick={()=>{}}>Rent</Buttons>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EventCardReel;