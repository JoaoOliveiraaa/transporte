import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD_oebbwRPb_Epw45yaU4mbrrrgS8Tmgm8",
  authDomain: "react-auth-cdc56.firebaseapp.com",
  projectId: "react-auth-cdc56",
  storageBucket: "react-auth-cdc56.appspot.com",
  messagingSenderId: "250524580483",
  appId: "1:250524580483:web:2953b2bdf21dce47f579b6"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 

export { auth };
