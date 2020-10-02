const namingOptions = [
	{
		selector: 'default',
		format: ['camelCase'],
		leadingUnderscore: 'allow',
		trailingUnderscore: 'allow',
	},
	{
		selector: 'variable',
		format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
		leadingUnderscore: 'allow',
		trailingUnderscore: 'allow',
	},
	{
		selector: 'typeLike',
		format: ['PascalCase'],
	},
	{
		selector: 'function',
		format: ['camelCase', 'PascalCase'],
	},
	{
		selector: 'property',
		format: ['camelCase', 'UPPER_CASE'],
	},
	{
		selector: 'parameter',
		format: ['camelCase', 'PascalCase'],
		leadingUnderscore: 'allow',
	},
];

module.exports = {
	root: true,
	extends: ['react-app', 'eslint:recommended', 'plugin:react/recommended'],
	plugins: ['prettier', 'formatjs'],
	env: {
		browser: true,
		node: true,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		'@typescript-eslint/array-type': 1,
		'@typescript-eslint/ban-types': 1,
		'@typescript-eslint/class-literal-property-style': 1,
		'@typescript-eslint/consistent-type-assertions': 1,
		'@typescript-eslint/consistent-type-definitions': 1,
		'@typescript-eslint/consistent-type-imports': 1,
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/explicit-member-accessibility': 1,
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'@typescript-eslint/member-delimiter-style': 1,
		'@typescript-eslint/member-ordering': 1,
		'@typescript-eslint/method-signature-style': 1,
		'@typescript-eslint/naming-convention': [1, ...namingOptions],
		'@typescript-eslint/no-confusing-non-null-assertion': 1,
		'@typescript-eslint/no-dynamic-delete': 1,
		'@typescript-eslint/no-empty-interface': 1,
		'@typescript-eslint/no-explicit-any': 1,
		'@typescript-eslint/no-extra-non-null-assertion': 1,
		'import/order': 0,
		'react/prop-types': 0,
		'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
		'react/display-name': 0,
		'prettier/prettier': 'error',
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
