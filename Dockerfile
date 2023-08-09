# Use an existing base image with Node.js pre-installed
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code to the container
COPY . .

# Build TypeScript code
RUN npm run build

# Expose a port (if your app listens on a specific port)
EXPOSE 3333

# Set the command to run when the container starts
CMD ["node", "dist/server.js"]
