import { collection, getDocs } from "firebase/firestore";
import { db } from './firebaseConfig';

const getDataBBDDComerciales = async () => {
    const collectionComerciales = collection(db, "comerciales");
    try {
        const querySnapshot = await getDocs(collectionComerciales);
        const comercialList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));        
        return comercialList; // Devolvemos la lista de personal
    } catch (error) {
        console.error("ERROR - NO SE HAN ENCONTRADO LOS DATOS ❌", error);
        return []; // Devolvemos un array vacío en caso de error
    }
}

export { getDataBBDDComerciales };