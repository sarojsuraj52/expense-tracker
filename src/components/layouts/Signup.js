import React, { useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
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
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const authctx = useContext(AuthContext);
  // const history = useHistory();

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

  const forgotPasswordHandler = (event) => {
    event.preventDefault();
    setIsForgotPassword((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let url;
    if (isForgotPassword) {
      url='https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC54AeoVNHqweF0xmPJ4zAFA0N1EcBM_Gw'
      signingIn()
    } else {
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
    }

    async function signingIn() {
      let res;
      if(isForgotPassword){
        res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
              email: input.email,
              requestType:"PASSWORD_RESET"
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      else{
        res = await fetch(url, {
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
      }
      const data = await res.json();
      if (res.ok) {
        if(login){
          authctx.login(data.idToken);
        }
        
        if(isForgotPassword){
          alert('Check you email')
        }
        else{
          alert(`${login ? "Login" : "Sign Up"} Successful`);
        }
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
        {isForgotPassword && <p>Enter the registered email</p>}
        <input
          type="email"
          name="email"
          value={input.email}
          placeholder="Email"
          onChange={onChangeHandler}
          required
        />
        {!isForgotPassword && (
          <input
            type="password"
            name="password"
            value={input.password}
            placeholder="Password"
            onChange={onChangeHandler}
            required
          />
        )}
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
        {login && (
          <button
            onClick={forgotPasswordHandler}
            className={classes["forgot-btn"]}
          >
            {!isForgotPassword ? "Forgot password?" : "Login with existing"}
          </button>
        )}
        <button type="submit" className={classes["signup-btn"]}>
          {isForgotPassword && "Send Link "}
          {!isForgotPassword && `${login ? "Login " : "Sign Up "}`}
          <span>▶</span>
        </button>
        <div>
          {!isForgotPassword && (
            <span>
              {login ? "Create an account" : "Have an account"}?
              <span onClick={toggleAuthMode} className={classes.loginToggle}>
                {login ? " Sign Up" : " Login"}
              </span>
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default React.memo(Signup);
