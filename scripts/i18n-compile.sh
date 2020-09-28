#!/bin/bash
langs=( 'en' 'fr' 'ar' )

if [ "${1:-}" = 'default' ]; then
    langs=( 'en' )
fi

for lang in "${langs[@]}"; do
    src="src/src-lang/$lang.json"
    dest="src/lang/$lang.json"

    if [ ! -f "$src" ]; then
        echo "[warn] src file not found ($src)"
    else
	    npm run i18n:formatjs:compile -- "$src" --ast --out-file "$dest"
    fi
done

