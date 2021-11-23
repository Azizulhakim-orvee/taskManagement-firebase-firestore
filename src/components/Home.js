import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { auth } from "../firebase.config";
import { useNavigate } from "react-router-dom";

import SignIn from "./SignIn";
import { CircleLoader } from "react-spinners";
import { SessionState } from "../Context";

const Home = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const { setLoading, loading } = SessionState();


  const singInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const name = result.user.displayName;
      const profilePic = result.user.photoURL;
      localStorage.setItem("name", name);
      localStorage.setItem("profilePic", profilePic);
      navigate("/tasks");
    } catch (err) {
      setLoading(true);
      console.log(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 gap-8 font-caveat flex-col text-center flex items-center h-screen justify-center">
      <h1 className="text-yellow-500 text-6xl">
        Task management App with firestore database
      </h1>
      <div className="mb-10">{loading && <CircleLoader />}</div>
      <GoogleButton onClick={singInWithGoogle} />

      <SignIn />
    </div>
  );
};

export default Home;
