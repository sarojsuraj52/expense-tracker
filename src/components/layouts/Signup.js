import React, { useState } from "react";
import classes from "./Signup.module.css";
// import axios from "axios";

const Signup = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    cpassword: "",
  });
  const [passwordMatched, setPasswordMatched] = useState(true);

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
   if(input.password !== input.cpassword){
        setPasswordMatched(false)
        console.log('wrong',passwordMatched)
    }
    else{
        setPasswordMatched(true)
        signingIn()
    }
  };

  async function signingIn(){
    const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC54AeoVNHqweF0xmPJ4zAFA0N1EcBM_Gw',{
        method:'POST',
        body:JSON.stringify({
            email:input.email,
            password:input.password,
            returnSecureToken:true
        }),
        headers:{
            "Content-Type": "application/json",
            }
    })

    // const res = await axios({
    //     method:'post',
    //     url:'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC54AeoVNHqweF0xmPJ4zAFA0N1EcBM_Gw',
    //     data:{
    //         email:input.email,
    //         password:input.password,
    //         returnSecureToken:true
    //     }
    // })

    const data =  await res.json();
    console.log('data',data.error.message)
  }

 
  return (
    <div className={classes["signup-container"]}>
      <form onSubmit={submitHandler} className={classes.signup}>
        <span className={classes.heading}>Sign Up</span>
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
        <input
          type="password"
          name="cpassword"
          value={input.cpassword}
          placeholder="Confirm Password"
          onChange={onChangeHandler}
          required
        />
        {!passwordMatched &&<span className={classes.error}>Password didn't match</span>}
        <button
          type="submit"
          className={classes["signup-btn"]}
        >
          Sign Up <span>▶</span>
        </button>
        <div>
          <span>
            Have an account? <a href="#login">Login</a>{" "}
          </span>
        </div>
      </form>
    </div>
  );
};

export default React.memo(Signup);
