import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        setIsAuth(true);
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to sign in:", error);
      });
  };

  return (
    <div className="loginPage">
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Login with Google
      </button>
    </div>
  );
}

export default Login;
