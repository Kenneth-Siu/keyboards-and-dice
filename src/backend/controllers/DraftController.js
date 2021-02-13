import express from "express";
import ensureLoggedIn from "../ensureLoggedIn.js";

const router = express.Router();

router.get("/", ensureLoggedIn, (req, res) => {
    console.log(req.user);
    res.send("Hello world!");
});

export default router;
