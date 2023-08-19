import React, { useState } from "react";
import "./AddUser.css"

function AddUser(props) {

    const [addUser, setAddUser] = useState({ name: "", profileurl: "", jobs: "", gender: "" })
    const [errorMeg, setErrorMsg] = useState("")

    const HandleuserInputValues = (e) => {
        setAddUser({ ...addUser, [e.target.name]: e.target.value })
    }

    const HandleSubmitBtn = () => {
        var emptyValue = [];

        for (let x in addUser) {
            if (addUser[x] === '') {
                emptyValue.push(addUser[x])
            }
        }

        const isValidUrl = urlString => {
            try {
                return Boolean(new URL(urlString));
            }
            catch (e) {
                return false;
            }
        }

        if (emptyValue.length > 0) {
            setErrorMsg("Please fill all fields");
        } else {
            if (!isValidUrl(addUser.profileurl)) {
                addUser["profileurl"] = "https://www.shareicon.net/data/512x512/2016/09/15/829472_man_512x512.png";
            }

            const getItem = JSON.parse(localStorage.getItem("newUserData"))
            let localStorageData;

            if (!getItem) {
                localStorageData = [{ ...addUser, id: Date.now() }]
            } else {
                localStorageData = [...getItem, { ...addUser, id: Date.now() }]
            }

            localStorage.setItem("newUserData", JSON.stringify(localStorageData));
            props.history.push('/userlist')
        }
    }

    return (
        <div className="adduser-container">
            <h4>Add User</h4>
            <div className="back-btn">
                <button
                    className="adduser-buttons"
                    onClick={() => props.history.push('/userlist')}>
                    Back
                </button>
            </div>
            <div className="adduser-subcontainer">
                <div className="userdetail-flex">
                    <label htmlFor='user-name'>Name</label>
                    <input
                        type='text'
                        id="user-name"
                        name="name"
                        onChange={(e) => HandleuserInputValues(e)} />
                </div>
                <div className="userdetail-flex">
                    <label htmlFor='user-profile'>Profile image URL</label>
                    <input
                        type='text'
                        id="profile-image"
                        name="profileurl"
                        onChange={(e) => HandleuserInputValues(e)} />
                </div>
                <div className="userdetail-flex">
                    <label htmlFor='job-desc'>job</label>
                    <select name="jobs" id="job-desc" defaultValue="" onChange={(e) => HandleuserInputValues(e)}>
                        <option disabled value=""></option>
                        <option value='React Developer'>React Developer</option>
                        <option value='Angular Developer'>Angular Developer</option>
                        <option value='Cold Fusion'>Cold Fusion</option>
                        <option value='Go Lang'>Go Lang</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='gender'>Gender</label>
                    <input
                        type='radio'
                        id='gender-male'
                        name='gender'
                        value='Male'
                        onChange={(e) => HandleuserInputValues(e)}></input>
                    <label htmlFor='gender-male'>Male</label>
                    <input
                        type='radio'
                        id='gender-female'
                        name='gender'
                        value='Female'
                        onChange={(e) => HandleuserInputValues(e)}></input>
                    <label htmlFor='gender-female'>Female</label>
                </div>
                <div id="error-msg">{errorMeg}</div>
                <button className="adduser-buttons" onClick={HandleSubmitBtn}>Submit</button>
            </div>
        </div>
    )
}

export default AddUser;

