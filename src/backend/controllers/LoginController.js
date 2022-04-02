import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: "https://www.googleapis.com/auth/userinfo.profile" }));

router.get("/google/return", passport.authenticate("google", { failureRedirect: "/stc/login" }), (req, res) => {
    res.redirect("/stc/drafts");
});

router.get("/facebook", passport.authenticate("facebook"));

router.get("/facebook/return", passport.authenticate("facebook", { failureRedirect: "/stc/login" }), (req, res) => {
    res.redirect("/stc/drafts");
});

router.get("/discord", passport.authenticate("discord"));

router.get("/discord/return", passport.authenticate("discord", { failureRedirect: "/stc/login" }), (req, res) => {
    res.redirect("/stc/drafts");
});

router.get("/github", passport.authenticate("github"));

router.get("/github/return", passport.authenticate("github", { failureRedirect: "/stc/login" }), (req, res) => {
    res.redirect("/stc/drafts");
});

export default router;
