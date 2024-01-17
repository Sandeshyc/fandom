import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Info } from '@mui/icons-material';
import Footer from '@/components/Footer';
import NavigationHome from '@/modules/elements/NavigationHome';
const bgImage = 'url("/images/new-bg.png")';
const Home = (props:any) => {
  return (
    <>
      <NavigationHome />
      <div className="pt-20 lg:pt-28 min-h-[85vh]"
      style={{
        backgroundImage: bgImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto', 
        backgroundPosition: 'right '+ 30 + '%',
      }}>

      </div>
      <Footer />
    </>
  )
}

export default Home;