#!/bin/bash

zip -r bundle.zip \
      dist/ \
      public/ \
      files/ \
      .dockerignore \
      .env \
      Dockerfile \
      docker-compose.yml \
      package-lock.json \
      package.json \
      tsconfig.migrations.json \
      tsconfig.json \
      tsconfig.build.json