import { collection, getDocs } from "firebase/firestore";
import { db } from './firebaseConfig';

const getDataBBDDRepartidores = async () => {
    const collectionRepartidores = collection(db, "repartidores");
    try {
        const querySnapshot = await getDocs(collectionRepartidores);
        const repartidorList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));        
        return repartidorList; // Devolvemos la lista de personal
    } catch (error) {
        console.error("ERROR - NO SE HAN ENCONTRADO LOS DATOS ❌", error);
        return []; // Devolvemos un array vacío en caso de error
    }
}

export { getDataBBDDRepartidores };