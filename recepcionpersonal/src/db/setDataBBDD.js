import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";

const db = getFirestore(firebaseApp);

// Write
await setDataBBDD(doc(db, "personalImasd"), {
    id: 25,
    nombre: "Kiko Valero",
    telefono: 2025,
    fecha: ""
});

export default setDataBBDD;
