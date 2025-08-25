// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAckngxHwZncRV6Q6yV0ydBc1G4QHlPi8k",
//   authDomain: "react-task-7abe3.firebaseapp.com",
//   projectId: "react-task-7abe3",
//   storageBucket: "react-task-7abe3.firebasestorage.app",
//   messagingSenderId: "244067939850",
//   appId: "1:244067939850:web:3f77e84f6549f100b891f3",
//   measurementId: "G-GTKVBJWSDH"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Import Firebase functions
// firebase.js








import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAckngxHwZncRV6Q6yV0ydBc1G4QHlPi8k",
  authDomain: "react-task-7abe3.firebaseapp.com",
  projectId: "react-task-7abe3",
  storageBucket: "react-task-7abe3.appspot.com",
  messagingSenderId: "244067939850",
  appId: "1:244067939850:web:3f77e84f6549f100b891f3",
  measurementId: "G-GTKVBJWSDH"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app); // 🔹 Export Firestore
export default app;

console.log("✅ Firebase Connected:", app);



