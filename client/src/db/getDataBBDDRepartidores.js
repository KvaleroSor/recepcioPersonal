import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from './firebaseConfig';

const getDataBBDDRepartidores = async () => {
    const collectionRepartidores = collection(db, "repartidores");
    try {
        const q = query(collectionRepartidores, orderBy("fecha", "desc"));
        const querySnapshot = await getDocs(q);
        const repartidorList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));        
        return repartidorList; // Devolvemos la lista de personal
    } catch (error) {
        console.error("ERROR - NO SE HAN ENCONTRADO LOS DATOS ❌", error);
        return []; // Devolvemos un array vacío en caso de error
    }
}

export { getDataBBDDRepartidores };