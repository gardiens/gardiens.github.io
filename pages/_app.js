import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';


import '../global.css';

import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pierrick de Bournez</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Analytics />
      <SpeedInsights />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
