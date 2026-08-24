#!/bin/bash
curl -s -X POST https://api.render.com/v1/services \
  -H "Authorization: Bearer rnd_mNDamI2ECkn2dHNTmnRZKnfgWb7u" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "omniroute-proxy-ghcr",
    "ownerId": "tea-d25i5rre5dus73a4lv40",
    "type": "web_service",
    "env": "image",
    "image": {
      "imagePath": "ghcr.io/kumaryush18-cyber/omniroute-render-proxy:main",
      "ownerId": "tea-d25i5rre5dus73a4lv40",
      "registryCredentialId": "rgc-da5ir0mk1f9s738pink0"
    },
    "serviceDetails": {
      "env": "image",
      "plan": "free",
      "region": "singapore"
    }
  }'
