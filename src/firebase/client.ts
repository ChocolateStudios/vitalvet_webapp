import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.MY_FIREBASE_API_KEY,
    authDomain: import.meta.env.MY_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.MY_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.MY_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.MY_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.MY_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.MY_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Obtiene una instancia de la Realtime Database.
const db = getDatabase(app);

export { app, db };