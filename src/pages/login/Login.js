import React from "react";
import "./Login.scss";

export default function Login() {
    return (
        <>
            <title>Log In · Terra 2170</title>
            <main className="login-page">
                <h1>Log In</h1>
                <p><a href="/api/login/facebook">Login with Facebook</a></p>
                <p>
                    The only personal information I store is your display name as generated by the service provider you
                    choose to log in with. Your display name is only used to identify yourself to the people in the
                    draft sessions you take part in. By logging in, you give your consent for this information to be
                    used in this way.
                </p>
                <p>
                    If you want me to delete your data (for whatever reason), just let me know. I'll have a proper
                    non-personal email address at some point...
                </p>
            </main>
        </>
    );
}
