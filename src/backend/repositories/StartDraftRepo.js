import pool from "./pool.js";
import { DRAFT_STATUSES } from "../models/Draft.js";
import { Player } from "../models/Player.js";
import { BOT_USER_IDS, DEFAULT_PLAYERS_IN_DRAFT } from "../config.js";
import rawCardList from "../../../data/rawCardList.js";
import { flatMap, sampleSize, shuffle } from "lodash";
import { Card } from "../models/Card.js";
import { Booster } from "../models/Booster.js";

export class StartDraftRepo {
    async startDraft(draftId) {
        this.client = await pool.connect();

        try {
            await this.client.query("BEGIN");

            const humanPlayers = await this.getHumanPlayers(draftId);
            const botPlayers = await this.createAndGetBotPlayers(DEFAULT_PLAYERS_IN_DRAFT - humanPlayers.length, draftId);

            const playerIds = shuffle([
                ...botPlayers.map((player) => player.id),
                ...humanPlayers.map((player) => player.id),
            ]);

            await this.assignSeatNumbers(playerIds);
            await this.setDraftToInProgress(draftId);
            const boosters = await this.createAndGetBoosters(playerIds);
            await this.createCards(boosters.map((booster) => booster.id));

            await this.client.query("COMMIT");
        } catch (error) {
            await this.client.query("ROLLBACK");
            console.log(error);
            throw error;
        } finally {
            this.client.release();
        }
    }

    async getHumanPlayers(draftId) {
        const result = await this.client.query("SELECT * FROM players WHERE draftId = $1", [draftId]);
        return result.rows.map((row) => Player.createFromDb(row));
    }

    async createAndGetBotPlayers(numberToCreate, draftId) {
        if (numberToCreate < 1) {
            return Promise.resolve([]);
        }
        const botUserIds = sampleSize(BOT_USER_IDS, numberToCreate);
        const result = await this.client.query(
            `INSERT INTO players (userId, draftId)
            VALUES ${botUserIds.map((_, index) => `($${index + 2}, $1)`).join(", ")}
            RETURNING *`,
            [draftId, ...botUserIds]
        );
        return result.rows.map((row) => Player.createFromDb(row));
    }

    async assignSeatNumbers(playerIds) {
        await this.client.query(
            `UPDATE players
            SET seatNumber = mappingTable.seatNumber
            FROM (
                VALUES ${playerIds.map((playerId, index) => `(${playerId}, ${index})`).join(", ")}
            ) AS mappingTable(id, seatNumber)
            WHERE mappingTable.id = players.id`
        );
    }

    async setDraftToInProgress(draftId) {
        await this.client.query(`UPDATE drafts SET status = ${DRAFT_STATUSES.IN_PROGRESS} WHERE id = $1`, [draftId]);
    }

    async createAndGetBoosters(playerIds) {
        const result = await this.client.query(
            `INSERT INTO boosters (packNumber, pickNumber, playerId) 
            VALUES ${playerIds.map((_, index) => `(1, 1, $${index + 1})`).join(", ")}
            RETURNING *`,
            [...playerIds]
        );
        return result.rows.map((row) => Booster.createFromDb(row));
    }

    async createCards(boosterIds) {
        const cards = flatMap(boosterIds, (boosterId) =>
            sampleSize(rawCardList, 15).map((card) => new Card(null, boosterId, card.id))
        );
        await this.client.query(
            `INSERT INTO cards (boosterId, cardId)
            VALUES ${cards.map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`).join(", ")}`,
            flatMap(cards, (card) => [card.boosterId, card.cardId])
        );
    }
}