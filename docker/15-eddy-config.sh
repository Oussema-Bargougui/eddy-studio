#!/bin/sh
# Runs at container start, before nginx fills its config template.
# Checks EDUCAP_ORIGINS and writes the runtime config the app reads (/config.js).
set -eu

ORIGINS="${EDUCAP_ORIGINS:-}"

if [ -z "$ORIGINS" ]; then
  echo "eddy-config: EDUCAP_ORIGINS is empty; Eddy Studio will not accept any EduCap session" >&2
fi

# Origins only: letters, digits and : / . - _ , and spaces. Anything else is
# refused, so nothing can be injected into the page script or the CSP header.
case "$ORIGINS" in
  *[!A-Za-z0-9:/._,\ -]*)
    echo "eddy-config: EDUCAP_ORIGINS contains unexpected characters: $ORIGINS" >&2
    exit 1
    ;;
esac

printf 'window.__EDDY_CONFIG__ = { educapOrigins: "%s" }\n' "$ORIGINS" > /usr/share/nginx/html/config.js
echo "eddy-config: EduCap origins allowed to embed Eddy Studio: ${ORIGINS:-none}"
