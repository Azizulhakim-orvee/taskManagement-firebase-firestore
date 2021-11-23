import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";


import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyA7nN6I76Rav-id74h1YvyRpQNuIqjTQ54",
  authDomain: "task-management-1ca04.firebaseapp.com",
  projectId: "task-management-1ca04",
  storageBucket: "task-management-1ca04.appspot.com",
  messagingSenderId: "849016976163",
  appId: "1:849016976163:web:b48e4200007be5386ad296",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = (email, password) => {
  return signOut(auth);
};



