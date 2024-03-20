# Use Node.js v18
FROM node:18 AS build

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the application
RUN npm run build

# Expose port 8080 for the application
EXPOSE 8080

# Define the command to run the application
CMD [ "npm", "run", "dev" ]