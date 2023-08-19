import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const loginUserData = JSON.parse(localStorage.getItem("loginUserData"));
    return (
        <Route {...rest} render={(props) => (
            loginUserData === null ?
                <Redirect to='/' /> :
                <Component {...props} />
        )} />
    )
}

export default PrivateRoute;