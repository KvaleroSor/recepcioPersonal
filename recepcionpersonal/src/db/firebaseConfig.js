// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);