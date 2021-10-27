import {initializeApp} from 'firebase/app';
import {getStorage, ref} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHVR56t0lsCfoRrz1aQOfWl7Uf-E_93YM",
  authDomain: "iid-archive-f45bb.firebaseapp.com",
  projectId: "iid-archive-f45bb",
  storageBucket: "iid-archive-f45bb.appspot.com",
  messagingSenderId: "362002090608",
  appId: "1:362002090608:web:b5862155d94e15ca5c02b5",
  measurementId: "G-DGFFWFTJHT",
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

export {storage, firebaseConfig as default }
