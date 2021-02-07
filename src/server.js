import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import { urlencoded, json } from "body-parser";
import expressSession from "express-session";
import apiRoutes from "./apiRoutes.js";
import renderingRoutes from "./renderingRoutes.js";
import configurePassport from "./passportConfig";

configurePassport();

const app = express();
app.disable("x-powered-by");
app.use(cookieParser());
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(expressSession({ secret: process.env.EXPRESS_SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", apiRoutes);
app.use(express.static(process.env.RAZZLE_PUBLIC_DIR));
app.use("/", renderingRoutes);

export default app;
