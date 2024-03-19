# Use Node.js v18
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose port 5000 for the application
EXPOSE 5000

# Define the command to run the application
CMD ["npm", "start"]
