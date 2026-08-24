curl -s -X POST https://api.render.com/v1/services \
  -H "Authorization: Bearer rnd_mNDamI2ECkn2dHNTmnRZKnfgWb7u" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "omniroute-proxy",
    "ownerId": "tea-d25i5rre5dus73a4lv40",
    "repo": "https://github.com/kumaryush18-cyber/omniroute-render-proxy",
    "autoDeploy": "yes",
    "branch": "main",
    "type": "web_service",
    "serviceDetails": {
      "env": "docker",
      "plan": "free",
      "region": "singapore",
      "envSpecificDetails": {
        "dockerContext": ".",
        "dockerfilePath": "./Dockerfile"
      }
    }
  }'
