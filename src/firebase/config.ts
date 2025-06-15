import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCE6KzRsLLTmn7_0VlkkrQQj33KdWlAVKQ",
  authDomain: "diamonds-b2262.firebaseapp.com",
  projectId: "diamonds-b2262",
  storageBucket: "diamonds-b2262.appspot.com",
  messagingSenderId: "976364801407",
  appId: "1:976364801407:web:3a7179ec0502a9a6c41e4a",
  measurementId: "G-GBFRZKHBXW"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;