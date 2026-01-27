import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC340bh4QfjPUE1wojANiUnv1yua5aUJxw",
  authDomain: "tvc-bfsi.firebaseapp.com",
  projectId: "tvc-bfsi",
  storageBucket: "tvc-bfsi.appspot.com",
  messagingSenderId: "966315019860",
  appId: "1:966315019860:android:d87686617090ef1ffca7c1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
