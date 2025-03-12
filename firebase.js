import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA24aLGeEM7mYKyxvwqLS_volrzWyyUk2Q",
  authDomain: "puzzleboard-8fe98.firebaseapp.com",
  projectId: "puzzleboard-8fe98",
  storageBucket: "puzzleboard-8fe98.appspot.com", // 🔥 CORREGIDO 🔥
  messagingSenderId: "561330052242",
  appId: "1:561330052242:web:c5cf42ac67e3cd5c35da4b",
  measurementId: "G-CZL47104M8"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { db, storage, ref, uploadBytes, getDownloadURL, collection, getDocs, addDoc };
