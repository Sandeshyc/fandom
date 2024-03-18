import React from 'react';
import Navigation from "@/modules/components/Navigation";
import Header from '@/modules/elements/Header';
import Footer from '@/components/Footer';
import BottomNavigation from '@/modules/elements/Navigation/BottomNavigation';
import ReadMoreDescription from '@/modules/Identities/ReadMoreDescription';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import ScrollSpyComponent from '@/modules/elements/ScrollSpyComponent';
import useIsMobile from '@/hooks/useIsMobile';

const bgImage = 'url("/images/new-bg.png")';

const Seasons = () => {
  const [season, setSeason] = React.useState('Season 14');
  const isMobile = useIsMobile();

  return (<>
      {isMobile?<Header/>:<Navigation/>}
      <div
      className='min-h-[85vh] min-w-full text-white'
      style={{
        backgroundImage: bgImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'right '+ 30 + '%',
      }}>
        <div className="relative z-0 mb-[-140px] md:mb-[-200px]">
          <div className="shadow-md rounded-t-lg jk_player h-[350px] md:h-[75vh] max-h-[100%] min-h-[400px] md:min-h-[700px]"  style={{backgroundImage: `url(https://images2.vudu.com/background/3031193-1920a.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center top'}}>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-full z-10 bg-black/70"/>    
        </div>
        <div className='text-white z-10 relative mt-[-200px] md:mt-[-300px] bg-gradient-to-t from-black from-80% to-transparent to-100%'>
          <div className='container mx-auto px-4'>
            <div className='flex flex-wrap items-end pb-8'>
              <div className='w-full lg:w-2/3 mb-4 lg:mb-0'>
                <div className="flex flex-wrap items-end w-full">
                  <div className='w-[100px] sm:w-[120px] mr-2'>
                    <img src="https://images2.vudu.com/poster2/3031193-108" alt="ABS-CBN Logo" className='w-full' />
                  </div>
                  <div className='grow w-[100px] '>
                    <h1 className='text-xl sm:text-2xl md:text-4xl h-full mb-2 lg:mb-3'>Survivor: {season}</h1>
                    <p className='mb-1 flex items-center flex-wrap my-2 text-white/70 text-xs'>
                      <span className="border-gray-500 border px-1 mr-1 mb-1 rounded-sm">HDX</span>
                      <span className="border-gray-500 border px-1 mr-1 mb-1 rounded-sm">TV-PG</span>
                      <span className="border-gray-500 border px-1 mr-1 mb-1 rounded-sm">13+</span>
                      <span className='mb-1'>38 Seasons</span>
                    </p>
                  </div>
                </div>
                <div className='w-full mt-8 flex flex-wrap'>
                  <div 
                    className="border border-blue-600 rounded-md bg-[url(/images/arrow_drop_down_white.svg)] bg-no-repeat bg-right bg-[length:25px_20px] w-[160px] mb-2 mr-4">
                    <select 
                    defaultValue={season}
                    onChange={(e) => setSeason(e.target.value)}
                    className="h-[44px] w-full bg-transparent text-white/70 rounded-md px-2 sm:px-4 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent appearance-none outline-none pr-[20px]">
                      {[...Array(19)].map((_, i) => {
                        return <option key={i} value={`Season ${i+1}`}>Season {i+1}</option>

                      }
                      )}
                    </select>
                  </div>
                  <div className='bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-md px-2 sm:px-4 w-[160px] lg:w-[220px] text-sm flex flex-row justify-center items-center transition active:opacity-65 h-[44px] cursor-pointer mb-2 mr-4'>
                    <span>Rent</span>
                  </div>
                  <div className='h-[44px] border border-blue-600 rounded-md w-[160px] mb-2 mr-4 flex items-center justify-center text-sm text-white/80 cursor-pointer hover:text-white'>
                    <AddCircleOutlineOutlined 
                      sx={{fontSize: '20px', marginRight: '5px'}}
                    />
                    <span>Add to List</span>
                  </div>
                </div>
              </div>
              <div className='w-full lg:w-1/3 text-sm text-white/80'>
                <div className='asFooterMenuWrap flex flex-wrap mb-2'>
                  <div className='text-sm mr-4 whitespace-nowrap '>Action</div>
                  <div className='text-sm mr-4 whitespace-nowrap '>Adventure</div>
                  <div className='text-sm mr-4 whitespace-nowrap '>2024</div>
                </div>
                <ReadMoreDescription                
                  text='The individuals competing on the 46th season are fans from diverse backgrounds and bring fresh perspectives to this new era of the game, with the same ultimate goal: to outwit, outplay and outlast each other. The cast includes a neurosurgeon, a military veteran, a rancher and a flight attendant, among others. The show is hosted by Jeff Probst.'
                />
              </div>
            </div>
            <ScrollSpyComponent />
          </div>
        </div>
      </div>
      {isMobile?<BottomNavigation/>:<Footer/>}
    </>) 
}

export default Seasons;