import express from "express";
import UserController from "./api/controllers/UserController.js";
import LoginController from "./api/controllers/LoginController.js";

const router = express.Router();

router.use("/user", UserController);
router.use("/login", LoginController);

export default router;
