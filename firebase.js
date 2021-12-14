// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCBYIoZnAA_6qXIN_a2P75gRIvSLa5T18",
  authDomain: "tinder-app-yt.firebaseapp.com",
  projectId: "tinder-app-yt",
  storageBucket: "tinder-app-yt.appspot.com",
  messagingSenderId: "752917325907",
  appId: "1:752917325907:web:2467bacb43b34dbc413ea6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db }
