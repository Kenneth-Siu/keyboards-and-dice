import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                authed ? (
                    <Component {...rest} {...props} />
                ) : (
                    <Redirect to={{ pathname: "/stc/login", state: { from: props.location } }} />
                )
            }
        />
    );
}
