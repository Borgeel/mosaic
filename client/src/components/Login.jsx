import React from "react";
import "./Login.css";

import Google from "../utils/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Login = () => {
  const clientId = process.env.REACT_APP_GOOGLE_API_CLIENT_ID;
  console.log(clientId);

  return (
    <>
      <form action="action_page.php" method="post">
        <div className="imgcontainer"></div>

        <div className="container">
          <label htmlFor="uname">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            required
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
          />

          <GoogleOAuthProvider clientId={clientId}>
            <Google />
          </GoogleOAuthProvider>

          <button type="submit">Login</button>

          <label>
            <input type="checkbox" checked="checked" name="remember" /> Remember
            me
          </label>
        </div>

        <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
          <button type="button" className="cancelbtn">
            Cancel
          </button>
          <span className="psw">{/* Forgot <a href="#">password?</a> */}</span>
        </div>
      </form>
    </>
  );
};

export default Login;
