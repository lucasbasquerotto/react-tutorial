#!/bin/bash
set -eou pipefail

default_lang='en'
langs=( "$default_lang" )

if [ "${1:-}" != 'default' ]; then
    langs+=( 'fr' 'ar' )
fi

for lang in "${langs[@]}"; do
    dest="src/lang/$lang.json"

    if [ "$lang" = "$default_lang" ]; then
        echo "{}" > "$dest"
    else
        src="locales/lang/$lang.json"

        if [ ! -f "$src" ]; then
            echo "[warn] src file not found ($src)"
        else
            cp "$src" "$dest"
            # npm run i18n:formatjs:compile -- "$src" --ast --out-file "$dest"
        fi
    fi
done

