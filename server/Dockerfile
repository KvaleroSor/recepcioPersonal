# Usamos una imagen de Node.js ligera
FROM node:18-alpine

WORKDIR /app

# Copiamos los archivos de dependencias
COPY package.json ./
COPY package-lock.json ./

# Instalamos solo las dependencias de producción
RUN npm install --production

# Copiamos el resto del código del backend
COPY . .

# Exponemos el puerto en el que corre nuestra API
# Asegúrate de que tu .env en producción use este puerto o cámbialo aquí
EXPOSE 5001

# El comando para iniciar el servidor
CMD [ "node", "index.js" ]