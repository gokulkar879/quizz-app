import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, onSnapshot,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
};


const app = initializeApp(firebaseConfig);

//init service

export const db = getFirestore()

//collectionRef

export const quizRef = collection(db, 'quizzes')
export const userRef = collection(db, 'users')

