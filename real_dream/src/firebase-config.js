import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, enableIndexedDbPersistence} from 'firebase/firestore';

// Your web app's Firebase configuration
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

const db = getFirestore(app);
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a time.
    console.error("Failed to enable persistence because multiple tabs are open.");
    throw new Error("Failed to enable persistence because multiple tabs are open.");
  } else if (err.code === 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    console.error("The current browser does not support all of the features required to enable persistence.");
    throw new Error("The current browser does not support all of the features required to enable persistence.");
  }
});

export { db, app };

export const auth= getAuth(app);
export const provider = new GoogleAuthProvider();
