module.exports = {
	root: true,
	extends: ['react-app'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint/eslint-plugin'],
	rules: {
		quotes: 0,
		'react/style-prop-object': ['error', { allow: ['StatusBar'] }],
	},
};
