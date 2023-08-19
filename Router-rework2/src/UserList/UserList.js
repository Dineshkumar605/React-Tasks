import React, { useState } from "react";
import "./UserList.css";

function UserList(props) {

    const getlocalData = JSON.parse(localStorage.getItem("newUserData"));
    const [localdata, setLocalData] = useState(getlocalData);
    const handleaddLogoutBtn = () => {
        localStorage.removeItem("loginUserData");
        props.history.push("/");
    }

    const handleDeleteBtn = (id) => {
        let tempData = [...localdata];

        const filterData = tempData?.filter((item) => {
            return item?.id === id
        })

        const removedvalueIndex = tempData.findIndex((item) => item?.id === filterData[0]?.id);
        tempData.splice(removedvalueIndex, 1);
        localStorage.setItem("newUserData", JSON.stringify(tempData))
        setLocalData(tempData);
    }

    return (
        <div className="list-container">
            <h2>User List</h2>
            <div className="top-btn-field">
                <button id="back-btn" onClick={() => props.history.push("/home")}>Back</button>
                <button id="adduser-btn" onClick={() => props.history.push('/adduser')}>Add User</button>
            </div>
            <div className="user-data-area">
                {localdata?.length !== 0 ? localdata?.map((item, index) => {
                    return (
                        <div key={index} className="signle-user-data-field">
                            <img
                                id='userlist-pic'
                                src={item?.profileurl}
                                alt="profile"
                                onClick={() => props.history.push(`/userdetails/${item.id}`)} />
                            <div className="user-data-field">
                                <h4 className="username-listpage">{item?.name}</h4>
                                <p className="domain-name">{item?.jobs}</p>
                            </div>
                            <div className="edit-btn-field">
                                <button id="edit-btn" onClick={() => props.history.push(`/usereditform/${item.id}`)}>Edit</button>
                                <button id="delete-btn" onClick={() => handleDeleteBtn(item?.id)}>Delete</button>
                            </div>
                        </div>

                    )
                }) :
                    <div className="no-users-msg"> No users found here! </div>}
            </div>
            <div className="bottom-btn-field">
                <button id="logout-btn" onClick={handleaddLogoutBtn}>Logout</button>
            </div>
        </div>
    )
}

export default UserList;