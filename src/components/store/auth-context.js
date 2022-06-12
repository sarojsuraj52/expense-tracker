import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  email:'',
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('userToken')
    const [token,setToken] = useState(initialToken)
    const initialEmail = localStorage.getItem('userEmail')
    const [email,setEmail] = useState(initialEmail)
    const userIsLoggedIn = !!token;

    const loginHandler = (tk,email)=>{
        setToken(tk)
        setEmail(email)
        localStorage.setItem('userToken',tk)
        localStorage.setItem('userEmail',email)
    }
    const logoutHandler = ()=>{
        setToken(null)
        localStorage.removeItem('userToken')
        setEmail(null)
        localStorage.removeItem('userEmail')
    }


  const contextValue = {
    token: token,
    email:email,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return <AuthContext.Provider value={contextValue}>
    {props.children}
  </AuthContext.Provider>

};

export default AuthContext
