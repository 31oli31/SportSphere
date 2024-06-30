-- Drop existing tables to avoid conflicts
DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS game_history;
DROP TABLE IF EXISTS standing;
DROP TABLE IF EXISTS player;
DROP TABLE IF EXISTS team;
DROP TABLE IF EXISTS game_type;
DROP TABLE IF EXISTS sport;
DROP TABLE IF EXISTS space;
DROP TABLE IF EXISTS space_sport;

CREATE TABLE space (
                       space_id VARCHAR(36) PRIMARY KEY,
                       space_name VARCHAR(255) UNIQUE NOT NULL,
                       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                       updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE sport (
                       sport_id VARCHAR(36) PRIMARY KEY,
                       sport_name VARCHAR(255) UNIQUE NOT NULL,
                       sport_min_team_members INT NOT NULL,
                       sport_max_team_members INT NOT NULL,
                       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                       updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE team (
                      team_id VARCHAR(36) PRIMARY KEY,
                      team_space_id VARCHAR(36),
                      team_sport_id VARCHAR(36),
                      team_name VARCHAR(255) NOT NULL,
                      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                      CONSTRAINT fk_team_space FOREIGN KEY (team_space_id) REFERENCES space(space_id),
                      CONSTRAINT fk_team_sport FOREIGN KEY (team_sport_id) REFERENCES sport(sport_id),
                      INDEX (team_space_id),
                      INDEX (team_sport_id)
);

CREATE TABLE player (
                        player_id VARCHAR(36) PRIMARY KEY,
                        player_name VARCHAR(255) NOT NULL,
                        player_team_id VARCHAR(36),
                        player_sport_id VARCHAR(36),
                        player_space_id VARCHAR(36),
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                        CONSTRAINT fk_player_team FOREIGN KEY (player_team_id) REFERENCES team(team_id),
                        CONSTRAINT fk_player_sport FOREIGN KEY (player_sport_id) REFERENCES sport(sport_id),
                        CONSTRAINT fk_player_space FOREIGN KEY (player_space_id) REFERENCES space(space_id),
                        INDEX (player_team_id),
                        INDEX (player_sport_id),
                        INDEX (player_space_id)
);

CREATE TABLE game_type (
                           game_type_id VARCHAR(36) PRIMARY KEY,
                           game_type_name VARCHAR(255) UNIQUE NOT NULL,
                           created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                           updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE game_history (
                              game_id VARCHAR(36) PRIMARY KEY,
                              game_space_id VARCHAR(36),
                              game_sport_id VARCHAR(36),
                              game_team_a_id VARCHAR(36),
                              game_team_b_id VARCHAR(36),
                              game_game_type_id VARCHAR(36),
                              game_winner_team_id VARCHAR(36),
                              game_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                              created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                              updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                              CONSTRAINT fk_game_space FOREIGN KEY (game_space_id) REFERENCES space(space_id),
                              CONSTRAINT fk_game_sport FOREIGN KEY (game_sport_id) REFERENCES sport(sport_id),
                              CONSTRAINT fk_game_team_a FOREIGN KEY (game_team_a_id) REFERENCES team(team_id),
                              CONSTRAINT fk_game_team_b FOREIGN KEY (game_team_b_id) REFERENCES team(team_id),
                              CONSTRAINT fk_game_game_type FOREIGN KEY (game_game_type_id) REFERENCES game_type(game_type_id),
                              CONSTRAINT fk_game_winner_team FOREIGN KEY (game_winner_team_id) REFERENCES team(team_id),
                              INDEX (game_space_id),
                              INDEX (game_sport_id),
                              INDEX (game_team_a_id),
                              INDEX (game_team_b_id),
                              INDEX (game_game_type_id),
                              INDEX (game_winner_team_id)
);

CREATE TABLE matches (
    match_id VARCHAR(36) PRIMARY KEY,
    match_game_id VARCHAR(36),
    match_team_a_id VARCHAR(36),
    match_team_b_id VARCHAR(36),
    match_team_a_score INT NOT NULL,
    match_team_b_score INT NOT NULL,
    match_space_id VARCHAR(36),
    match_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_match_game FOREIGN KEY (match_game_id) REFERENCES game_history(game_id),
    CONSTRAINT fk_match_team_a FOREIGN KEY (match_team_a_id) REFERENCES team(team_id),
    CONSTRAINT fk_match_team_b FOREIGN KEY (match_team_b_id) REFERENCES team(team_id),
    CONSTRAINT fk_match_space FOREIGN KEY (match_space_id) REFERENCES space(space_id),
    INDEX (match_game_id),
    INDEX (match_team_a_id),
    INDEX (match_team_b_id),
    INDEX (match_space_id)
);

CREATE TABLE standing (
                          standing_team_id VARCHAR(36) PRIMARY KEY,
                          standing_sport_id VARCHAR(36),
                          standing_matches_played INT DEFAULT 0,
                          standing_wins INT DEFAULT 0,
                          standing_losses INT DEFAULT 0,
                          standing_points INT DEFAULT 0,
                          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          CONSTRAINT fk_standing_team FOREIGN KEY (standing_team_id) REFERENCES team(team_id),
                          CONSTRAINT fk_standing_sport FOREIGN KEY (standing_sport_id) REFERENCES sport(sport_id),
                          INDEX (standing_sport_id)
);

CREATE TABLE space_sport (
                             id VARCHAR(36) PRIMARY KEY,
                             space_id VARCHAR(36),
                             sport_id VARCHAR(36),
                             CONSTRAINT fk_space_sport_space FOREIGN KEY (space_id) REFERENCES space(space_id),
                             CONSTRAINT fk_space_sport_sport FOREIGN KEY (sport_id) REFERENCES sport(sport_id),
                             UNIQUE (space_id, sport_id)
);
