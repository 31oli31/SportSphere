# Use the official Node.js 14 image as a base
FROM node:20-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Use a lightweight Node.js image for the production environment
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the port the app runs on
EXPOSE 3000

# Run the Next.js app
CMD ["npm", "start"]
