import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from './firebaseConfig';

const getDataBBDDComerciales = async () => {
    const collectionComerciales = collection(db, "comerciales");
    try {
        const q = query(collectionComerciales, orderBy("fecha", "desc"));
        const querySnapshot = await getDocs(q);
        const comercialList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));        
        return comercialList; // Devolvemos la lista de personal
    } catch (error) {
        console.error("ERROR - NO SE HAN ENCONTRADO LOS DATOS ❌", error);
        return []; // Devolvemos un array vacío en caso de error
    }
}

export { getDataBBDDComerciales };