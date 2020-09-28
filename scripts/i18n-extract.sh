#!/bin/bash
lang='en'

npm run i18n:formatjs:extract \
	-- 'src/**/*.ts*' --ignore 'src/**/*.d.ts*' \
	--out-file src/src-lang/"$lang".json \
	--id-interpolation-pattern '[sha512:contenthash:base64:6]'
