# ==============================================================
#  HappyFurniture – React + Vite (User-facing Frontend)
# ==============================================================

# ------- Build Stage -------
FROM node:20-alpine AS build
WORKDIR /app

# Build arguments for environment variables (pass at docker build time)
# Khai báo trước khi copy source để Docker cache đúng thứ tự
ARG VITE_API_BASE_URL=http://localhost:8080
ARG VITE_API_PROXY_TARGET=http://localhost:8080
ARG VITE_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_API_PROXY_TARGET=$VITE_API_PROXY_TARGET
ENV VITE_RECAPTCHA_SITE_KEY=$VITE_RECAPTCHA_SITE_KEY

# Copy dependency manifests first (layer caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build production bundle
RUN npm run build

# ------- Production Stage (Nginx) -------
FROM nginx:1.27-alpine AS production
WORKDIR /usr/share/nginx/html

# Remove default nginx static files
RUN rm -rf ./*

# Copy built assets from the build stage
COPY --from=build /app/dist .

# Custom nginx config to support React Router (SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
