import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/facebook", passport.authenticate("facebook"));

router.get("/facebook/return", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
    res.redirect("/draft");
});

export default router;
