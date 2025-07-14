import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from './firebaseConfig';

const getDataBBDDDealersByName = async (nombreRepartidor) => {
    const collectionNameDealers = collection(db, "repartidores");

    try{
        const q = query(collectionNameDealers, where("nombre", "==", nombreRepartidor));
        const querySnapShot = await getDocs(q);
        const dealersListNames = querySnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return dealersListNames;
    
    }catch(e){
        console.error("ERROR - NO SE HAN ENCONTRADO LOS DATOS ❌", e);
        return []; // Devolvemos un array vacío en caso de error
    }
};

export default getDataBBDDDealersByName;