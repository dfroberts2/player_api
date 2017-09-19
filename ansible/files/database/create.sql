CREATE TABLE `player_api`.`players` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `screen_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `screen_name_UNIQUE` (`screen_name` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC));

CREATE TABLE `player_api`.`games` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC));

CREATE TABLE `player_api`.`matches` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `game_id` INT NOT NULL,
  `started` DATETIME NULL,
  `ended` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `player_api`.`matches_players` (
  `player_id` INT NOT NULL,
  `match_id` INT NOT NULL,
  PRIMARY KEY (`player_id`, `match_id`));

CREATE TABLE `player_api`.`stat_types` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `player_api`.`stats` (
  `player_id` INT NOT NULL,
  `stat_type_id` INT NOT NULL,
  `match_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`player_id`, `stat_type_id`, `match_id`));

CREATE TABLE `player_api`.`achievements` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NOT NULL,
  `game_id` INT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `player_api`.`achievements_players` (
  `player_id` INT NOT NULL,
  `achievement_id` VARCHAR(45) NOT NULL,
  `count` INT NULL,
  PRIMARY KEY (`player_id`, `achievement_id`));
