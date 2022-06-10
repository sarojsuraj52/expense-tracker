import React, { useState,useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./Signup.module.css";
import AuthContext from "../store/auth-context";

const Signup = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    cpassword: "",
  });
  const [passwordMatched, setPasswordMatched] = useState(true);
  const [login, setLogin] = useState(true);
  const authctx = useContext(AuthContext)
  const history = useHistory()

  const toggleAuthMode = () => {
    setLogin((prevSate) => !prevSate);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let url;
    if (login) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC54AeoVNHqweF0xmPJ4zAFA0N1EcBM_Gw";
      signingIn();
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC54AeoVNHqweF0xmPJ4zAFA0N1EcBM_Gw";

      if (input.password !== input.cpassword) {
        setPasswordMatched(false);
      } else {
        setPasswordMatched(true);
        signingIn();
      }
    }

    async function signingIn() {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: input.email,
          password: input.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        authctx.login(data.idToken)
        if(login){
          history.replace('/home')
        }
        alert(`${login ? "Login" : "Sign Up"} Successful`);
        setInput({
          email: "",
          password: "",
          cpassword: "",
        });
      } else {
        let errorMsg = `${login ? "Login" : "Sign Up"} Failed`;
        if (data && data.error && data.error.message) {
          errorMsg = data.error.message;
        }
        alert(errorMsg);
      }
    }
  };

  // const res = await axios({
  //     method:'post',
  //     url:'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC54AeoVNHqweF0xmPJ4zAFA0N1EcBM_Gw',
  //     data:{
  //         email:input.email,
  //         password:input.password,
  //         returnSecureToken:true
  //     }
  // })

  return (
    <div className={classes["signup-container"]}>
      <form onSubmit={submitHandler} className={classes.signup}>
        <span className={classes.heading}>{login ? "Login" : "Sign Up"}</span>
        <input
          type="email"
          name="email"
          value={input.email}
          placeholder="Email"
          onChange={onChangeHandler}
          required
        />
        <input
          type="password"
          name="password"
          value={input.password}
          placeholder="Password"
          onChange={onChangeHandler}
          required
        />
        {!login && (
          <input
            type="password"
            name="cpassword"
            value={input.cpassword}
            placeholder="Confirm Password"
            onChange={onChangeHandler}
            required
          />
        )}
        {!passwordMatched && !login && (
          <span className={classes.error}>Password didn't match</span>
        )}
        <button type="submit" className={classes["signup-btn"]}>
          {login ? "Login" : "Sign Up"} <span>▶</span>
        </button>
        <div>
          <span>
            {login ? "Create an account" : "Have an account"}?
            <span onClick={toggleAuthMode} className={classes.loginToggle}>
              {login ? " Sign Up" : " Login"}
            </span>
          </span>
        </div>
      </form>
    </div>
  );
};

export default React.memo(Signup);
