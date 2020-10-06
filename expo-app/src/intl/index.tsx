/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-curly-brace-presence */
import type { Theme } from '@material-ui/core';
import {
	createStyles,
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
} from '@material-ui/core';
import type { FunctionComponent } from 'react';
import React, { useState } from 'react';
import {
	FormattedDate,
	FormattedMessage,
	FormattedNumber,
	FormattedTime,
	IntlProvider,
} from 'react-intl';
import { IntlAuxApp } from './intl';
import logo from './logo.svg';

// const createUserMessage = (userName: string) => intl.formatMessage(
//    {
//        description: 'A message',
//        defaultMessage: 'My name is {name}',
//    },
//    {
//        name: userName,
//    }
// );

// const message = defineMessage({
//    description: 'message',
//    defaultMessage: 'Welcome {username}',
// });

// const formattedMessage = intl.formatMessage(message, {username: 'Shanika'});

const App: FunctionComponent<{ date: number }> = ({ date }) => (
	<div className="App">
		<header className="App-header">
			<img src={logo as string} className="App-logo" alt="logo" />
			<p>
				<FormattedMessage
					id="app.header"
					defaultMessage="Edit <code>{fileName}</code> js and save to reload"
					description="app.header"
					values={{
						fileName: 'src/App.js',
						// eslint-disable-next-line react/display-name
						code: (word: string) => <code>{word}</code>,
					}}
				/>
			</p>
			<a
				className="App-link"
				href="https://reactjs.org"
				target="_blank"
				rel="noopener noreferrer"
			>
				<FormattedMessage
					id="app.content"
					defaultMessage="Learn React"
					description="app.content"
				/>
			</a>
			<FormattedMessage
				id="app.channel.plug"
				defaultMessage="Tutorial brought to you by {blogName}"
				description="app.channel.plug"
				values={{ blogName: 'My Demo' }}
			/>
			<br />
			<FormattedMessage
				id="app.channel.plug2"
				defaultMessage="Tutorial2 brought to you by {blogName}"
				description="app.channel.plug2"
				values={{ blogName: 'My Demo2' }}
			/>
			<br />
			<FormattedDate
				value={date}
				year="numeric"
				month="long"
				day="numeric"
				weekday="long"
			/>
			<br />
			<FormattedNumber
				value={20.42}
				style={`currency`}
				currencyDisplay="symbol"
				currency="USD"
			/>
			<br />
			<FormattedNumber value={10000} />
			<br />
			<FormattedMessage
				id="app.plural"
				description="app.plural"
				defaultMessage="{amount, plural, =0 {no languages} one {one language (#)} few {several languages (#)} many {lots of languages (#)} other {# languages}}"
				values={{ amount: 3 }}
			/>
			<br />
			<FormattedTime
				value={new Date()}
				hour="numeric"
				minute="numeric"
				second="numeric"
				timeZoneName="long"
			/>
		</header>
	</div>
);

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
	}),
);

const SelectLang = ({
	locale,
	setLocale,
}: {
	locale: string;
	setLocale: (_: string) => unknown;
}) => {
	const classes = useStyles();

	return (
		<FormControl variant="outlined" className={classes.formControl}>
			<InputLabel id="demo-simple-select-outlined-label">Language</InputLabel>
			<Select
				labelId="demo-simple-select-outlined-label"
				id="demo-simple-select-outlined"
				value={locale}
				onChange={(e) => setLocale(e.target.value as string)}
				label="Language"
			>
				<MenuItem value="en">English (en)</MenuItem>
				<MenuItem value="fr">French (fr)</MenuItem>
				<MenuItem value="ar">Arabic (ar)</MenuItem>
			</Select>
		</FormControl>
	);
};

export const IntlApp = () => {
	const fallbackLocale = 'en';
	const defaultLocale =
		typeof window !== 'undefined' ? window?.navigator?.language : null;
	const supportedLocale = new Set(['en', 'fr', 'ar']).has('defaultLocale');
	const [locale, setLocale] = useState(
		(supportedLocale ? defaultLocale : null) ?? fallbackLocale,
	);
	const [localeData, setLocaleData] = useState<{
		currentLocale: string;
		messages: Record<string, string>;
	}>({ currentLocale: locale, messages: {} });

	React.useEffect(() => {
		async function fetchData() {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const response: Record<string, string> = await import(
				`./lang/${locale}.json`
			).catch(async (e) => {
				if (locale !== fallbackLocale) {
					return import(`./lang/${fallbackLocale}.json`);
				}

				throw e;
			});
			setLocaleData({ currentLocale: locale, messages: response });
		}
		void fetchData();
	}, [locale]);

	if (!localeData?.messages) {
		return <span> loading... </span>;
	}

	return (
		<IntlProvider
			defaultLocale={fallbackLocale}
			locale={localeData?.currentLocale}
			messages={localeData?.messages}
		>
			<App date={Date.now()} />
			<SelectLang {...{ locale, setLocale }} />
			<IntlAuxApp />
		</IntlProvider>
	);
};
