import { collection, getDocs } from "firebase/firestore";
import { db } from './firebaseConfig';

const getDataBBDDPersonalImasd = async () => {
    const collectionPerosonalImasd = collection(db, "personalImasd");
    try {
        const querySnapshot = await getDocs(collectionPerosonalImasd);
        const personalList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Data encontrada:", personalList);
        return personalList; // Devolvemos la lista de personal
    } catch (error) {
        console.error("ERROR - NO SE HAN ENCONTRADO LOS DATOS ❌", error);
        return []; // Devolvemos un array vacío en caso de error
    }
}

export { getDataBBDDPersonalImasd };
