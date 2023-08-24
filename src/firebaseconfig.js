// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDL4b6Km5MN-XfpLYyoZ5AfVXRa_eKL66M",
  authDomain: "passaparola-b8548.firebaseapp.com",
  projectId: "passaparola-b8548",
  storageBucket: "passaparola-b8548.appspot.com",
  messagingSenderId: "938856859984",
  appId: "1:938856859984:web:e4fd3f64a8bac3c5e9c455",
  measurementId: "G-1F6SHF5S5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export default db;
