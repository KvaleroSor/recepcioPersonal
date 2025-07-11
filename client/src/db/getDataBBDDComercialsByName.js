import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from './firebaseConfig';

const getDataBBDDComercialsByName = async (nombreComercial) => {
    const collectionNameDealers = collection(db, "repartidores");

    try{
        const q = query(collectionNameDealers, where("nombre", "==", nombreComercial));
        const querySnapShot = await getDocs(q);
        const dealersListNames = querySnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return dealersListNames;
    
    }catch(e){
        console.error("ERROR - NO SE HAN ENCONTRADO LOS DATOS ❌", e);
        return []; // Devolvemos un array vacío en caso de error
    }
};

export { getDataBBDDComercialsByName };