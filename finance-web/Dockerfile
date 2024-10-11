# Stage 1: Build the React app
FROM node:22-alpine3.19 AS builder

ARG API_BASE_URL
ENV API_BASE_URL=$API_BASE_URL

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for internal communication
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]