import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: "https://www.googleapis.com/auth/userinfo.profile" }));

router.get("/google/return", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
    res.redirect("/terra/drafts");
});

router.get("/facebook", passport.authenticate("facebook"));

router.get("/facebook/return", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
    res.redirect("/terra/drafts");
});

router.get("/github", passport.authenticate("github"));

router.get("/github/return", passport.authenticate("github", { failureRedirect: "/login" }), (req, res) => {
    res.redirect("/terra/drafts");
});

export default router;
