# Base Image 

FROM node:18-alpine

# Working directory for app

WORKDIR /app

#copy code from host to container 


COPY . .

#code build and install

RUN npm install && npm run build 

#Expose the port

EXPOSE 3000

CMD [ "npm","run","dev"]


