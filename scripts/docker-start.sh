#!/bin/bash

# Load environment variables from API .env.docker file
set -a
source apps/api/.env.docker
set +a

# Start Docker Compose with loaded variables
docker-compose "$@"