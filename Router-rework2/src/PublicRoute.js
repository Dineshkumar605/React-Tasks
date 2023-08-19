import React from "react";
import { Route, Redirect } from "react-router-dom";

const PubilcRoute = ({ component: Component, ...rest }) => {
    const loginUserData = JSON.parse(localStorage.getItem("loginUserData"));
    return (
        <Route {...rest} render={(props) => (
            loginUserData === null ?
                <Component {...props} /> :
                <Redirect to='/home' />
        )} />
    )
}

export default PubilcRoute;