// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDM40Fr8cHWNi7A0zLFNh6WoabWgjAbCuU",
  authDomain: "todo-app-cp-cdc2c.firebaseapp.com",
  projectId: "todo-app-cp-cdc2c",
  storageBucket: "todo-app-cp-cdc2c.firebasestorage.app",
  messagingSenderId: "946870815362",
  appId: "1:946870815362:web:7479ef482deaf295f9429b",
  measurementId: "G-5M03XBF7JL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

// npm install -g firebase-tools
// firebase login
// firebase init:
// firebase deploy
