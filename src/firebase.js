// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyARLUqd3AcZdsb5JjzzSCB6yQO_usi_QjA",
    authDomain: "fire-base-crud-b6835.firebaseapp.com",
    projectId: "fire-base-crud-b6835",
    storageBucket: "fire-base-crud-b6835.appspot.com",
    messagingSenderId: "267721343784",
    appId: "1:267721343784:web:ba15b5d2a2ac204255461d",
    measurementId: "G-447B0TP85E"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
