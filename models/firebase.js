import {initializeApp} from "firebase/app";
import {getDatabase} from 'firebase/database'
import { config } from "dotenv";

config();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    databaseURL: process.env.DATABASE_URL,
    appId: process.env.APP_ID
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

