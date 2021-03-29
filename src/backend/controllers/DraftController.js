import express from "express";
import ensureLoggedIn from "../ensureLoggedIn.js";
import { DraftLimitReachedErrorName } from "../errors/DraftLimitReachedError.js";
import { NotFoundErrorName } from "../errors/NotFoundError.js";
import { OwnerCantLeaveErrorName } from "../errors/OwnerCantLeaveError.js";
import * as DraftService from "../services/DraftService.js";

const router = express.Router();

router.get("/", ensureLoggedIn, (req, res) => {
    DraftService.getDraftsForUser(req.user.id)
        .then((drafts) => {
            res.send(drafts);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.get("/:draftId", ensureLoggedIn, (req, res) => {
    DraftService.getDraft(req.params.draftId, req.user.id)
        .then((draft) => {
            res.send(draft);
        })
        .catch((err) => {
            if (err.name === NotFoundErrorName) {
                res.sendStatus(404);
            } else {
                console.log(err);
                res.sendStatus(500);
            }
        });
});

router.get("/:draftId/booster", ensureLoggedIn, (req, res) => {
    DraftService.getBooster(req.params.draftId, req.user.id)
        .then((booster) => {
            res.send(booster);
        })
        .catch((err) => {
            if (err.name === NotFoundErrorName) {
                res.sendStatus(404);
            } else {
                console.log(err);
                res.sendStatus(500);
            }
        });
});

router.get("/:draftId/picks", ensureLoggedIn, (req, res) => {
    DraftService.getPicks(req.params.draftId, req.user.id)
        .then((picks) => res.send(picks))
        .catch((err) => {
            if (err.name === NotFoundErrorName) {
                res.sendStatus(404);
            } else {
                console.log(err);
                res.sendStatus(500);
            }
        });
});

router.post("/", ensureLoggedIn, (req, res) => {
    DraftService.createDraft(req.user.id)
        .then((draftId) => {
            res.send({ draftId });
        })
        .catch((err) => {
            if (err.name === DraftLimitReachedErrorName) {
                res.status(400).send(err.message);
            } else {
                console.log(err);
                res.sendStatus(500);
            }
        });
});

router.put("/:draftId/join", ensureLoggedIn, (req, res) => {
    DraftService.joinDraft(req.params.draftId, req.user.id)
        .then(() => {
            res.sendStatus(201);
        })
        .catch((err) => {
            if (err.name === DraftLimitReachedErrorName) {
                res.status(400).send(err.message);
            } else if (err.name === NotFoundErrorName) {
                res.status(404).send(err.message);
            } else {
                console.log(err);
                res.sendStatus(500);
            }
        });
});

router.put("/:draftId/leave", ensureLoggedIn, (req, res) => {
    DraftService.leaveDraft(req.params.draftId, req.user.id)
        .then(() => {
            res.sendStatus(201);
        })
        .catch((err) => {
            if (err.name === OwnerCantLeaveErrorName) {
                res.status(403).send(err.message);
            } else if (err.name === NotFoundErrorName) {
                res.status(404).send(err.message);
            } else {
                console.log(err);
                res.sendStatus(500);
            }
        });
});

router.post("/:draftId/start", ensureLoggedIn, (req, res) => {
    DraftService.startDraft(req.params.draftId, req.user.id)
        .then(() => {
            res.sendStatus(201);
        })
        .catch((err) => {
            if (err.name === NotFoundErrorName) {
                res.status(404).send(err.message);
            } else {
                console.log(err);
                res.sendStatus(500);
            }
        });
});

router.post("/:draftId/pick", ensureLoggedIn, (req, res) => {
    if (!req.body || !req.body.pickNumber || !Number.isInteger(req.body.cardId)) {
        res.sendStatus(400);
        return;
    }
    DraftService.makePick(req.params.draftId, req.user.id, req.body.pickNumber, req.body.cardId)
        .then(() => {
            res.sendStatus(201);
        })
        .catch((err) => {
            if (err.name === NotFoundErrorName) {
                res.status(404).send(err.message);
            } else {
                console.log(err);
                res.sendStatus(500);
            }
        });
});

router.delete("/:draftId", ensureLoggedIn, (req, res) => {
    DraftService.deleteDraft(req.params.draftId, req.user.id)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            if (err.name === NotFoundErrorName) {
                res.status(404).send(err.message);
            } else {
                console.log(err);
                res.sendStatus(500);
            }
        });
});

export default router;
