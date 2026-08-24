FROM node:20-bookworm-slim

# Install Python and build tools for native SQLite bindings
RUN apt-get update && apt-get install -y python3 make g++ gcc libsqlite3-dev && rm -rf /var/lib/apt/lists/*

# Set an environment variable so OmniRoute knows where to store data
ENV DATA_DIR="/data"
RUN mkdir -p /data && chown -R node:node /data || true

WORKDIR /app

# Downgrade npm to v10 because npm v11 blocks native install scripts by default
RUN npm install -g npm@10

# Copy everything before npm install, so postinstall scripts have all the source code
COPY . .

# Approve scripts for better-sqlite3 since it's an optional dependency that needs to build native bindings
RUN npm approve-scripts better-sqlite3 || true

# Use npm to install dependencies (using legacy-peer-deps due to marked-terminal/react conflicts)
# This will run the postinstall script successfully, and compile better-sqlite3 native bindings
RUN npm install --legacy-peer-deps --foreground-scripts

# Clear any local or cached .next directory to prevent poisoned cache from segfaulting Webpack
RUN rm -rf .next/cache

# Build the Next.js and API backend (using Webpack instead of Turbopack to avoid native dependency resolution bugs with better-sqlite3)
RUN NEXT_TELEMETRY_DISABLED=1 OMNIROUTE_USE_TURBOPACK=0 OMNIROUTE_BUILD_MEMORY_MB=12288 NODE_OPTIONS="--max-old-space-size=12288 --no-warnings" NEXT_PRIVATE_STANDALONE=1 NEXT_PRIVATE_BUILD_WORKER=1 npm run build:backend

# Use the default node user
USER node

EXPOSE $PORT

# Set a secure default password so we aren't locked out of remote access
ENV INITIAL_PASSWORD="changeme123"

# Run OmniRoute (they use 'npm start' to run the built Next.js server)
CMD ["sh", "-c", "npm start -- -p ${PORT:-10000} -H 0.0.0.0"]
