import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDSLa1sirEyzW4O8gn-9rQAcXiRB5T28OY",
  authDomain: "e-commerce-iitiancraft.firebaseapp.com",
  projectId: "e-commerce-iitiancraft",
  storageBucket: "e-commerce-iitiancraft.firebasestorage.app",
  messagingSenderId: "858284880708",
  appId: "1:858284880708:web:c337fc21a30610b0ef5d11",
  measurementId: "G-6GQW7C7017"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;