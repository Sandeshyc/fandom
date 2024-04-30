import Head from "next/head";
import Script from "next/script";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import ErrorBoundary from "@/modules/elements/ErrorBoundary";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

import "../styles/globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {

  const client = new ApolloClient({
    // uri: "http://localhost:4000/graphql",
    uri: process.env.NEXT_PUBLIC_CONSUMER_SERVICE_API,
    cache: new InMemoryCache(),
  });
  
  return (
    <>
      <Head>
        <title>iWantTFC Tickets</title>
        <meta name="description" content="iWantTFC Tickets" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex" />
        
      </Head>
      <Script
        id="jw-player"
        strategy="beforeInteractive"
        src="https://cdn.jwplayer.com/libraries/kLxY4wBD.js"
      />
      <main className={poppins.className}>

        <ErrorBoundary>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </ErrorBoundary>
      </main>
    </>
  );
}
