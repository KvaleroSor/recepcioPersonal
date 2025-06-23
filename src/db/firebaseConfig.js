// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBOWXRQwz7eMrt0DT1L8L8ewsgqDOhYT3w",
  authDomain: "recepcionpersonal-a3296.firebaseapp.com",
  projectId: "recepcionpersonal-a3296",
  storageBucket: "recepcionpersonal-a3296.firebasestorage.app",
  messagingSenderId: "279043712411",
  appId: "1:279043712411:web:ac668cd8ce0f3a24026d3e",
  measurementId: "G-SG64N735XX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

