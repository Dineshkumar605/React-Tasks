import React from "react";
import "./HomePage.css";

function HomePage(props) {

    const handleLogout = () => {
        localStorage.removeItem("loginUserData");
        props.history.push("/");
    }

    const localData = JSON.parse(localStorage.getItem("newUserData"));
    const mensCount = localData?.filter((item) => item?.gender === "Male");
    const femaleCount = localData?.filter((item) => item?.gender === "Female");
    const reactDevCount = localData?.filter((item) => item?.jobs === "React Developer");
    const angularDevCount = localData?.filter((item) => item?.jobs === "Angular Developer");
    const coldFusionDevCount = localData?.filter((item) => item?.jobs === "Cold Fusion");
    const golangDevCount = localData?.filter((item) => item?.jobs === "Go Lang");

    return (
        <div className="home-container">
            <h3>Members Count</h3>
            <div className="home-top-buttons">
                <button id="logout-btn" onClick={handleLogout}>Logout</button>
                <button id="userlist-btn" onClick={() => props.history.push("/userlist")}>User List</button>
            </div>
            <div className="home-subcontainer">
                <div className="total-count">
                    <h4 className="homepage-title">Total user count</h4>
                    <div>{!localData?.length ? 0 : localData?.length}</div>
                </div>
                <div className="gender-count">
                    <div className="gender-count-field">
                        <h4 className="homepage-title">Mens Count</h4>
                        <div>{!mensCount?.length ? 0 : mensCount?.length}</div>
                    </div>
                    <div className="gender-count-field">
                        <h4 className="homepage-title">Womens Count</h4>
                        <div>{!femaleCount?.length ? 0 : femaleCount?.length}</div>
                    </div>
                </div>
                <div className="domin-count">
                    <div className="domin-count-field">
                        <h4 className="homepage-title">React</h4>
                        <div>{!reactDevCount?.length ? 0 : reactDevCount?.length}</div>
                    </div>
                    <div className="domin-count-field">
                        <h4 className="homepage-title">Angular</h4>
                        <div>{!angularDevCount?.length ? 0 : angularDevCount?.length}</div>
                    </div>
                    <div className="domin-count-field">
                        <h4 className="homepage-title">Cold Fusion</h4>
                        <div>{!coldFusionDevCount?.length ? 0 : coldFusionDevCount?.length}</div>
                    </div>
                    <div className="domin-count-field">
                        <h4 className="homepage-title">Go Lang</h4>
                        <div>{!golangDevCount?.length ? 0 : golangDevCount?.length}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;