-- Drops the database if it exists, recreates it and them selects it to use
DROP DATABASE IF EXISTS cardfolio;
CREATE DATABASE cardfolio;
USE cardfolio;

-- Creates the cards table with all the respective constraints
CREATE TABLE cards (
    card_id INT AUTO_INCREMENT PRIMARY KEY,
    game VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    set_code VARCHAR(25),
    set_name VARCHAR(255),
    collector_number VARCHAR(50),
    rarity VARCHAR(50),
    quantity INT NOT NULL DEFAULT 0,
    purchase_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    card_condition VARCHAR(50)
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

-- Creates the Yugioh specific table with specific attributes with all the respective constraints referencing the same card data in the card table
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

-- Creates the Sport specific table with specific attributes with all the respective constraints referencing the same card data in the card table
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
    deck_name VARCHAR(100) NOT NULL UNIQUE,
    format VARCHAR(50)
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
