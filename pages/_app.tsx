import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Robo House</title>
      </Head>

      {process.env.NODE_ENV === "production" && (
        <GoogleAnalytics trackPageViews />
      )}
      <Component {...pageProps} />
    </>
  );
}
