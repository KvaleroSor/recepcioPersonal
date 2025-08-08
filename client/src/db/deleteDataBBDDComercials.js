import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const deleteDataBBDDComercials = async (comercial) => {
    try {
        await deleteDoc(doc(db, "comerciales", comercial));
    } catch (e) {
        console.log(e);
    }
};

export default deleteDataBBDDComercials;
