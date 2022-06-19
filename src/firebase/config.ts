// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAXJc6iE-2VuZzQbG6QXyX_nXrE02jqro",
    authDomain: "project-planner-bd73d.firebaseapp.com",
    projectId: "project-planner-bd73d",
    storageBucket: "project-planner-bd73d.appspot.com",
    messagingSenderId: "432697886292",
    appId: "1:432697886292:web:4b3510c7e521e17f680fc1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
