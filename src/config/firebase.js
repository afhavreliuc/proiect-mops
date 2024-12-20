import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFszAG9rKrj7gnqNsPhQ_o3ly3GyEu2vw",
  authDomain: "proiect-react-6e4d1.firebaseapp.com",
  projectId: "proiect-react-6e4d1",
  storageBucket: "proiect-react-6e4d1.appspot.com",
  messagingSenderId: "691708026176",
  appId: "1:691708026176:web:dc50b62d1bfc09bc456ea5",
  measurementId: "G-TC5WQ9X3TT",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
