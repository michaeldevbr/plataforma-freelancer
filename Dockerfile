FROM node:26.13.0
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci
COPY . /app
EXPOSE 3000
CMD ["npm", "start"]