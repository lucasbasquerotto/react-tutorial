/* eslint-disable no-alert */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Hyperlink from 'react-native-hyperlink';

const DefaultLink = () => (
	<Hyperlink linkDefault={true}>
		<Text css={{ fontSize: 15 }}>
			This text will be parsed to check for clickable strings like
			https://github.com/obipawan/hyperlink and made clickable.
		</Text>
	</Hyperlink>
);

const RegularText = () => (
	<Hyperlink onPress={(url, text) => alert(url + ', ' + text)}>
		<Text css={{ fontSize: 15 }}>
			This text will be parsed to check for clickable strings like
			https://github.com/obipawan/hyperlink and made clickable.
		</Text>
	</Hyperlink>
);

const RegularTextLongPress = () => (
	<Hyperlink onLongPress={(url, text) => alert(url + ', ' + text)}>
		<Text css={{ fontSize: 15 }}>
			This text will be parsed to check for clickable strings like
			https://github.com/obipawan/hyperlink and made clickable for long click.
		</Text>
	</Hyperlink>
);

const NestedText = () => (
	<Hyperlink onPress={(url, text) => alert(url + ', ' + text)}>
		<View>
			<Text css={{ fontSize: 15 }}>
				A nested Text component
				https://facebook.github.io/react-native/docs/text.html works equally
				well <Text>with https://github.com/obipawan/hyperlink</Text>
			</Text>
		</View>
	</Hyperlink>
);

const styles: any = StyleSheet.create({
	link: {
		color: '#2980b9',
		fontSize: 20,
	},
});

const HighlightText = () => (
	<Hyperlink linkStyle={styles.link}>
		<Text css={{ fontSize: 15 }}>
			Make clickable strings like https://github.com/obipawan/hyperlink stylable
		</Text>
	</Hyperlink>
);

const ParseAndReplace = () => (
	<Hyperlink
		linkStyle={styles.link}
		linkText={(url) =>
			url === 'https://github.com/obipawan/hyperlink' ? 'Hyperlink' : url
		}>
		<Text css={{ fontSize: 15 }}>
			Make clickable strings cleaner with https://github.com/obipawan/hyperlink
		</Text>
	</Hyperlink>
);

export const LinkifyApp = () => (
	<React.Fragment>
		<DefaultLink />
		<RegularText />
		<RegularTextLongPress />
		<NestedText />
		<HighlightText />
		<ParseAndReplace />
	</React.Fragment>
);
