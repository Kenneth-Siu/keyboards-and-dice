import express from "express";
import ensureLoggedIn from "../ensureLoggedIn.js";
import { NotFoundErrorName } from "../errors/NotFoundError.js";
import * as DraftService from "../services/DraftService.js";

const router = express.Router();

router.get("/", ensureLoggedIn, (req, res) => {
    DraftService.getDraftsForUser(req.user.id)
        .then((drafts) => {
            res.send(drafts);
        })
        .catch(() => {
            res.sendStatus(500);
        });
});

router.post("/", ensureLoggedIn, (req, res) => {
    DraftService.createDraft(req.user.id)
        .then(() => {
            res.sendStatus(201);
        })
        .catch(() => {
            res.sendStatus(500);
        });
});

router.put("/join/:draftId", ensureLoggedIn, (req, res) => {
    DraftService.joinDraft(req.params.draftId, req.user.id)
        .then(() => {
            res.sendStatus(201);
        })
        .catch((err) => {
            if (err.name === NotFoundErrorName) {
                res.sendStatus(404);
            } else {
                res.sendStatus(500);
            }
        });
});

export default router;
