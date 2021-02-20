INSERT INTO users(id, display_name) VALUES ('00', 'Bot Angrath');
INSERT INTO users(id, display_name) VALUES ('01', 'Bot Arlinn');
INSERT INTO users(id, display_name) VALUES ('02', 'Bot Ashiok');
INSERT INTO users(id, display_name) VALUES ('03', 'Bot Basri');
INSERT INTO users(id, display_name) VALUES ('04', 'Bot Calix');
INSERT INTO users(id, display_name) VALUES ('05', 'Bot Chandra');
INSERT INTO users(id, display_name) VALUES ('06', 'Bot Daretti');
INSERT INTO users(id, display_name) VALUES ('07', 'Bot Davriel');
INSERT INTO users(id, display_name) VALUES ('08', 'Bot Elspeth');
INSERT INTO users(id, display_name) VALUES ('09', 'Bot Garruk');
INSERT INTO users(id, display_name) VALUES ('10', 'Bot Huatli');
INSERT INTO users(id, display_name) VALUES ('11', 'Bot Jace');
INSERT INTO users(id, display_name) VALUES ('12', 'Bot Jaya');
INSERT INTO users(id, display_name) VALUES ('13', 'Bot Yanggu');
INSERT INTO users(id, display_name) VALUES ('14', 'Bot Kasmina');
INSERT INTO users(id, display_name) VALUES ('15', 'Bot Kaya');
INSERT INTO users(id, display_name) VALUES ('16', 'Bot Kiora');
INSERT INTO users(id, display_name) VALUES ('17', 'Bot Koth');
INSERT INTO users(id, display_name) VALUES ('18', 'Bot Liliana');
INSERT INTO users(id, display_name) VALUES ('19', 'Bot Yanling');
INSERT INTO users(id, display_name) VALUES ('20', 'Bot Nahiri');
INSERT INTO users(id, display_name) VALUES ('21', 'Bot Narset');
INSERT INTO users(id, display_name) VALUES ('22', 'Bot Niko');
INSERT INTO users(id, display_name) VALUES ('23', 'Bot Nissa');
INSERT INTO users(id, display_name) VALUES ('24', 'Bot Ob');
INSERT INTO users(id, display_name) VALUES ('25', 'Bot Oko');
INSERT INTO users(id, display_name) VALUES ('26', 'Bot Ral');
INSERT INTO users(id, display_name) VALUES ('27', 'Bot Rowan');
INSERT INTO users(id, display_name) VALUES ('28', 'Bot Saheeli');
INSERT INTO users(id, display_name) VALUES ('29', 'Bot Samut');
INSERT INTO users(id, display_name) VALUES ('30', 'Bot Sarkhan');
INSERT INTO users(id, display_name) VALUES ('31', 'Bot Sorin');
INSERT INTO users(id, display_name) VALUES ('32', 'Bot Tamiyo');
INSERT INTO users(id, display_name) VALUES ('33', 'Bot Teferi');
INSERT INTO users(id, display_name) VALUES ('34', 'Bot Tezzeret');
INSERT INTO users(id, display_name) VALUES ('35', 'Bot Teyo');
INSERT INTO users(id, display_name) VALUES ('36', 'Bot Tyvar');
INSERT INTO users(id, display_name) VALUES ('37', 'Bot Tibalt');
INSERT INTO users(id, display_name) VALUES ('38', 'Bot Ugin');
INSERT INTO users(id, display_name) VALUES ('39', 'Bot Vivien');
INSERT INTO users(id, display_name) VALUES ('40', 'Bot Vraska');
INSERT INTO users(id, display_name) VALUES ('41', 'Bot Will');

CREATE TABLE draft_statuses (
    id SMALLINT PRIMARY KEY NOT NULL,
    display_name TEXT NOT NULL
);

INSERT INTO draft_statuses(id, display_name) VALUES (0, 'Ready to Start');
INSERT INTO draft_statuses(id, display_name) VALUES (1, 'In Progress');
INSERT INTO draft_statuses(id, display_name) VALUES (2, 'Complete');

CREATE TABLE drafts (
    id TEXT PRIMARY KEY NOT NULL,
    owner_id TEXT NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_status
        FOREIGN KEY(status)
        REFERENCES draft_statuses(id)
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id TEXT NOT NULL,
    draft_id TEXT NOT NULL,
    seat_number SMALLINT,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id),
    CONSTRAINT fk_draft
        FOREIGN KEY(draft_id)
        REFERENCES drafts(id)
);

CREATE TABLE boosters (
    id SERIAL PRIMARY KEY NOT NULL,
    pack_number SMALLINT NOT NULL,
    pick_number SMALLINT NOT NULL,
    player_id INTEGER,
    CONSTRAINT fk_player
        FOREIGN KEY(player_id)
        REFERENCES players(id)
);

CREATE TABLE cards (
    id SERIAL PRIMARY KEY NOT NULL,
    booster_id INTEGER NOT NULL,
    card_id SMALLINT NOT NULL,
    CONSTRAINT fk_booster
        FOREIGN KEY(booster_id)
        REFERENCES boosters(id)
);

CREATE TABLE memories (
    player_id INTEGER NOT NULL,
    memory TEXT,
    CONSTRAINT fk_player
        FOREIGN KEY(player_id)
        REFERENCES players(id)
);
