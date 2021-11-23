import React, { useEffect, useRef, useState } from "react";
import { CircleLoader, GridLoader } from "react-spinners";

import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../firebase.config";
import { SessionState } from "../Context";

const SignIn = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const { setLoading } = SessionState();

  const [error, setError] = useState("");
  const [click, setClick] = useState(false);

  useEffect(() => {
    const errorClean = () => {
      return setError("");
    };
    errorClean();
  }, [click]);

  const cleanUp = () => {
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      const name = emailRef.current.value;
      const profilePic =
        "https://www.vhv.rs/dpng/d/520-5206228_cartoon-avatar-transparent-background-png-cartoon-male-avatar.png";
      localStorage.setItem("name", name);
      localStorage.setItem("profilePic", profilePic);
      navigate("/tasks");
    } catch (err) {
      setLoading(true);
      setError(err.message + " Try again");
      cleanUp();
      setLoading(false);
    }
  };
  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signIn(emailRef.current.value, passwordRef.current.value);
      const name = emailRef.current.value;
      const profilePic =
        "https://www.vhv.rs/dpng/d/520-5206228_cartoon-avatar-transparent-background-png-cartoon-male-avatar.png";
      localStorage.setItem("name", name);
      localStorage.setItem("profilePic", profilePic);
      navigate("/tasks");
    } catch (err) {
      setLoading(true);
      setError(err.message + " Try again");
      console.log(err);
      cleanUp();
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-10">
        <input
          ref={emailRef}
          placeholder="Email"
          type="email"
          onFocus={() => setClick(!click)}
          className="border-gray-300 focus:ring-black focus:border-gray-400 rounded-md mr-2 text-center focus:scale-105 transform transition-all"
        />

        <input
          ref={passwordRef}
          placeholder="Password"
          type="password"
          onFocus={() => setClick(!click)}
          className="border-gray-300 focus:ring-black focus:border-gray-400 rounded-md text-center focus:scale-105 transform transition-all"
        />
      </div>

      <div className="flex flex-col mt-10 gap-4">
        <button
          className="bg-green-200 p-1 rounded hover:bg-green-600 hover:text-white ml-4
         hover:scale-110 transform transition-all text-yellow-900"
          onClick={handleSignIn}
        >
          Sign In
          <svg
            className="w-4 h-4 ml-4 inline-block mr-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
        </button>

        <button
          onClick={handleSignUp}
          className="bg-red-200 p-1 rounded hover:bg-red-600 hover:text-white ml-4 hover:scale-110 transform transition-all text-yellow-900"
        >
          Sign Up
          <svg
            className="w-4 h-4 ml-4 inline-block mr-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>

      {
        <div
          className={`mt-20 border bg-red-500 text-white animate-pulse text-lg`}
        >
          {error}
        </div>
      }
    </div>
  );
};

export default SignIn;
