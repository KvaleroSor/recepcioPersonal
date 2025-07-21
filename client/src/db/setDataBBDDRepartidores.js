import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Write
const setDataBBDDRepartidores = async (infoRepartidor) => {
    try {
        await addDoc(collection(db, "repartidores"), {
            ...infoRepartidor,
            fecha: serverTimestamp(),
        });
    } catch (e) {
        console.log(`Error al añadir el documento ${e}`);
    }
};

export default setDataBBDDRepartidores;
