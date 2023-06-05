import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {

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

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
