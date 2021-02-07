import App from "./pages/App.js";
import React from "react";
import { StaticRouter } from "react-router-dom";
import express from "express";
import { renderToString } from "react-dom/server";
import UserController from "./api/controllers/UserController.js";
import LoginController from "./api/controllers/LoginController.js";
import passport from "passport";
import { Strategy } from "passport-facebook";
import * as UserRepo from "./api/repositories/UserRepo";
import cookieParser from "cookie-parser";
import { urlencoded, json } from "body-parser";
import expressSession from "express-session";

passport.use(
    new Strategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: "/api/login/facebook/return",
        },
        (accessToken, refreshToken, profile, done) => {
            console.log({profile});
            UserRepo.findOrCreate(profile)
                .then((user) => {
                    console.log({user});
                    done(null, user);
                })
                .catch((err) => {
                    done(err);
                });
        }
    )
);

passport.serializeUser(function (user, done) {
    console.log({user});
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log({id});
    UserRepo.getUser(id)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => {
            done(err);
        });
});

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const app = express();

app.disable("x-powered-by");
app.use(cookieParser());
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(expressSession({ secret: process.env.EXPRESS_SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/user", UserController);
app.use("/api/login", LoginController);

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR)).get("/*", (req, res) => {
    const context = {};
    const markup = renderToString(
        <StaticRouter context={context} location={req.url}>
            <App />
        </StaticRouter>
    );

    if (context.url) {
        res.redirect(context.url);
    } else {
        res.status(200).send(
            `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ""}
        ${
            process.env.NODE_ENV === "production"
                ? `<script src="${assets.client.js}" defer></script>`
                : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
        );
    }
});

export default app;
