import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "stack-nova-attendance.firebaseapp.com",
  projectId: "stack-nova-attendance",
  storageBucket: "stack-nova-attendance.firebasestorage.app",
  messagingSenderId: "606673048765",
  appId: "1:606673048765:web:def4f4d0e14c28bff0d3d4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);