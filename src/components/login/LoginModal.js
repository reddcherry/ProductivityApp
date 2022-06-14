import { useState, useRef, useContext } from "react";
import Card from "../UI/Card";
import classes from "./LoginModal.module.css";
import AuthContext from "../../store/auth-store";

const LoginModal = (props) => {
  const [userWantsSignin, setUserWantsSignin] = useState(true);
  const [passIsValid, setPassIsValid] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);

  const authCtx = useContext(AuthContext);

  const passRef = useRef();
  const confirmRef = useRef();
  const emailRef = useRef();

  const ChangeAuthHandler = (e) => {
    e.preventDefault();
    setEmailIsValid(true);
    setPassIsValid(true);
    setPasswordsMatch(true);
    setUserWantsSignin((prevState) => !prevState);
  };

  const formSubmitHandler = async (e) => {
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passRef.current.value;
    e.preventDefault();
    setEmailIsValid(true);
    setPassIsValid(true);
    setPasswordsMatch(true);
    if (!enteredEmail.includes("@") || !enteredEmail.includes("@")) {
      setEmailIsValid(false);
    }
    if (enteredPassword.length < 6) {
      setPassIsValid(false);
      return;
    }
    if (!userWantsSignin && enteredPassword !== confirmRef.current.value) {
      setPasswordsMatch(false);
      return;
    }
    authCtx.logInFn(enteredEmail, enteredPassword, userWantsSignin);
  };

  return (
    <section className={classes.backdrop}>
      <div className={classes.modal}>
        <Card>
          <form onSubmit={formSubmitHandler}>
            <h1>{userWantsSignin ? "Login" : "Sign Up"}</h1>
            {!emailIsValid && (
              <p style={{ color: "rgb(208, 52, 44)" }}>
                Please enter a valid Email!
              </p>
            )}
            {!passIsValid && (
              <p style={{ color: "rgb(208, 52, 44)" }}>
                Password must be at Least 6 digits!
              </p>
            )}
            {!passwordsMatch && (
              <p style={{ color: "rgb(208, 52, 44)" }}>
                Passwords did not match!
              </p>
            )}
            <div className={classes.control}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" ref={emailRef} />
            </div>
            <br />
            <div className={classes.control}>
              <label htmlFor="password"> password</label>
              <input id="password" type="password" ref={passRef} />
            </div>
            <br />
            {userWantsSignin ? (
              ""
            ) : (
              <div className={classes.control}>
                <label htmlFor="password"> Confirm Password</label>
                <input id="password" type="password" ref={confirmRef} />
              </div>
            )}
            <br />
            <button className={"btn " + classes.btn}>
              {userWantsSignin ? "Login" : "Sign Up"}
            </button>
            <br />
            <p>{userWantsSignin ? "New Here?" : "Have an Account?"}</p>
            <button onClick={ChangeAuthHandler} className="btn">
              {userWantsSignin ? `Sign Up` : "Login"}
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default LoginModal;
