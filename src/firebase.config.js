// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt_PDhquBvXgt38DeaLbBgzK5b9ghbCRI",
  authDomain: "flormar-30709.firebaseapp.com",
  projectId: "flormar-30709",
  storageBucket: "flormar-30709.appspot.com",
  messagingSenderId: "939232580508",
  appId: "1:939232580508:web:761ef3e4a908fa79196e59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;