import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const deleteDataBBDDDearlers = async (dealer) => {
    try{
        await deleteDoc(doc(db, "repartidores", dealer));
    }catch(e){
        console.log(e);
    }
};

export default deleteDataBBDDDearlers;