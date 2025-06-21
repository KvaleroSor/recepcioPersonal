import { doc, setDoc} from "firebase/firestore";
import { db } from './firebaseConfig';

// Write
const setDataBBDDPersonalImasd = async ({personalImasd}) => {
    const { id, nombre, telefono } = personalImasd;

    await  setDoc(doc(db, "personalImasd", String(id)), {
        id: id,
        nombre: nombre,
        telefono: telefono,       
    });
}

export default setDataBBDDPersonalImasd;
