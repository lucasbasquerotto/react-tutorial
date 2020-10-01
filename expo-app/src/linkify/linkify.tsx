import React from 'react';
import Linkify from 'react-linkify';

const CustomLink = (
	decoratedHref: string,
	decoratedText: string,
	key: number,
) => (
	<a href={decoratedHref} key={key} style={{ color: '#795' }}>
		{decoratedText}
	</a>
);

export const LinkifyApp = () => (
	<React.Fragment>
		<Linkify>
			See source code at https://github.com/tasti/react-linkify/.
		</Linkify>
		<br />
		<Linkify>
			<div>
				react-linkify
				<span>(https://github.com/tasti/react-linkify/)</span>
			</div>
			<div>
				React component to parse links (urls, emails, etc.) in text into
				clickable links
			</div>
			See source code at https://github.com/tasti/react-linkify/.
			<footer>Contact: tasti@zakarie.com</footer>
		</Linkify>
		<br />
		<Linkify>
			See source code at{' '}
			<a href="https://github.com/tasti/react-linkify/">
				https://github.com/tasti/react-linkify/example
			</a>
			.
		</Linkify>
		<br />
		<Linkify componentDecorator={CustomLink}>
			See source code at https://github.com/tasti/react-linkify/.
		</Linkify>

		{/* <Linkify
			properties={{
				target: '_blank',
				style: { color: 'red', fontWeight: 'bold' },
			}}>
			See source code at https://github.com/tasti/react-linkify/.
		</Linkify>

		<Linkify
			component="button"
			properties={{
				onClick: function onClick() {
					alert('Success!');
				},
			}}>
			See source code at https://github.com/tasti/react-linkify/.
		</Linkify> */}
	</React.Fragment>
);
