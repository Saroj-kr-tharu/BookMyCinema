FROM node:20-alpine
# from the base image node 

WORKDIR /movie_booking/auth_service
# working directory define 

COPY package*.json ./

RUN npm ci

COPY . .
#copy all the file for the host to working directory 


CMD [ "npm", "start" ]
# cmd when container is on 
