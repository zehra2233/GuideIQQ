import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7ghWN7luLvGOsCOq7C899z8hHbYlMV0M",
  authDomain: "guideiq-cf4b3.firebaseapp.com",
  projectId: "guideiq-cf4b3",
  storageBucket: "guideiq-cf4b3.firebasestorage.app",
  messagingSenderId: "124884016533",
  appId: "1:124884016533:web:bc506f27e56e1ec340ea9c",
  measurementId: "G-0K5E5YSBEG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);