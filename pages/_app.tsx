import Head from "next/head";
import Script from "next/script";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import ErrorBoundary from "@/modules/elements/ErrorBoundary";

import "../styles/globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>iWantTFC Tickets</title>
        <meta name="description" content="iWantTFC Tickets" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Script
        id="jw-player"
        strategy="beforeInteractive"
        src="https://cdn.jwplayer.com/libraries/kLxY4wBD.js"
      />
      <main className={poppins.className}>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </main>
    </>
  );
}