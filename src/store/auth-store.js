import { useEffect, useState } from "react";
import React from "react";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext({
  idToken: "",
  logInFn: () => {},
  logOutFn: () => {},
});

export default AuthContext;

export const AuthProvider = (props) => {
  const history = useHistory();
  const [idToken, setIdToken] = useState("");
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
      localStorage.setItem("idToken", respId);
    } catch (err) {
      alert(err);
    }
  };
  const logOutFn = () => {
    setIdToken("");
    localStorage.clear("idToken");
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
  };

  return (
    <AuthContext.Provider value={AuthObject}>
      {props.children}
    </AuthContext.Provider>
  );
};
