import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/qic3qrv.css" />
      </Head>
      <body className="bg-stone-50 text-neutral-700 tracking-wide text-sm leading-6">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
