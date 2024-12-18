import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDKZBZIDESusb_d8znC_ipjhGb-uwt4SLE",
  authDomain: "webdevdatabase-b50ec.firebaseapp.com",
  projectId: "webdevdatabase-b50ec",
  storageBucket: "webdevdatabase-b50ec.firebasestorage.app",
  messagingSenderId: "819317170454",
  appId: "1:819317170454:web:6bb090c0eff0dde0517037"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

export { db };
