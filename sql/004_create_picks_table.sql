CREATE TABLE picks (
    id SERIAL PRIMARY KEY NOT NULL,
    player_id INTEGER NOT NULL,
    card_id SMALLINT NOT NULL,
    CONSTRAINT fk_player
        FOREIGN KEY(player_id)
        REFERENCES players(id)
)
