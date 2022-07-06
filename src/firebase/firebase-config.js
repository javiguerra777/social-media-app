import {initializeApp} from 'firebase/app';
import {getFirestore} from '@firebase/firestore';
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDOoruFgPX6tl_VsAhUP_NFqY90VW17n1g",
  authDomain: "social-media-76549.firebaseapp.com",
  projectId: "social-media-76549",
  storageBucket: "social-media-76549.appspot.com",
  messagingSenderId: "795916460249",
  appId: "1:795916460249:web:cb7233e1df1df0fe621ec8",
  measurementId: "G-4VXNSPMLNR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

