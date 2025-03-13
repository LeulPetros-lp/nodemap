// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLMZJ83Orb0zYuCkY0y7cIXi9LPPUEdj0",
  authDomain: "nodemap-c.firebaseapp.com",
  projectId: "nodemap-c",
  storageBucket: "nodemap-c.firebasestorage.app",
  messagingSenderId: "281533955432",
  appId: "1:281533955432:web:eba67c01dbb4b29951aadd",
  measurementId: "G-6JRLFS25R2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };