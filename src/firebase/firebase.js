import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'



const firebaseConfig = {
    apiKey: "AIzaSyCLusEe0UrjCfeajAHCL37-gRh9AbL30yA",
    authDomain: "proiect-mops.firebaseapp.com",
    projectId: "proiect-mops",
    storageBucket: "proiect-mops.firebasestorage.app",
    messagingSenderId: "715464655125",
    appId: "1:715464655125:web:4667fd17d0618c7316e91c",
    measurementId: "G-ZG6NG4D5T5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
