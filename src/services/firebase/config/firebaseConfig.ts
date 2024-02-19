import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAJIFzjWcBG8tg9YlIybRoPPtY1a4V_Cww",
    authDomain: "w3tl2-93693.firebaseapp.com",
    projectId: "w3tl2-93693",
    storageBucket: "w3tl2-93693.appspot.com",
    messagingSenderId: "1002851844941",
    appId: "1:1002851844941:web:0f032b11c30675e82b2d04",
    measurementId: "G-7MDHWFPS3Z"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export { app, auth, db };