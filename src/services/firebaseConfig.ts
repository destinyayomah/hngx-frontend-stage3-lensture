import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "lensture.firebaseapp.com",
    projectId: "lensture",
    storageBucket: "lensture.appspot.com",
    messagingSenderId: "968600051970",
    appId: "1:968600051970:web:176296cc543e137dd0621b"
};

const app = initializeApp(firebaseConfig);
export const database = getAuth(app);