// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB-tozwu5SHNug5s_4NjVAmPrcuA4mSRSw",
    authDomain: "prescriptionhistory-70c35.firebaseapp.com",
    projectId: "prescriptionhistory-70c35",
    storageBucket: "prescriptionhistory-70c35.appspot.com",
    messagingSenderId: "922252725102",
    appId: "1:922252725102:web:4f15447dddd742601e8f7f",
    // measurementId: "G-MGLQK21N2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 