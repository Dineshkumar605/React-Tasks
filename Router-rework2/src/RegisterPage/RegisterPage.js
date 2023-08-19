import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./registerPage.css";

function RegisterPage(props) {

    const [register, setRegister] = useState([]);
    const [data, setData] = useState({ firstname: "", lastname: "", emailid: "", password: "" });
    const [errorMsg, setErrorMsg] = useState("");

    const HandleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const HandleRegisterBtn = () => {

        const checkEmail = /^\S+@\S{2,}\.\S{2,}$/;
        const getItem = JSON.parse(localStorage.getItem("userRegisterData"));
        const duplicateEmail = getItem?.find((value) => value.emailid === data.emailid);

        if (!data.firstname || !data.lastname || !data.emailid || !data.password) {
            setErrorMsg("Please fill all fields")
        } else if (checkEmail.test(data.emailid) === false) {
            setErrorMsg("Please enter the vaild email");
        } else if (data.password.length < 6) {
            setErrorMsg("Please enter password length more than 6 characters");
        } else if (duplicateEmail) {
            setErrorMsg("Email is already exists");
        } else {

            setErrorMsg("");
            let localStorageData;

            if (!getItem) {
                localStorageData = [...register, data];
                setRegister([...register, data]);
            } else {
                localStorageData = [...getItem, data];
                setRegister([...getItem, data]);
            }

            localStorage.setItem("userRegisterData", JSON.stringify(localStorageData));
            props.history.push("/");
        }

    }

    return (
        <div className="register-container">
            <h2>Register User</h2>
            <div className="register-sub-container">
                <img
                    id="profile"
                    src="https://www.shareicon.net/data/512x512/2016/09/15/829472_man_512x512.png"
                    alt="profile" />
                <div className="register-data-field">
                    <label htmlFor='first-name'>First Name</label>
                    <input
                        type="input"
                        id="first-name"
                        name="firstname"
                        placeholder="Enter First Name"
                        onChange={(e) => HandleOnChange(e)} />
                </div>
                <div className="register-data-field">
                    <label htmlFor='last-name'>Last Name</label>
                    <input
                        type="text"
                        id="last-name"
                        name="lastname"
                        placeholder="Enter Last Name"
                        onChange={(e) => HandleOnChange(e)} />
                </div>
                <div className="register-data-field">
                    <label htmlFor='email'>Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="emailid"
                        placeholder="Enter Email Address"
                        onChange={(e) => HandleOnChange(e)} />
                </div>
                <div className="register-data-field">
                    <label htmlFor='password'>Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        onChange={(e) => HandleOnChange(e)}></input>
                </div>
                <div className="error-msg">{errorMsg}</div>
                <button id="submit-btn" onClick={HandleRegisterBtn}>Register</button>
                <p className="check-user">Already have an account?<Link to="/">Login</Link></p>
            </div>
        </div>
    )
}

export default RegisterPage;

