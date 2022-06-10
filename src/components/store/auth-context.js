import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('userToken')
    const [token,setToken] = useState(initialToken)
    const userIsLoggedIn = !!token;

    const loginHandler = (tk)=>{
        setToken(tk)
        localStorage.setItem('userToken',tk)
    }
    const logoutHandler = (token)=>{
        setToken(null)
        localStorage.removeItem('userToken')
    }


  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return <AuthContext.Provider value={contextValue}>
    {props.children}
  </AuthContext.Provider>

};

export default AuthContext
