import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import { urlencoded, json } from "body-parser";
import expressSession from "express-session";
import connectPgSimple from "connect-pg-simple";
import apiRoutes from "./backend/apiRoutes.js";
import renderingRoutes from "./backend/renderingRoutes.js";
import configurePassport from "./backend/passportConfig.js";
import pool from "./backend/repositories/pool.js";

configurePassport();

const app = express();
app.disable("x-powered-by");
app.use(cookieParser());
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        store: new (connectPgSimple(expressSession))({ pool: pool }),
        secret: process.env.EXPRESS_SESSION_SECRET,
        cookie: { maxAge: 40 * 24 * 60 * 60 * 1000 }, // 40 days
    })
);
app.use(passport.initialize());
app.use((err, req, res, next) => {
    if (err) {
        req.logout();
        if (!req.originalUrl === "/terra/login") {
            next();
        } else {
            res.redirect("/terra/login");
        }
    } else {
        next();
    }
})
app.use(passport.session());
app.use("/api", apiRoutes);
app.use(express.static(process.env.RAZZLE_PUBLIC_DIR));
app.use("/", renderingRoutes);

export default app;
