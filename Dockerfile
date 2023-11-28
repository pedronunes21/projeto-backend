# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
#ARG NODE_VERSION=18.17.1
FROM node:18-slim as base

LABEL fly_launch_runtime="NestJS/Prisma"

# NestJS/Prisma app lives here
WORKDIR /app

# Set production environment
#ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential openssl pkg-config python-is-python3

# Install node modules
COPY --link package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY --link . .

# Build application
RUN npm run build

# Final stage for app image
FROM base

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built application
COPY --from=build /app /app

#ENV DATABASE_URL="postgresql://pedronunes21:7rw3puZWOVDL@ep-divine-butterfly-72528693.us-east-2.aws.neon.tech/pumpi"
ENV DATABASE_URL "postgresql://postgres:AbeaAD6-a56BE1g1f35dFGDECf2FF-6B@roundhouse.proxy.rlwy.net:12651/railway"

ENV JWT_SECRET="0)r1.P}Sv}L8D_UbZJ£k7JMgMU£QXefk-S@,68I7gNV1s>qB"

# Generate Prisma Client
COPY --link prisma .
RUN npx prisma generate

RUN npx prisma migrate deploy

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "node", "dist/main.js" ]
# CMD [ "npm", "run", "start" ]
