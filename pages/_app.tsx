import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Script from "next/script";   
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import ErrorBoundary from '@/modules/elements/ErrorBoundary';
import useWishListStore from '@/hooks/useWishListStore';

import '../styles/globals.css';
import { use, useEffect } from 'react';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
});


export default function App({ 
  Component, 
  pageProps: {
    session,
    ...pageProps
  }
}: AppProps) {
  
  // const {list, get_list} = useWishListStore();
  
  // useEffect(() => {
  //   get_list();
  // }, []);



  return (
    <>
      <Head>
        <title>iWantTFC Tickets</title>
        <meta name="description" content="iWantTFC Tickets" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        {/* <link rel="icon" href="/favicon.ico" /> */}

        {/* <Script>
          window.onbeforeunload = function() { return "sorry, Your some work will be lost - really sorry."; };
        </Script> */}
      </Head>

      <Script 
        id="jw-player"
        strategy="beforeInteractive"
        src="https://cdn.jwplayer.com/libraries/kLxY4wBD.js" />

      {/* <SessionProvider session={session}> */}
          <main className={poppins.className}>
            <ErrorBoundary>
            <Component {...pageProps} />
            </ErrorBoundary>
          </main>
      {/* </SessionProvider> */}
    </>
  )
}
