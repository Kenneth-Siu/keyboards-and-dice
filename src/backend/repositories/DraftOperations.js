import pool from "./pool.js";
import { Player } from "../models/Player.js";
import { CARDS_IN_PACK, DEFAULT_PLAYERS_IN_DRAFT, DRAFT_STATUSES } from "../../config.js";
import { flatMap, sampleSize, shuffle } from "lodash";
import { Card } from "../models/Card.js";
import { Booster } from "../models/Booster.js";
import { getBooster } from "../helpers/DraftHelpers.js";
import { Draft } from "../models/Draft.js";
import { Bot } from "../helpers/bot/Bot.js";
import { Pick } from "../models/Pick.js";
import { BOT_USER_IDS } from "../config.js";

export class DraftOperations {
    async startDraft(draftId) {
        this.client = await pool.connect();
        try {
            await this.client.query("BEGIN");

            const humanPlayers = await this.getHumanPlayers(draftId);
            const botPlayers = await this.createAndGetBotPlayers(
                DEFAULT_PLAYERS_IN_DRAFT - humanPlayers.length,
                draftId
            );

            const playerIds = shuffle([
                ...botPlayers.map((player) => player.id),
                ...humanPlayers.map((player) => player.id),
            ]);

            await this.assignSeatNumbers(playerIds);
            await this.setDraftToInProgress(draftId);
            const boosters = await this.createAndGetBoosters(playerIds);
            await this.createCards(boosters.map((booster) => booster.id));

            await this.makeBotPicks(draftId);

            await this.client.query("COMMIT");
        } catch (error) {
            await this.client.query("ROLLBACK");
            throw error;
        } finally {
            this.client.release();
        }
    }

    async makePick(draftId, playerId, booster, card) {
        this.client = await pool.connect();
        try {
            await this.client.query("BEGIN");

            await this.pickOperations(draftId, playerId, booster, card);

            await this.client.query("COMMIT");
        } catch (error) {
            await this.client.query("ROLLBACK");
            throw error;
        } finally {
            this.client.release();
        }
    }

    async pickOperations(draftId, playerId, booster, card) {
        await this.deleteCard(card);
        await this.createPick(playerId, card);
        const players = await this.getPlayers(draftId);
        const draft = await this.getDraft(draftId);
        if (booster.pickNumber < CARDS_IN_PACK) {
            await this.moveBooster(draft, players, booster);
        } else {
            await this.deleteBooster(booster);
            const existingBoosters = await this.getAllBoostersForDraft(draftId);
            if (existingBoosters.length === 0) {
                if (draft.packNumber < 3) {
                    const newBoosters = await this.createAndGetBoosters(players.map((player) => player.id));
                    await this.createCards(newBoosters.map((booster) => booster.id));
                    await this.setDraftPackNumber(draft);
                } else {
                    await this.setDraftToComplete(draftId);
                }
            }
        }
        await this.makeBotPicks(draftId);
    }

    async makeBotPicks(draftId) {
        const result = await this.client.query(
            `SELECT players.id AS player_id, boosters.id AS booster_id, boosters.pick_number AS pick_number
            FROM players JOIN boosters ON players.id = boosters.player_id
            WHERE draft_id = $1
                AND user_id IN (${BOT_USER_IDS.map((id) => `'${id}'`).join(", ")})
            ORDER BY pick_number`,
            [draftId]
        );
        if (result.rows.length === 0) {
            return;
        }
        const { player_id, booster_id, pick_number } = result.rows[0];
        const booster = new Booster(booster_id, pick_number, player_id);

        const cardsResult = await this.client.query(
            `SELECT * FROM cards
            WHERE booster_id = ${booster_id}`
        );
        const boosterCards = Card.createManyFromDb(cardsResult.rows);

        const picksResult = await this.client.query(
            `SELECT * FROM picks
            WHERE player_id = $1`,
            [player_id]
        );
        const picks = Pick.createManyFromDb(picksResult.rows);

        const bot = new Bot(picks);
        const pickCard = bot.decidePick(boosterCards);

        await this.pickOperations(draftId, player_id, booster, pickCard);
    }

    async getAllBoostersForDraft(draftId) {
        const result = await this.client.query(
            `SELECT *
            FROM boosters
                JOIN players ON players.id = boosters.player_id
            WHERE players.draft_id = $1`,
            [draftId]
        );
        return Booster.createManyFromDb(result.rows);
    }

    async getHumanPlayers(draftId) {
        const result = await this.client.query(
            `SELECT * FROM players 
            WHERE draft_id = $1`,
            [draftId]
        );
        return Player.createManyFromDb(result.rows);
    }

    async createAndGetBotPlayers(numberToCreate, draftId) {
        if (numberToCreate < 1) {
            return [];
        }
        const botUserIds = sampleSize(BOT_USER_IDS, numberToCreate);
        const result = await this.client.query(
            `INSERT INTO players (user_id, draft_id)
            VALUES ${botUserIds.map((_, index) => `($${index + 2}, $1)`).join(", ")}
            RETURNING *`,
            [draftId, ...botUserIds]
        );
        return Player.createManyFromDb(result.rows);
    }

    async assignSeatNumbers(playerIds) {
        await this.client.query(
            `UPDATE players
            SET seat_number = mapping_table.seat_number
            FROM (
                VALUES ${playerIds.map((playerId, index) => `(${playerId}, ${index})`).join(", ")}
            ) AS mapping_table(id, seat_number)
            WHERE mapping_table.id = players.id`
        );
    }

    async setDraftToInProgress(draftId) {
        await this.client.query(
            `UPDATE drafts 
            SET status = ${DRAFT_STATUSES.IN_PROGRESS}, pack_number = 1
            WHERE id = $1`,
            [draftId]
        );
    }

    async setDraftToComplete(draftId) {
        await this.client.query(
            `UPDATE drafts 
            SET status = ${DRAFT_STATUSES.COMPLETE}, pack_number = NULL
            WHERE id = $1`,
            [draftId]
        );
    }

    async createAndGetBoosters(playerIds) {
        const result = await this.client.query(
            `INSERT INTO boosters (pick_number, player_id) 
            VALUES ${playerIds.map((_, index) => `(1, $${index + 1})`).join(", ")}
            RETURNING *`,
            [...playerIds]
        );
        return Booster.createManyFromDb(result.rows);
    }

    async createCards(boosterIds) {
        const cards = flatMap(boosterIds, (boosterId) =>
            getBooster().map((card) => new Card(null, boosterId, card.id))
        );
        await this.client.query(
            `INSERT INTO cards (booster_id, card_id)
            VALUES ${cards.map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`).join(", ")}`,
            flatMap(cards, (card) => [card.boosterId, card.cardId])
        );
    }

    async deleteCard(card) {
        await this.client.query(
            `DELETE FROM cards
            WHERE id = $1`,
            [card.id]
        );
    }

    async createPick(playerId, card) {
        await this.client.query(
            `INSERT INTO picks (player_id, card_id)
            VALUES ($1, $2)`,
            [playerId, card.cardId]
        );
    }

    async getPlayers(draftId) {
        const result = await this.client.query(
            `SELECT * FROM players
            WHERE draft_id = $1`,
            [draftId]
        );
        return Player.createManyFromDb(result.rows);
    }

    async moveBooster(draft, players, booster) {
        const currentSeat = players.find((player) => player.id === booster.playerId).seatNumber;
        const nextSeat = this.getNextSeat(draft, currentSeat, players.length);
        const nextPlayer = players.find((player) => player.seatNumber === nextSeat);
        await this.client.query(
            `UPDATE boosters
            SET player_id = $1, pick_number = $2
            WHERE id = $3`,
            [nextPlayer.id, booster.pickNumber + 1, booster.id]
        );
    }

    getNextSeat(draft, seatNumber, playersInDraft) {
        if (draft.packNumber === 2) {
            return seatNumber + 1 >= playersInDraft ? 0 : seatNumber + 1;
        }
        return seatNumber - 1 < 0 ? playersInDraft - 1 : seatNumber - 1;
    }

    async deleteBooster(booster) {
        await this.client.query(
            `DELETE FROM boosters
            WHERE id = $1`,
            [booster.id]
        );
    }

    async getDraft(draftId) {
        const result = await this.client.query(
            `SELECT * FROM drafts
            WHERE id = $1`,
            [draftId]
        );
        return Draft.createFromDb(result.rows[0]);
    }

    async setDraftPackNumber(draft) {
        await this.client.query(
            `UPDATE drafts
            SET pack_number = $1
            WHERE id = $2`,
            [draft.packNumber + 1, draft.id]
        );
    }
}
