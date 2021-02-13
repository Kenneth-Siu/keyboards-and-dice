import express from "express";
import * as UserRepo from "../repositories/UserRepo.js";

const router = express.Router();

router.get("/", (req, res) => {
    UserRepo.getUser(1)
        .then((user) => {
            res.send(user);
        })
        .catch((error) => {
            res.sendStatus(500);
        });
});

export default router;
