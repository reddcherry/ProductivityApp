import { useEffect, useState } from "react";
import React from "react";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext({
  idToken: "",
  logInFn: () => {},
  logOutFn: () => {},
  email:""
});

export default AuthContext;

export const AuthProvider = (props) => {
  const [idToken, setIdToken] = useState("");
  const[email, setEmail] = useState("");
  const logInFn = async (email, password, userWantsSignin) => {
    const KEY = "AIzaSyCR3Dl9QN8gQlfO5tdmxhvzIW4D81dm3uk";
    const url = userWantsSignin
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`;

    try {
      const resp = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await resp.json();
      if (data.error) {
        throw new Error(data.error.message);
      }
      const respId = data.idToken;
      setIdToken(respId);
      setEmail(data.email)
      localStorage.setItem("idToken", respId);
      localStorage.setItem("email", data.email)
    } catch (err) {
      alert(err);
    }
  };
  const logOutFn = () => {
    setIdToken("");
    localStorage.clear("idToken");
    localStorage.clear("email")
  };

  useEffect(() => {
    // localStorage.setItem("path", window.location.pathname);
    const localId = localStorage.getItem("idToken");
    localId && setIdToken(localId);

  }, []);

  const AuthObject = {
    idToken: idToken,
    logInFn,
    logOutFn,
    email
  };

  return (
    <AuthContext.Provider value={AuthObject}>
      {props.children}
    </AuthContext.Provider>
  );
};
