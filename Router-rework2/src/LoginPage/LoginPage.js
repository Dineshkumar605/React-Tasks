import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";

function LoginPage(props) {

  const [errorMsg, setErrorMsg] = useState("");
  const [userLoginData, setuserLoginData] = useState({ emailid: "", password: "" });

  const HandleOnChange = (e) => setuserLoginData({ ...userLoginData, [e.target.name]: e.target.value });

  const HandleLogin = () => {
    const data = localStorage.getItem("userRegisterData");
    const registerData = JSON.parse(data);
    const checkEmail = registerData?.find((value) => value.emailid === userLoginData.emailid);

    if (userLoginData.emailid === '' || userLoginData.password === '') {
      setErrorMsg("Please fill all fields")
    } else if (!checkEmail) {
      setErrorMsg("Email is not found");
    } else if (checkEmail.password !== userLoginData.password) {
      setErrorMsg("Password is incorrect");
    } else {
      const { emailid, password } = checkEmail;
      localStorage.setItem("loginUserData", JSON.stringify([{ emailid, password }]));
      props.history.push("/home");
    }
  }

  return (
    <div className="container">
      <h2>Login User</h2>
      <div className="login-container">
        <img
          id="profile"
          src="https://www.shareicon.net/data/512x512/2016/09/15/829472_man_512x512.png"
          alt="profile" />
        <div className="login-data-field">
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            id="email"
            name="emailid"
            placeholder="Enter Email Address"
            onChange={(e) => HandleOnChange(e)} />
        </div>
        <div className="login-data-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            onChange={(e) => HandleOnChange(e)} />
        </div>
        <div className="error-msg">{errorMsg}</div>
        <div>
          <button id="login-btn" onClick={HandleLogin}>Login</button>
        </div>
        <p>Don't have an account?<Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}

export default LoginPage;