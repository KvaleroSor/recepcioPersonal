import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from './firebaseConfig';

const getDataBBDDComercialsByName = async (nombreComercial) => {
    const collectionNameComercials = collection(db, "comerciales");

    try{
        const q = query(collectionNameComercials, where("nombre", "==", nombreComercial));
        const querySnapShot = await getDocs(q);
        const comercialListNames = querySnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return comercialListNames;
    
    }catch(e){
        console.error("ERROR - NO SE HAN ENCONTRADO LOS DATOS ❌", e);
        return []; // Devolvemos un array vacío en caso de error
    }
};

export default getDataBBDDComercialsByName;