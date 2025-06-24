// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAVzkK1aBiRcSwLcE1SCvrHdTxTd46Hups",

    authDomain: "chat-test-95e7b.firebaseapp.com",

    databaseURL: "https://chat-test-95e7b-default-rtdb.firebaseio.com",

    projectId: "chat-test-95e7b",

    storageBucket: "chat-test-95e7b.firebasestorage.app",

    messagingSenderId: "906284822271",

    appId: "1:906284822271:web:4e1e26fafdbf7743e0e6ca",

    measurementId: "G-19B04L38T8"

};

/*
apiKey: "AIzaSyAVzkK1aBiRcSwLcE1SCvrHdTxTd46Hups",

    authDomain: "chat-test-95e7b.firebaseapp.com",

    databaseURL: "https://chat-test-95e7b-default-rtdb.firebaseio.com",

    projectId: "chat-test-95e7b",

    storageBucket: "chat-test-95e7b.firebasestorage.app",

    messagingSenderId: "906284822271",

    appId: "1:906284822271:web:4e1e26fafdbf7743e0e6ca",

    measurementId: "G-19B04L38T8"

*/

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
