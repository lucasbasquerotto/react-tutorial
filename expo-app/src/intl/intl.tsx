import React, { FunctionComponent } from 'react';
import { FormattedRelativeTime, IntlShape, useIntl } from 'react-intl';

function foo(intl: IntlShape) {
	return intl.formatMessage(
		{
			id: 'foo',
			defaultMessage: 'foo {test}',
			description: 'bar',
		},
		{ test: 123 },
	);
}

const Translation: FunctionComponent<{}> = () => {
	const intl = useIntl();
	const msg1 = intl.formatMessage(
		{
			id: 'myMessage',
			description: 'myMessage',
			defaultMessage: 'Today is {ts, date, ::yyyyMMdd}',
		},
		{ ts: Date.now() },
	);

	const currency = intl.formatNumber(19, {
		style: 'currency',
		currency: 'EUR',
	});
	return (
		<>
			<div>Message: {msg1}</div>
			<div>Currency: {currency}</div>
			<div>foo: {foo(intl)}</div>
		</>
	);
};

const MS_IN_DAY = 1e3 * 3600 * 24;

const PostDate = ({ date }: { date: number }) => {
	const intl = useIntl();
	return (
		<span title={intl.formatDate(date)}>
			<FormattedRelativeTime
				value={(Date.now() - date) / MS_IN_DAY}
				unit="day"
			/>
		</span>
	);
};

interface Post {
	title: string;
	date: number;
	body: string;
}

const App = ({ post }: { post: Post }) => (
	<div>
		<h1>{post.title}</h1>
		<p>
			<PostDate date={post.date} />
		</p>
		<div>{post.body}</div>
		<Translation />
	</div>
);

export const IntlAuxApp = () => (
	<App
		post={{
			title: 'Hello, World!',
			date: new Date(1459913574887).getTime(),
			body: 'Amazing content.',
		}}
	/>
);
