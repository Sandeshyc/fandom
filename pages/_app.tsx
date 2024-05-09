import Head from "next/head";
import Script from "next/script";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import ErrorBoundary from "@/modules/elements/ErrorBoundary";
import axios from 'axios';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";

import "../styles/globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    const errors = []
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        errors.push({type: 'gqlError', message, locations, path});
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      });
    }
    if (networkError) {
      errors.push({type: 'network', message: networkError});
      console.error(`[Network error]: ${networkError}`);
    }
    console.log(`${process.env.NEXT_PUBLIC_DATA_API}/logevent`)
    const userInfo = window.localStorage.getItem("userInfo");
    let userId = ""
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if (userInfoObj.sub) {
        userId = userInfoObj.sub;
      }
    }
    try {
      axios.post(`${process.env.NEXT_PUBLIC_DATA_API}/logevent`, {dste: new Date(), userId, errors})
    } catch (e) {
      console.log(e)
    }
  });
  
  const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_CONSUMER_SERVICE_API })

  const retryLink = new RetryLink({
    delay: {
      initial: 500,
      max: Infinity,
      jitter: true
    },
    attempts: {
      max: 1,
      retryIf: (error, _operation) => !!error
    }
  });

  const client = new ApolloClient({
    // uri: "http://localhost:4000/graphql",
    link: from([errorLink, retryLink, httpLink]),
    cache: new InMemoryCache()
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
