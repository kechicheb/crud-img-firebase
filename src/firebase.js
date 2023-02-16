import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZr4TovguK9BvaDwGh_MAw9_RN3b9N6Kk",
  authDomain: "crud-img-71ee9.firebaseapp.com",
  projectId: "crud-img-71ee9",
  storageBucket: "crud-img-71ee9.appspot.com",
  messagingSenderId: "811444790047",
  appId: "1:811444790047:web:96fdb379fda8d8e028862a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
