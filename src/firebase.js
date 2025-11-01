// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7_9cN_TEt0BjjWOjEKASlAHqdeEERFuk",
    authDomain: "regaleria-tati.firebaseapp.com",
    projectId: "regaleria-tati",
    storageBucket: "regaleria-tati.appspot.com",
    messagingSenderId: "242690708178",
    appId: "1:242690708178:web:fd862bec058c219e75130b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { app };