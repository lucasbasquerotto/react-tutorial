module.exports = {
	root: true,
	extends: ['react-app'],
	//extends: ['react-app', '@react-native-community'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint/eslint-plugin', 'formatjs'],
	rules: {
		quotes: 0,
		'no-undef': 0,
		'formatjs/no-offset': 'error',
		'formatjs/enforce-description': ['error', 'literal'],
		'formatjs/enforce-default-message': ['error', 'literal'],
		'formatjs/enforce-placeholders': 'error',
		'formatjs/no-multiple-whitespaces': 'error',
		'formatjs/enforce-plural-rules': [
			2,
			{
				one: true,
				other: true,
				zero: false,
			},
		],
	},
};
