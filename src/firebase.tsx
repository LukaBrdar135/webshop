// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyA-x-ITDVNnkFd3ewRqkO6yytbQ1d_bqVo",
  authDomain: "webshop-b72ac.firebaseapp.com",
  databaseURL: "https://webshop-b72ac-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "webshop-b72ac",
  storageBucket: "webshop-b72ac.appspot.com",
  messagingSenderId: "206510205303",
  appId: "1:206510205303:web:c21c515acdaa337192d972"
};
// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth();
