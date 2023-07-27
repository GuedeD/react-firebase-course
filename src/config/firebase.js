import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAtUNNmNek1P_O4s-ZF93VwlvKmmgqHqlY",
  authDomain: "fir-course-fb0fa.firebaseapp.com",
  projectId: "fir-course-fb0fa",
  storageBucket: "fir-course-fb0fa.appspot.com",
  messagingSenderId: "305688654084",
  appId: "1:305688654084:web:9efd5f0a02bc2b5811a051",
  measurementId: "G-ECM30KR5FM",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
