// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU-U7-567UkOc54KYIl2i5DmI7fftrE4s",
  authDomain: "og-image-d82fc.firebaseapp.com",
  projectId: "og-image-d82fc",
  storageBucket: "og-image-d82fc.appspot.com",
  messagingSenderId: "291859414474",
  appId: "1:291859414474:web:940a630eaaed341b4fa333",
  measurementId: "G-6QEWVWY51W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };