import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCU1goy2GBzo54YxbZtuboF7r8_IdOcOFM",
    authDomain: "testdeproyecto.firebaseapp.com",
    databaseURL: "https://testdeproyecto.firebaseio.com",
    projectId: "testdeproyecto",
    storageBucket: "testdeproyecto.appspot.com",
    messagingSenderId: "521661411568",
    appId: "1:521661411568:web:9c42cbcec164e9c986d235"
};

firebase.initializeApp(firebaseConfig);

export const firebaseapp = firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
