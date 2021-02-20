import express from "express";
import UserController from "./controllers/UserController.js";
import LoginController from "./controllers/LoginController.js";
import LogoutController from "./controllers/LogoutController.js";
import DraftController from "./controllers/DraftController.js";

const router = express.Router();

router.use("/users", UserController);
router.use("/login", LoginController);
router.use("/logout", LogoutController);
router.use("/drafts", DraftController);
router.use((req, res) => {
    res.sendStatus(404);
});

export default router;
