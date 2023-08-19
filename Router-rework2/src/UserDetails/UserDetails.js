import React from "react"
import "./UserDetails.css"

function UserDetails(props) {
    const getlocalData = JSON.parse(localStorage.getItem("newUserData"))

    const currentUserData = getlocalData.filter((item) => {
        return item.id === Number(props.match.params.id)
    })

    return (
        <div className="userdetail-container">
            <h4>User Details</h4>
            <div className="backbtn-userdetails">
                <button id="back-button" onClick={() => props.history.push('/userlist')}>Back</button>
            </div>
            {currentUserData.length !== 0 ? currentUserData.map((item, index) => {
                return (
                    <div key={index} className="user-details">
                        <div className="userdetail-box">
                            <h4 className="textalign-userdetail">{item.name}</h4>
                            <p className="textalign-userdetail">ID : {item.id}</p>
                            <p className="textalign-userdetail">{item.jobs}</p>
                            <p className="textalign-userdetail">{item.name} is {item.jobs}</p>
                        </div>
                        <div>
                            <img id="userdetail-img" src={item.profileurl} alt="profile" />
                        </div>
                    </div>
                )
            }) :
                <div className="no-users-msg"> No users found here! </div>}
        </div>
    )
}

export default UserDetails;