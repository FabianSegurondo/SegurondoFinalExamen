import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore/lite"


const firebaseConfig = {
    apiKey: "AIzaSyDELjDKeZ6zWDnk7qdBSzmBHeU9gXyE5Dk",
    authDomain: "examenfinal-ee215.firebaseapp.com",
    projectId: "examenfinal-ee215",
    storageBucket: "examenfinal-ee215.appspot.com",
    messagingSenderId: "19249018305",
    appId: "1:19249018305:web:c0137d58932fe11a7f6b40"
  };

export const initFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(initFirebase);
export const db = getFirestore(initFirebase);