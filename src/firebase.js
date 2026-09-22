import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpqKPOstk-t_imINu4GcL2Oz0AVbepso0",
  authDomain: "planning-with-ai-f5570.firebaseapp.com",
  projectId: "planning-with-ai-f5570",
  storageBucket: "planning-with-ai-f5570.firebasestorage.app",
  messagingSenderId: "344505370599",
  appId: "1:344505370599:web:4ce5ff112e169ab34e1f42",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();