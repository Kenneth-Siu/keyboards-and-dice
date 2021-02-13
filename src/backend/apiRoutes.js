import express from "express";
import UserController from "./controllers/UserController.js";
import LoginController from "./controllers/LoginController.js";
import LogoutController from "./controllers/LogoutController.js";

const router = express.Router();

router.use("/user", UserController);
router.use("/login", LoginController);
router.use("/logout", LogoutController);

export default router;
