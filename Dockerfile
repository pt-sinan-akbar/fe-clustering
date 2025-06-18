# build stage
FROM node:lts-alpine AS builder
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" > /app/.env
RUN npm run build-only

# production stage
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]