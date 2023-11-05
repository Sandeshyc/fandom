import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Script from "next/script";   
import type { AppProps } from 'next/app';

import '../styles/globals.css';

export default function App({ 
  Component, 
  pageProps: {
    session,
    ...pageProps
  }
}: AppProps) {
  return (
    <>
      <Head>
        <title>iWantTFC Tickets</title>
        <meta name="description" content="iWantTFC Tickets" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Script 
        id="jw-player"
        strategy="beforeInteractive"
        src="https://cdn.jwplayer.com/libraries/kLxY4wBD.js" />

      {/* <SessionProvider session={session}> */}
          <Component {...pageProps} />
      {/* </SessionProvider> */}
    </>
  )
}
