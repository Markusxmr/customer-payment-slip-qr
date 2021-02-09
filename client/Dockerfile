FROM node:12-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build && npm prune --production
ENV NODE_ENV=production
CMD ["npm", "start"]
