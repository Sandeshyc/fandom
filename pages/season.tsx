import React, {useEffect, useState} from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import NavigationHome from '@/modules/elements/NavigationHome';
import Footer from '@/components/Footer';

export async function getServerSideProps(context: NextPageContext) {
  const region = context.query.region || ""
  const session = await getSession(context);
  const product = context.query.product || "web" 
  return {
    props: {region}
  }
}

const bgImage = 'url("/images/new-bg.png")';

const Movies = (props:any) => {
  const router = useRouter();
  const { region, product } =  props;
  const [isReady, setIsReady] = React.useState(false);
  const [userIdToken, setUserIdToken] = React.useState('');

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');    
    // console.log('userInfo: ', userInfo);
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserIdToken(userInfoObj.sub);
      }else{
        router.push('/auth');
      }
    }else{
      router.push('/auth');
    }
    setIsReady(true);
  }, []);

  return (<>
  <NavigationHome />
    <div
    className='pt-20 lg:pt-28 min-h-[85vh] min-w-full text-white'
    style={{
      backgroundImage: bgImage,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% auto',
      backgroundPosition: 'right '+ 30 + '%',
    }}>
    
    </div>
    <Footer />
    </>) 
}

export default Movies;
