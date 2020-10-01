#!/bin/bash
set -eou pipefail

. locales/langs.src.sh

for lang in "${langs[@]}"; do
    dest="src/lang/$lang.json"

    if [ "$lang" = "$default_lang" ]; then
        echo "{}" > "$dest"
    else
        src="locales/lang/$lang.json"

        if [ ! -f "$src" ]; then
            echo "[warn] src file not found ($src)"
        else
            npm run i18n:formatjs:compile -- "$src" --ast \
                --format='./scripts/i18n-compile-formatter.js' \
                --out-file "$dest"
        fi
    fi
done
