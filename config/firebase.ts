import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVDhf6QmKbFdWhM-1wGMGCnKxf4XWQjWg",
  authDomain: "kanban-3834a.firebaseapp.com",
  projectId: "kanban-3834a",
  storageBucket: "kanban-3834a.appspot.com",
  messagingSenderId: "1027396522153",
  appId: "1:1027396522153:web:ee7d73e82115ca065199b8",
  measurementId: "G-2GJER6EVNX",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });
// githubProvider.setCustomParameters({ prompt: "select_account" });
