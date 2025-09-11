// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJwFH9V-EPklvE7qb16OPXachD_LzhKTc",
  authDomain: "construction-tracking-34835.firebaseapp.com",
  projectId: "construction-tracking-34835",
  storageBucket: "construction-tracking-34835.firebasestorage.app",
  messagingSenderId: "7132193879",
  appId: "1:7132193879:web:7fa37ad1d823f559216f12",
  measurementId: "G-0EEHK3SFL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
