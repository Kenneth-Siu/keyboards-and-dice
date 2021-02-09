import App from "./pages/App.js";
import React from "react";
import express from "express";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const router = express.Router();

router.get("*", (req, res) => {
    const context = {};
    const userDisplayName = (req.user && req.user.display_name) || "";
    const markup = renderToString(
        <StaticRouter context={context} location={req.url}>
            <App userDisplayName={userDisplayName} />
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
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">
        ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ""}
        ${
            process.env.NODE_ENV === "production"
                ? `<script src="${assets.client.js}" user-display-name="${userDisplayName}" defer></script>`
                : `<script src="${assets.client.js}" user-display-name="${userDisplayName}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
        );
    }
});

export default router;
