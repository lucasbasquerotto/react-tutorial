#!/bin/bash
set -eou pipefail

/docker/bin/docker-compose up -d react-dynamic

/docker/bin/docker-compose exec -T --user=node react-dynamic /bin/bash <<-SHELL
    set -eou pipefail
    npm run i18n:extract
    mv /usr/app/src/src-lang/en.json /usr/app/lang/en.json
SHELL

# /docker/bin/docker-compose build i18n
# /docker/bin/docker-compose rm --stop --force i18n
/docker/bin/docker-compose up -d i18n
# /docker/bin/docker-compose exec --user=node i18n /bin/bash

echo "make the translations at http://localhost:8080/mady"