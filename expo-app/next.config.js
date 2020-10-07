// @generated: @expo/next-adapter@2.1.39
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const { withExpo } = require('@expo/next-adapter');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = withExpo(
	withImages(
		withCSS({
			projectRoot: __dirname,
		}),
	),
);
