import { SessionProvider } from 'next-auth/react';
import Script from "next/script";   
import type { AppProps } from 'next/app'

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
      <Script 
        id="jw-player"
        strategy="beforeInteractive"
        src="https://cdn.jwplayer.com/libraries/kLxY4wBD.js" />
      <SessionProvider session={session}>
          <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}
