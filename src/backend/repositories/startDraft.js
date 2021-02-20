import pool from "./pool.js";
import { DRAFT_STATUSES } from "../models/Draft.js";
import { Player } from "../models/Player.js";
import { BOT_USER_IDS, DEFAULT_PLAYERS_IN_DRAFT } from "../config.js";
import rawCardList from "../../../data/rawCardList.js";
import { flatMap, sampleSize, shuffle } from "lodash";
import { Card } from "../models/Card.js";

export async function startDraft(id) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        // Get human players
        const humanPlayersResult = await client.query("SELECT * FROM players WHERE draftId = $1", [id]);
        const humanPlayers = humanPlayersResult.rows.map((row) => Player.createFromDb(row));

        // Add random bots so there are 8 or more players
        const botUserIds = sampleSize(BOT_USER_IDS, Math.max(0, DEFAULT_PLAYERS_IN_DRAFT - humanPlayers.length));
        const botPlayersResult = await client.query(
            `INSERT INTO players (userId, draftId)
            VALUES ${botUserIds.map((_, index) => `($${index + 2}, $1)`).join(", ")}
            RETURNING *`,
            [id, ...botUserIds]
        );
        const botPlayers = botPlayersResult.rows.map((row) => Player.createFromDb(row));
        const playerIds = shuffle([
            ...botPlayers.map((player) => player.id),
            ...humanPlayers.map((player) => player.id),
        ]);

        // Set seat numbers
        await client.query(
            `UPDATE players
            SET seatNumber = mappingTable.seatNumber
            FROM (
                VALUES ${playerIds.map((playerId, index) => `(${playerId}, ${index})`).join(", ")}
            ) AS mappingTable(id, seatNumber)
            WHERE mappingTable.id = players.id`
        );

        // Set draft status to IN_PROGRESS
        await client.query(`UPDATE drafts SET status = ${DRAFT_STATUSES.IN_PROGRESS} WHERE id = $1`, [id]);

        // Create boosters
        const boosterIdsResult = await client.query(
            `INSERT INTO boosters (packNumber, pickNumber, playerId) 
            VALUES ${playerIds.map((_, index) => `(1, 1, $${index + 1})`).join(", ")}
            RETURNING id`,
            [...playerIds]
        );
        const boosterIds = boosterIdsResult.rows.map((row) => row.id);

        // Create cards
        const cards = flatMap(boosterIds, getNewBooster);
        await client.query(
            `INSERT INTO cards (boosterId, cardId)
            VALUES ${cards.map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`).join(", ")}`,
            flatMap(cards, (card) => [card.boosterId, card.cardId])
        );

        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        console.log(error);
        throw error;
    } finally {
        client.release();
    }
}

function getNewBooster(boosterId) {
    return sampleSize(rawCardList, 15).map((card) => new Card(null, boosterId, card.id));
}
