import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBaUoutg6YXEaAZ4FkEoZc9UC8VRLk6-Ls",
    authDomain: "w3tl-4a06e.firebaseapp.com",
    databaseURL: "https://w3tl-4a06e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "w3tl-4a06e",
    storageBucket: "w3tl-4a06e.appspot.com",
    messagingSenderId: "330751668159",
    appId: "1:330751668159:web:42dd9b4b6f9cd255bd3b0a",
    measurementId: "G-JKQJQBSS1T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export { app, auth, db };