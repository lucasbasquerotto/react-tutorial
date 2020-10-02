module.exports = {
	root: true,
	extends: ['universe', 'eslint:recommended', 'plugin:react/recommended'],
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
		'import/order': 0,
		'react/prop-types': 0,
		'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
		'react/display-name': 0,
	},
};
