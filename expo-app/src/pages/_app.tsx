/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import 'resize-observer-polyfill';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
// eslint-disable-next-line spaced-comment
import type { AppProps /*, AppContext */ } from 'next/app';
import React from 'react';
import '../index.css';
import '../reduxEssentials/App.css';

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
	// eslint-disable-next-line react/react-in-jsx-scope
	// eslint-disable-next-line react/jsx-props-no-spreading
	return <Component {...pageProps} />;
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
