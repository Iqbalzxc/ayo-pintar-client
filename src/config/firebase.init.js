// IMPORT THE FUNCTIONS YOU NEED FROM THE SDKS YOU NEED
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBFb2-HmoaRnGE0dEz-7_zBNtv2j-eD2i0",
  authDomain: "ayo-pintar.firebaseapp.com",
  projectId: "ayo-pintar",
  storageBucket: "ayo-pintar.appspot.com",
  messagingSenderId: "521309261026",
  appId: "1:521309261026:web:1cc83ccbb9640d148022bb",
};

// INITIALIZE FIREBASE
export const app = initializeApp(firebaseConfig);


// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APIKEY,
//   authDomain: import.meta.env.VITE_AUTHDOMAIN,
//   projectId: import.meta.env.VITE_PROJECTID,
//   storageBucket: import.meta.env.VITE_STORAGEBUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
//   appId: import.meta.env.VITE_APPID }