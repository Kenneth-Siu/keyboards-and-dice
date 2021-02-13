import express from "express";
import UserController from "./controllers/UserController.js";
import LoginController from "./controllers/LoginController.js";
import LogoutController from "./controllers/LogoutController.js";
import DraftController from "./controllers/DraftController.js";

const router = express.Router();

router.use("/user", UserController);
router.use("/login", LoginController);
router.use("/logout", LogoutController);
router.use("/draft", DraftController);

export default router;
