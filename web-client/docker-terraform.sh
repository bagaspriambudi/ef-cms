#!/bin/bash -e
ENV=$1
docker build -t web-client-build -f ../Dockerfile.build ..
docker run -e "EFCMS_DOMAIN=${EFCMS_DOMAIN}" --rm web-client-build /bin/sh -c "cd web-client/terraform/main && ../bin/deploy-app.sh ${ENV}"