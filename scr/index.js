// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyex6hTmTpVdSjzdbUoJe59jMzqeGLhEQ",
  authDomain: "yume-77345.firebaseapp.com",
  projectId: "yume-77345",
  storageBucket: "yume-77345.appspot.com",
  messagingSenderId: "616261810801",
  appId: "1:616261810801:web:39ba10d92dd3fa546979d0",
  measurementId: "G-RZSPMR5GPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);