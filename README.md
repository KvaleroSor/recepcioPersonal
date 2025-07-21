# 🚪 Recepción Personal 🚀

¡Bienvenido al futuro de la gestión de visitas! Este proyecto es tu asistente personal para una recepción moderna y eficiente. Olvídate de los cuadernos y las esperas, ¡aquí todo es digital y fluido! ✨

## 🌟 Funcionalidades

-   **Gestión de Visitas Inteligente:** Registra y organiza a tus visitantes con un par de clics. ¡Adiós al caos! 📋
-   **Notificaciones en Tiempo Real:** ¿Alguien en la puerta? ¡Te avisamos al instante! 🔔 (Gracias a nuestra integración con DoorBird y WebSockets).
-   **Interfaz de Usuario Amigable:** Diseñada para que tanto el personal de recepción como los visitantes tengan una experiencia de 10. 
-   **Seguridad y Privacidad:** Tus datos y los de tus visitas, protegidos como un tesoro. 🔒

## 🛠️ Tecnologías Usadas (¡La Magia Detrás!)

Este proyecto es una sinfonía de tecnologías modernas, orquestadas para ofrecerte lo mejor:

-   **Frontend:** React (con Vite para una velocidad de vértigo ⚡) - La cara bonita y funcional de nuestra aplicación.
-   **Backend:** Node.js (con Express.js) - El cerebro que maneja toda la lógica y la comunicación. 🧠
-   **Base de Datos:** Firebase Firestore - Para guardar tus datos de forma segura y escalable en la nube. ☁️
-   **Contenedores:** Docker & Docker Compose - Para que todo funcione en cualquier lugar, ¡sin complicaciones! 🐳
-   **Servidor Web/Proxy:** Nginx - El guardián que dirige el tráfico y asegura la comunicación. 🛡️

## 🚀 ¡Manos a la Obra! (Cómo Empezar)

Para poner en marcha este cohete en tu máquina local, sigue estos sencillos pasos:

1.  **Clona el Repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/recepcionPersonal.git
    cd recepcionPersonal
    ```

2.  **Configuración de Firebase:**
    Este proyecto utiliza Firebase Firestore. Necesitarás tus propias credenciales de Firebase. Crea un archivo `.env` en la carpeta `client` y añade tus credenciales:
    ```
    # client/.env
    REACT_APP_FIREBASE_API_KEY="TU_API_KEY"
    REACT_APP_FIREBASE_AUTH_DOMAIN="TU_AUTH_DOMAIN"
    REACT_APP_FIREBASE_PROJECT_ID="TU_PROJECT_ID"
    REACT_APP_FIREBASE_STORAGE_BUCKET="TU_STORAGE_BUCKET"
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID="TU_MESSAGING_SENDER_ID"
    REACT_APP_FIREBASE_APP_ID="TU_APP_ID"
    REACT_APP_FIREBASE_MEASUREMENT_ID="TU_MEASUREMENT_ID"
    ```
    Y en la carpeta `server`, crea un archivo `.env` para el backend (si es necesario para alguna configuración específica del backend, como claves de API, etc.):
    ```
    # server/.env
    PORT=3001 # O el puerto que uses para tu API
    # Otras variables de entorno del backend
    ```

3.  **¡Dockeriza la Diversión!**
    Con Docker Desktop instalado y funcionando, navega a la raíz del proyecto y ejecuta:
    ```bash
    docker-compose up -d --build
    ```
    Esto construirá las imágenes de Docker para tu frontend, backend y Nginx, y las pondrá en marcha en segundo plano. ¡Magia! ✨

4.  **Accede a la Aplicación:**
    Una vez que los contenedores estén listos, podrás acceder a la aplicación en tu navegador:
    -   **Frontend:** `http://localhost` (o `http://localhost:8080` si mapeaste a un puerto diferente)
    -   **Backend API:** `http://localhost:3001` (o el puerto que hayas configurado)

## 🌐 Despliegue en Servidor (¡Llevando la Recepción a las Nubes!)

Para desplegar este proyecto en un servidor de producción, considera lo siguiente:

1.  **Puertos 80 y 443:** Asegúrate de que los puertos 80 (HTTP) y 443 (HTTPS) estén abiertos en el firewall de tu servidor. Si están ocupados, puedes mapear los puertos de Docker Compose a puertos alternativos (ej. `8080:80`).

2.  **Certificados SSL:** Para habilitar HTTPS (altamente recomendado para producción), necesitarás certificados SSL válidos (por ejemplo, de Let's Encrypt). Monta estos certificados en tu contenedor Nginx y configura `nginx.conf` para usarlos.

    ```yaml
    # docker-compose.yml (ejemplo con certificados)
    nginx:
      # ...
      volumes:
        - ./nginx.conf:/etc/nginx/conf.d/default.conf
        - ./certs:/etc/nginx/certs # Descomenta y asegura que 'certs' contenga tus certificados
    ```

3.  **Variables de Entorno en Producción:** En un entorno de producción, es crucial que las variables de entorno de Firebase (y cualquier otra variable sensible) no estén hardcodeadas. Utiliza el sistema de variables de entorno de tu servidor o de tu plataforma de despliegue para inyectarlas de forma segura.

4.  **Configuración de Nginx:** Revisa y ajusta tu `nginx.conf` para el entorno de producción, asegurando que las rutas y los dominios sean correctos.

## 🤝 Contribuciones

¡Las ideas frescas son siempre bienvenidas! Si quieres contribuir a este proyecto, no dudes en abrir un *issue* o enviar un *pull request*. ¡Juntos podemos hacer la recepción aún más increíble! 💡

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles. (Si tienes uno, si no, puedes omitir esta sección o crear uno).

---

¡Gracias por usar Recepción Personal! ¡Esperamos que te haga la vida más fácil y divertida! 🎉
