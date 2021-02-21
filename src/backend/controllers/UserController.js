import express from "express";
import * as UserRepo from "../repositories/UserRepo.js";

const router = express.Router();

router.get("/", (req, res) => {
    UserRepo.find(1)
        .then((user) => {
            res.send(user);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

export default router;
