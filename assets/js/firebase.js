import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "PASTE",
  authDomain: "PASTE",
  projectId: "PASTE",
  storageBucket: "PASTE",
  messagingSenderId: "PASTE",
  appId: "PASTE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);