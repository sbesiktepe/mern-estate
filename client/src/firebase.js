// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-36d87.firebaseapp.com",
  projectId: "mern-estate-36d87",
  storageBucket: "mern-estate-36d87.appspot.com",
  messagingSenderId: "989816865777",
  appId: "1:989816865777:web:b6a4740559b4fc50003a50",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
