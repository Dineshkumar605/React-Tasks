import React, { useState } from "react";
import "../AddUser/AddUser.css";

function EditUserForm(props) {
    const [editUser, seteditUser] = useState({ name: "", profileurl: "", jobs: "", gender: "" });
    const getlocalData = JSON.parse(localStorage.getItem("newUserData"));

    const HandleuserInputValues = (e) => {
        seteditUser({ ...editUser, [e.target.name]: e.target.value });
    }

    const currentUserData = getlocalData?.filter((item) => {
        return item.id === Number(props.match.params.id);
    })

    const isValidUrl = urlString => {
        try {
            return Boolean(new URL(urlString));
        }
        catch (e) {
            return false;
        }
    }


    const HandleSubmitBtn = () => {
        let emptyFields = [];


        for (let x in editUser) {
            if (editUser[x] !== '') {
                if (editUser['profileurl'] ? !isValidUrl(editUser.profileurl) : false) {
                    editUser["profileurl"] = "https://www.shareicon.net/data/512x512/2016/09/15/829472_man_512x512.png";
                }
                var updatedData = { ...currentUserData[0], [x]: editUser[x] };
            } else {
                emptyFields.push(editUser[x]);
            }
        }


        if (emptyFields.length === 4) {
            props.history.push('/userlist');
        } else {
            const duplicateIndex = getlocalData.findIndex((item) => item.id === currentUserData[0].id);
            getlocalData.splice(duplicateIndex, 1, updatedData);
            localStorage.setItem("newUserData", JSON.stringify(getlocalData));
            props.history.push('/userlist');
        }
    }

    return (
        <div className="adduser-container">
            <h4>Edit User From</h4>
            <div className="back-btn">
                <button
                    className="adduser-buttons"
                    onClick={() => props.history.push('/userlist')}>
                    Back
                </button>
            </div>
            {currentUserData?.map((item, index) => {
                return (
                    <div key={index} className="adduser-subcontainer">
                        <div className="userdetail-flex">
                            <label htmlFor='user-name'>Name</label>
                            <input
                                type='text'
                                id="user-name"
                                name="name"
                                onChange={(e) => HandleuserInputValues(e)}
                                defaultValue={item.name} />
                        </div>
                        <div className="userdetail-flex">
                            <label htmlFor='user-profile'>Profile image URL</label>
                            <input
                                type='text'
                                id="user-profile"
                                name="profileurl"
                                onChange={(e) => HandleuserInputValues(e)}
                                defaultValue={item.profileurl} />
                        </div>
                        <div className="userdetail-flex">
                            <label htmlFor='job-desc'>job</label>
                            <select id="job-desc" name="jobs" defaultValue={item.jobs} onChange={(e) => HandleuserInputValues(e)}>
                                <option disabled value=""></option>
                                <option>React Developer</option>
                                <option>Angular Developer</option>
                                <option>Cold Fusion</option>
                                <option>Go Lang</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor='gender'>Gender</label>
                            <input
                                type='radio'
                                id='gender-male'
                                name="gender"
                                value='Male'
                                defaultChecked={item.gender === "Male" ? true : false}
                                onChange={(e) => HandleuserInputValues(e)} />
                            <label htmlFor='gender-female'>Male</label>
                            <input
                                type='radio'
                                id='gender-female'
                                name="gender"
                                value='Female'
                                defaultChecked={item.gender === "Female" ? true : false}
                                onChange={(e) => HandleuserInputValues(e)} />
                            <label htmlFor='gender-female'>Female</label>
                        </div>
                        <button className="adduser-buttons" onClick={HandleSubmitBtn}>Submit</button>
                    </div>
                )
            })}
        </div>
    )
}

export default EditUserForm;