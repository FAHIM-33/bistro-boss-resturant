// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9RSTmqCeVkMgV_vtf9iPXV-0C4KpeX7s",
    authDomain: "final-project-94c77.firebaseapp.com",
    projectId: "final-project-94c77",
    storageBucket: "final-project-94c77.appspot.com",
    messagingSenderId: "935231307446",
    appId: "1:935231307446:web:f14445ed29d6aab275b017"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;