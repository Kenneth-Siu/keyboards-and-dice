import express from "express";
import UserController from "./api/controllers/UserController.js";
import LoginController from "./api/controllers/LoginController.js";
import LogoutController from "./api/controllers/LogoutController.js";

const router = express.Router();

router.use("/user", UserController);
router.use("/login", LoginController);
router.use("/logout", LogoutController);

export default router;
