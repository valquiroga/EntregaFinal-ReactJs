import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
apiKey: "AIzaSyDhqUO_UcXG4IQ_Su6xL-v7XAvMvokl_Ig",
authDomain: "ecommerce01-1bd43.firebaseapp.com",
projectId: "ecommerce01-1bd43",
storageBucket: "ecommerce01-1bd43.appspot.com",
messagingSenderId: "420829985446",
appId: "1:420829985446:web:d0d17955cac7c57c311267"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
