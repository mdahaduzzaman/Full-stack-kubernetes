# Use the official Node.js image from the Docker Hub
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy the project
COPY . .

# Build the app
RUN npm run build