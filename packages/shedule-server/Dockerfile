FROM node:12.22.5

ARG APP_DIR=app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package*.json ./
RUN npm install --production

COPY . .
EXPOSE 1339
ENV NODE_ENV=production
ENV PORT=1339
CMD ["npm", "run", "start"]
