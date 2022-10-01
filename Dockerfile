FROM node
WORKDIR /src
COPY package.json /src
RUN npm install
COPY . /src
CMD node index.js
EXPOSE 3000