import Head from "next/head";
import Script from "next/script";
import type { AppProps } from "next/app";
import { Roboto } from "@next/font/google";
import ErrorBoundary from "@/modules/elements/ErrorBoundary";
import axios from "axios";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";

import "../styles/globals.css";
import "swiper/css";
import "swiper/css/bundle";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      const errors = [];
      const userInfo = window.localStorage.getItem("userInfo");
      let userId = "";
      if (userInfo) {
        const userInfoObj = JSON.parse(userInfo);
        if (userInfoObj.sub) {
          userId = userInfoObj.sub;
        }
      }
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
          errors.push({ type: "gqlError", message, locations, path });
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
        });
      }
      if (networkError) {
        errors.push({ type: "network", message: networkError });
        console.error(`[Network error]: ${networkError}`);
        // return forward(operation)
      }
      if (process.env.NEXT_PUBLIC_ENV !== "DEV") {
        try {
          axios.post(`${process.env.NEXT_PUBLIC_DATA_API}/logevent`, {
            date: new Date(),
            userId,
            errors,
            operation,
            operationStr: JSON.stringify(operation),
          });
        } catch (e) {
          console.log(e);
        }
      }
      if (networkError) {
        console.log("RETRY :::::: ");
        return forward(operation);
      }
    }
  );

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_CONSUMER_SERVICE_API,
  });

  const retryLink = new RetryLink({
    delay: {
      initial: 500,
      max: Infinity,
      jitter: true,
    },
    attempts: {
      max: 1,
      retryIf: (error, _operation) => !!error,
    },
  });

  const client = new ApolloClient({
    // uri: "http://localhost:4000/graphql",
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
    },
  });

  return (
    <>
      <Head>
        <title>BINI</title>
        <meta name="description" content="iWantTFC Tickets" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex" />
      </Head>
      <main className={roboto.className}>
        <ErrorBoundary>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </ErrorBoundary>
      </main>
    </>
  );
}
