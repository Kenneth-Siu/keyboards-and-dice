INSERT INTO users(id, display_name) VALUES ('00', 'Angrath Bot');
INSERT INTO users(id, display_name) VALUES ('01', 'Arlinn Bot');
INSERT INTO users(id, display_name) VALUES ('02', 'Ashiok Bot');
INSERT INTO users(id, display_name) VALUES ('03', 'Basri Bot');
INSERT INTO users(id, display_name) VALUES ('04', 'Calix Bot');
INSERT INTO users(id, display_name) VALUES ('05', 'Chandra Bot');
INSERT INTO users(id, display_name) VALUES ('06', 'Daretti Bot');
INSERT INTO users(id, display_name) VALUES ('07', 'Davriel Bot');
INSERT INTO users(id, display_name) VALUES ('08', 'Elspeth Bot');
INSERT INTO users(id, display_name) VALUES ('09', 'Garruk Bot');
INSERT INTO users(id, display_name) VALUES ('10', 'Huatli Bot');
INSERT INTO users(id, display_name) VALUES ('11', 'Jace Bot');
INSERT INTO users(id, display_name) VALUES ('12', 'Jaya Bot');
INSERT INTO users(id, display_name) VALUES ('13', 'Yanggu Bot');
INSERT INTO users(id, display_name) VALUES ('14', 'Kasmina Bot');
INSERT INTO users(id, display_name) VALUES ('15', 'Kaya Bot');
INSERT INTO users(id, display_name) VALUES ('16', 'Kiora Bot');
INSERT INTO users(id, display_name) VALUES ('17', 'Koth Bot');
INSERT INTO users(id, display_name) VALUES ('18', 'Liliana Bot');
INSERT INTO users(id, display_name) VALUES ('19', 'Yanling Bot');
INSERT INTO users(id, display_name) VALUES ('20', 'Nahiri Bot');
INSERT INTO users(id, display_name) VALUES ('21', 'Narset Bot');
INSERT INTO users(id, display_name) VALUES ('22', 'Niko Bot');
INSERT INTO users(id, display_name) VALUES ('23', 'Nissa Bot');
INSERT INTO users(id, display_name) VALUES ('24', 'Ob Bot');
INSERT INTO users(id, display_name) VALUES ('25', 'Oko Bot');
INSERT INTO users(id, display_name) VALUES ('26', 'Ral Bot');
INSERT INTO users(id, display_name) VALUES ('27', 'Rowan Bot');
INSERT INTO users(id, display_name) VALUES ('28', 'Saheeli Bot');
INSERT INTO users(id, display_name) VALUES ('29', 'Samut Bot');
INSERT INTO users(id, display_name) VALUES ('30', 'Sarkhan Bot');
INSERT INTO users(id, display_name) VALUES ('31', 'Sorin Bot');
INSERT INTO users(id, display_name) VALUES ('32', 'Tamiyo Bot');
INSERT INTO users(id, display_name) VALUES ('33', 'Teferi Bot');
INSERT INTO users(id, display_name) VALUES ('34', 'Tezzeret Bot');
INSERT INTO users(id, display_name) VALUES ('35', 'Teyo Bot');
INSERT INTO users(id, display_name) VALUES ('36', 'Tyvar Bot');
INSERT INTO users(id, display_name) VALUES ('37', 'Tibalt Bot');
INSERT INTO users(id, display_name) VALUES ('38', 'Ugin Bot');
INSERT INTO users(id, display_name) VALUES ('39', 'Vivien Bot');
INSERT INTO users(id, display_name) VALUES ('40', 'Vraska Bot');
INSERT INTO users(id, display_name) VALUES ('41', 'Will Bot');

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
    pack_number SMALLINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_status
        FOREIGN KEY(status)
        REFERENCES draft_statuses(id),
    CONSTRAINT fk_owner
        FOREIGN KEY(owner_id)
        REFERENCES users(id)
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
    pick_number SMALLINT NOT NULL,
    player_id INTEGER NOT NULL,
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
    memory TEXT NOT NULL,
    CONSTRAINT fk_player
        FOREIGN KEY(player_id)
        REFERENCES players(id)
);
