import { transform } from '@formatjs/ts-transformer';

module.exports = {
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							getCustomTransformers: {
								before: [
									transform({
										overrideIdFn: '[sha512:contenthash:base64:6]',
										ast: true,
									}),
								],
							},
						},
					},
				],
			},
		],
	},
};
