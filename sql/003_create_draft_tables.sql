INSERT INTO users(id, displayName) VALUES ('00', 'Bot Angrath');
INSERT INTO users(id, displayName) VALUES ('01', 'Bot Arlinn');
INSERT INTO users(id, displayName) VALUES ('02', 'Bot Ashiok');
INSERT INTO users(id, displayName) VALUES ('03', 'Bot Basri');
INSERT INTO users(id, displayName) VALUES ('04', 'Bot Calix');
INSERT INTO users(id, displayName) VALUES ('05', 'Bot Chandra');
INSERT INTO users(id, displayName) VALUES ('06', 'Bot Daretti');
INSERT INTO users(id, displayName) VALUES ('07', 'Bot Davriel');
INSERT INTO users(id, displayName) VALUES ('08', 'Bot Elspeth');
INSERT INTO users(id, displayName) VALUES ('09', 'Bot Garruk');
INSERT INTO users(id, displayName) VALUES ('10', 'Bot Huatli');
INSERT INTO users(id, displayName) VALUES ('11', 'Bot Jace');
INSERT INTO users(id, displayName) VALUES ('12', 'Bot Jaya');
INSERT INTO users(id, displayName) VALUES ('13', 'Bot Yanggu');
INSERT INTO users(id, displayName) VALUES ('14', 'Bot Kasmina');
INSERT INTO users(id, displayName) VALUES ('15', 'Bot Kaya');
INSERT INTO users(id, displayName) VALUES ('16', 'Bot Kiora');
INSERT INTO users(id, displayName) VALUES ('17', 'Bot Koth');
INSERT INTO users(id, displayName) VALUES ('18', 'Bot Liliana');
INSERT INTO users(id, displayName) VALUES ('19', 'Bot Yanling');
INSERT INTO users(id, displayName) VALUES ('20', 'Bot Nahiri');
INSERT INTO users(id, displayName) VALUES ('21', 'Bot Narset');
INSERT INTO users(id, displayName) VALUES ('22', 'Bot Niko');
INSERT INTO users(id, displayName) VALUES ('23', 'Bot Nissa');
INSERT INTO users(id, displayName) VALUES ('24', 'Bot Ob');
INSERT INTO users(id, displayName) VALUES ('25', 'Bot Oko');
INSERT INTO users(id, displayName) VALUES ('26', 'Bot Ral');
INSERT INTO users(id, displayName) VALUES ('27', 'Bot Rowan');
INSERT INTO users(id, displayName) VALUES ('28', 'Bot Saheeli');
INSERT INTO users(id, displayName) VALUES ('29', 'Bot Samut');
INSERT INTO users(id, displayName) VALUES ('30', 'Bot Sarkhan');
INSERT INTO users(id, displayName) VALUES ('31', 'Bot Sorin');
INSERT INTO users(id, displayName) VALUES ('32', 'Bot Tamiyo');
INSERT INTO users(id, displayName) VALUES ('33', 'Bot Teferi');
INSERT INTO users(id, displayName) VALUES ('34', 'Bot Tezzeret');
INSERT INTO users(id, displayName) VALUES ('35', 'Bot Teyo');
INSERT INTO users(id, displayName) VALUES ('36', 'Bot Tyvar');
INSERT INTO users(id, displayName) VALUES ('37', 'Bot Tibalt');
INSERT INTO users(id, displayName) VALUES ('38', 'Bot Ugin');
INSERT INTO users(id, displayName) VALUES ('39', 'Bot Vivien');
INSERT INTO users(id, displayName) VALUES ('40', 'Bot Vraska');
INSERT INTO users(id, displayName) VALUES ('41', 'Bot Will');

CREATE TABLE draftStatuses (
    id SMALLINT PRIMARY KEY NOT NULL,
    displayName TEXT NOT NULL
);

INSERT INTO draftStatuses(id, displayName) VALUES (0, 'Ready to Start');
INSERT INTO draftStatuses(id, displayName) VALUES (1, 'In Progress');
INSERT INTO draftStatuses(id, displayName) VALUES (2, 'Complete');

CREATE TABLE drafts (
    id TEXT PRIMARY KEY NOT NULL,
    status SMALLINT NOT NULL,
    CONSTRAINT fk_status
        FOREIGN KEY(status)
        REFERENCES draftStatuses(id)
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY NOT NULL,
    userId TEXT NOT NULL,
    draftId TEXT NOT NULL,
    seatNumber SMALLINT,
    CONSTRAINT fk_user
        FOREIGN KEY(userId)
        REFERENCES users(id),
    CONSTRAINT fk_draft
        FOREIGN KEY(draftId)
        REFERENCES drafts(id)
);

CREATE TABLE boosters (
    id SERIAL PRIMARY KEY NOT NULL,
    packNumber SMALLINT NOT NULL,
    pickNumber SMALLINT NOT NULL,
    playerId INTEGER,
    CONSTRAINT fk_player
        FOREIGN KEY(playerId)
        REFERENCES players(id)
);

CREATE TABLE cards (
    internalId SERIAL PRIMARY KEY NOT NULL,
    boosterId INTEGER NOT NULL,
    cardId SMALLINT NOT NULL,
    CONSTRAINT fk_booster
        FOREIGN KEY(boosterId)
        REFERENCES boosters(id)
);

CREATE TABLE memories (
    playerId INTEGER NOT NULL,
    memory TEXT,
    CONSTRAINT fk_player
        FOREIGN KEY(playerId)
        REFERENCES players(id)
);
