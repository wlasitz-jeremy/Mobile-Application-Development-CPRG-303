-- Drops the database if it exists, recreates it and them selects it to use
DROP DATABASE IF EXISTS cardfolio;
CREATE DATABASE cardfolio;
USE cardfolio;

-- Creates the users table with all the respective constraints
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    account_status ENUM('ACTIVE', 'SUSPENDED', 'DELETED')
        DEFAULT 'ACTIVE'
);

-- Creates the user_profiles table with all the respective constraints
CREATE TABLE user_profiles (
    user_id INT PRIMARY KEY,
    display_name VARCHAR(100),
    profile_image_url VARCHAR(500),
    bio TEXT,
    preferred_language VARCHAR(20) DEFAULT 'en',

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- Creates the games lookup table with all the respective constraints
CREATE TABLE games (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    game_name VARCHAR(100) NOT NULL UNIQUE,
    category ENUM('TCG', 'SPORTS') NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

-- Inserts the currently supported games
INSERT INTO games (game_name, category)
VALUES
('Magic: The Gathering', 'TCG'),
('Pokemon', 'TCG'),
('Disney Lorcana', 'TCG'),
('Riftbound', 'TCG'),
('Yu-Gi-Oh!', 'TCG'),
('Sports Cards', 'SPORTS');

-- Creates the cards table with all the respective constraints
CREATE TABLE cards (
    card_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    game_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    set_code VARCHAR(25),
    set_name VARCHAR(255),
    collector_number VARCHAR(50),
    rarity VARCHAR(50),
    quantity INT NOT NULL DEFAULT 0,
    card_condition ENUM(
        'Mint',
        'Near Mint',
        'Lightly Played',
        'Moderately Played',
        'Heavily Played',
        'Damaged'
    ),

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    FOREIGN KEY (game_id)
        REFERENCES games(game_id)
);

-- Creates the Magic specific table with specific attributes with all the respective constraints referencing the same card data in the card table
CREATE TABLE mtg_cards (
    card_id INT PRIMARY KEY,
    foil VARCHAR(20),
    scryfall_id VARCHAR(100),

    FOREIGN KEY (card_id)
        REFERENCES cards(card_id)
        ON DELETE CASCADE
);

-- Creates the Pokemon specific table with specific attributes with all the respective constraints referencing the same card data in the card table
CREATE TABLE pokemon_cards (
    card_id INT PRIMARY KEY,
    hp INT,
    pokemon_type VARCHAR(50),
    holo BOOLEAN,

    FOREIGN KEY (card_id)
        REFERENCES cards(card_id)
        ON DELETE CASCADE
);

-- Creates the Lorcana specific table with specific attributes with all the respective constraints referencing the same card data in the card table
CREATE TABLE lorcana_cards (
    card_id INT PRIMARY KEY,
    ink_cost INT,
    inkable BOOLEAN,
    lore_value INT,
    strength INT,
    willpower INT,
    card_type VARCHAR(50),
    ink_color VARCHAR(50),

    FOREIGN KEY (card_id)
        REFERENCES cards(card_id)
        ON DELETE CASCADE
);

-- Creates the Riftbound specific table with specific attributes with all the respective constraints referencing the same card data in the card table
CREATE TABLE riftbound_cards (
    card_id INT PRIMARY KEY,
    champion VARCHAR(100),
    faction VARCHAR(50),
    card_type VARCHAR(50),
    cost INT,

    FOREIGN KEY (card_id)
        REFERENCES cards(card_id)
        ON DELETE CASCADE
);

-- Creates the Yu-Gi-Oh! specific table with specific attributes with all the respective constraints referencing the same card data in the card table
CREATE TABLE yugioh_cards (
    card_id INT PRIMARY KEY,
    attribute_name VARCHAR(50),
    monster_type VARCHAR(100),
    level_rank INT,
    atk INT,
    def INT,
    card_type VARCHAR(100),

    FOREIGN KEY (card_id)
        REFERENCES cards(card_id)
        ON DELETE CASCADE
);

-- Creates the Sports Card specific table with specific attributes with all the respective constraints referencing the same card data in the card table
CREATE TABLE sports_cards (
    card_id INT PRIMARY KEY,
    sport VARCHAR(50),
    player_name VARCHAR(255),
    team_name VARCHAR(255),
    manufacturer VARCHAR(100),
    season_year INT,
    rookie_card BOOLEAN,
    autograph BOOLEAN,
    memorabilia BOOLEAN,
    serial_number VARCHAR(50),

    FOREIGN KEY (card_id)
        REFERENCES cards(card_id)
        ON DELETE CASCADE
);

-- Creates the Decks table with respective constraints
CREATE TABLE decks (
    deck_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    deck_name VARCHAR(100) NOT NULL,
    format VARCHAR(50),

    UNIQUE(user_id, deck_name),

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- Creates the deck_cards table referencing the applicable columns in the card table
CREATE TABLE deck_cards (
    deck_id INT,
    card_id INT,
    quantity INT NOT NULL DEFAULT 1,

    PRIMARY KEY (deck_id, card_id),

    FOREIGN KEY (deck_id)
        REFERENCES decks(deck_id)
        ON DELETE CASCADE,

    FOREIGN KEY (card_id)
        REFERENCES cards(card_id)
        ON DELETE CASCADE
);

-- Creates indexes to improve query performance
CREATE INDEX idx_cards_user
ON cards(user_id);

CREATE INDEX idx_cards_game
ON cards(game_id);

CREATE INDEX idx_cards_name
ON cards(name);

CREATE INDEX idx_decks_user
ON decks(user_id);

CREATE INDEX idx_sports_player
ON sports_cards(player_name);
