/*
GUÍA PARA CONECTAR TU BASE DE DATOS FIREBASE (RecepcionPersonal) EN ESTE PROYECTO

PASO 1: CREA EL PROYECTO EN FIREBASE
- Ve a https://console.firebase.google.com/
- Haz clic en "Agregar proyecto" y sigue los pasos.
- El nombre del proyecto puede ser el que quieras (ej: RecepcionPersonal).

PASO 2: CREA UNA APP WEB
- En el panel del proyecto, haz clic en el icono "</>" para registrar una app web.
- Ponle un nombre (ej: RecepcionPersonalWeb) y sigue los pasos.
- Copia el bloque de configuración que te da Firebase (apiKey, authDomain, projectId, etc).

PASO 3: INSTALA FIREBASE EN TU PROYECTO
- En la terminal, ejecuta:
    npm install firebase

PASO 4: CREA EL ARCHIVO DE CONFIGURACIÓN
- Crea un archivo src/db/firebaseConfig.js con este contenido:

    import { initializeApp } from "firebase/app";
    const firebaseConfig = {
      apiKey: "TU_API_KEY",
      authDomain: "TU_DOMINIO.firebaseapp.com",
      projectId: "recepcionpersonal",
      storageBucket: "TU_BUCKET.appspot.com",
      messagingSenderId: "XXXXXXXX",
      appId: "1:XXXXXXXX:web:XXXXXXXX"
    };
    const firebaseApp = initializeApp(firebaseConfig);
    export default firebaseApp;

- Sustituye los valores por los que te da Firebase en la consola.

PASO 5: USA LA CONFIGURACIÓN EN ESTE ARCHIVO
- Importa firebaseApp aquí:
    import firebaseApp from "./firebaseConfig";
- Para obtener la instancia de Firestore:
    const db = getFirestore(firebaseApp);
- Para escribir datos:
    await setDoc(doc(db, "personalImasd", String(data.id)), data);

PASO 6: EXPORTA UNA FUNCIÓN QUE GUARDE DATOS
- Ejemplo de función:
    export async function setDataBBDD(data) {
      await setDoc(doc(db, "personalImasd", String(data.id)), data);
    }

PASO 7: USO EN COMPONENTES
- Importa y llama a la función desde cualquier componente:
    import { setDataBBDD } from "../db/setDataBBDD";
    setDataBBDD({ id: 1, nombre: "Kiko", telefono: 1234, fecha: "" });

NOTAS:
- El nombre de la base de datos en Firebase es el projectId, pero en el código solo usas la configuración que copiaste.
- El nombre de la colección (por ejemplo "personalImasd") puedes elegirlo tú.
- Puedes crear más funciones para leer, actualizar o eliminar datos usando la API de Firestore.
*/

import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";

const db = getFirestore("RecepcionPersonal");

// Write
await setDataBBDD(doc(db, "personalImasd"), {
    id: 25,
    nombre: "Kiko Valero",
    telefono: 2025,
    fecha: ""
});

export default setDataBBDD;
