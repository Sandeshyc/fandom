import Head from "next/head";
import Script from "next/script";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import ErrorBoundary from "@/modules/elements/ErrorBoundary";
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
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.error(`[Network error]: ${networkError}`);
  });
  
  const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_CONSUMER_SERVICE_API })

  const retryLink = new RetryLink({
    delay: {
      initial: 300,
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
    link: from([errorLink, httpLink, retryLink]),
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
