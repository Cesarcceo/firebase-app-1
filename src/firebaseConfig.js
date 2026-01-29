// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGybq2kOJb8WwR-d94MRte7f5R6EtEaYI",
  authDomain: "vue-firebase-cesarcceo.firebaseapp.com",
  projectId: "vue-firebase-cesarcceo",
  storageBucket: "vue-firebase-cesarcceo.firebasestorage.app",
  messagingSenderId: "576673410956",
  appId: "1:576673410956:web:b274f21b3d13029763f0a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { auth };