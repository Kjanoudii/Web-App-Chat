// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,FacebookAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import {getStorage} from "firebase/storage"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBDLkwisbCeQBtszgALqKHl--r-gqG3eis",
  authDomain: "chat-project-7717d.firebaseapp.com",
  projectId: "chat-project-7717d",
  storageBucket: "chat-project-7717d.appspot.com",
  messagingSenderId: "401252923010",
  appId: "1:401252923010:web:7668082c7aac325b70669b",
  measurementId: "G-KBEMQFCJJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// export const contacts= collection(db, "Contacts")
export const Auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()
export const storage = getStorage(app)
// export const q = query(contacts)
// console.log(q)
// const analytics = getAnalytics(app);1'

