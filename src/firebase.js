// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase/compat";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCzRIdAyok8n3mOaD9kYvHOD_t0AN9TAH8",
  authDomain: "olaniyi-instagram-clone.firebaseapp.com",
  projectId: "olaniyi-instagram-clone",
  storageBucket: "olaniyi-instagram-clone.appspot.com",
  messagingSenderId: "560167388466",
  appId: "1:560167388466:web:4b354ff4dbece9cf1b832b",
  measurementId: "G-QJHXW689JR",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
