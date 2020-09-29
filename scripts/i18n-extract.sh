#!/bin/bash
set -eou pipefail

lang='en'

npm run i18n:formatjs:extract \
	-- 'src/**/*.ts*' --ignore 'src/**/*.d.ts*' \
	--out-file locales/default/"$lang".json \
	--id-interpolation-pattern '[sha512:contenthash:base64:6]' \
    --format scripts/i18n-extract-formatter.js
