# Stage 1: Construir la aplicación de React
FROM node:18-alpine AS build

WORKDIR /app

# Copiamos los archivos de dependencias y las instalamos
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Creamos la build de producción
RUN npm run build

# Stage 2: Servir la aplicación con Nginx
FROM nginx:stable-alpine

# Copiamos los archivos estáticos generados en el Stage 1
COPY --from=build /app/build /usr/share/nginx/html

# Copiamos una configuración personalizada para Nginx (la crearemos después)
# Esto es crucial para que React Router funcione bien.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80 que Nginx usa por defecto
# Posiblemente se tenga que cambiar el puerto al que se le asigne porque 
# el puerto 80 estará en uso
EXPOSE 80

# El comando por defecto de Nginx se encarga de iniciar el servidor
CMD ["nginx", "-g", "daemon off;"]