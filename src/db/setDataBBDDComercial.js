import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Write
const setDataBBDDComercial = async (infoComercial) => {
    try {
        const docRef = await addDoc(collection(db, "comerciales"), {
            ...infoComercial,
            fecha: serverTimestamp(),
        });
        
        console.log(`Documento guardado con ID: ${docRef.id}`);
    } catch (e) {
        console.log(`Error al añadir el documento ${e}`);
    }
};

export default setDataBBDDComercial;
