import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyACoK4MatMyD1ML5Y8vjRgAvL3Pr6tjpno",
    authDomain: "healthzone-india-dd2cd.firebaseapp.com",
    databaseURL: "https://healthzone-india-dd2cd-default-rtdb.firebaseio.com",
    projectId: "healthzone-india-dd2cd",
    storageBucket: "healthzone-india-dd2cd.firebasestorage.app",
    messagingSenderId: "564335157599",
    appId: "1:564335157599:web:499a55a6d7559abaf4d6ea",
    measurementId: "G-Y8S8D8S1YR"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Login Function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in", error);
  }
};

// Logout Function
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out", error);
  }
};
