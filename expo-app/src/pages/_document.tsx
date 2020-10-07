/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// @generated: @expo/next-adapter@2.1.39
// eslint-disable-next-line import/no-extraneous-dependencies
import Document from '@expo/next-adapter/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { createMyTheme } from '../material/theme';

export default class MyDocument extends Document {
	private readonly theme = createMyTheme(false);

	render() {
		return (
			<Html lang="en">
				<Head>
					{/* PWA primary color */}
					<meta
						name="theme-color"
						content={this.theme?.palette?.primary?.main}
					/>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
	// Resolution order
	//
	// On the server:
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. document.getInitialProps
	// 4. app.render
	// 5. page.render
	// 6. document.render
	//
	// On the server with error:
	// 1. document.getInitialProps
	// 2. app.render
	// 3. page.render
	// 4. document.render
	//
	// On the client
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. app.render
	// 4. page.render

	// Render app and page and get the context of the page with collected side effects.
	const sheets = new ServerStyleSheets();
	const originalRenderPage = ctx.renderPage;

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App: any) => (props: any) =>
				sheets.collect(<App {...props} />),
		});

	const initialProps = await Document.getInitialProps(ctx);
	const { styles } = initialProps;

	return {
		...initialProps,
		// Styles fragment is rendered after the app and page rendering finish.
		styles: [...React.Children.toArray(styles), sheets.getStyleElement()],
	};
};
