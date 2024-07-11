// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDs54qB9WqHFsv-Ve83pZBjppx293fQ3uo",
    authDomain: "roamly-a258c.firebaseapp.com",
    projectId: "roamly-a258c",
    storageBucket: "roamly-a258c.appspot.com",
    messagingSenderId: "145654670956",
    appId: "1:145654670956:web:3ef505dcc83424a9071a49"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
