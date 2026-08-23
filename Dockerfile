FROM node:20-alpine

# Install Python and build tools for native SQLite bindings
RUN apk add --no-cache python3 make g++ gcc sqlite-dev

# Set an environment variable so OmniRoute knows where to store data
ENV DATA_DIR="/data"
RUN mkdir -p /data && chown -R node:node /data || true

WORKDIR /app

# Copy everything before npm install, so postinstall scripts have all the source code
COPY . .

# Use npm to install dependencies (using legacy-peer-deps due to marked-terminal/react conflicts)
# This will run the postinstall script successfully, and compile better-sqlite3 native bindings
RUN npm install --legacy-peer-deps

# Build the Next.js and API backend
RUN NODE_OPTIONS=--max-old-space-size=4096 npm run build

# Use the default node user
USER node

EXPOSE $PORT

# Set a secure default password so we aren't locked out of remote access
ENV INITIAL_PASSWORD="changeme123"

# Run OmniRoute (they use 'npm start' to run the built Next.js server)
CMD ["sh", "-c", "npm start -- -p ${PORT:-10000} -H 0.0.0.0"]
