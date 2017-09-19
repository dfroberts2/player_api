-- Seed Players
INSERT INTO `player_api`.`players` (`email`,`screen_name`,`full_name`) VALUES ('jdoe@gmail.com','jd500','John Does');
INSERT INTO `player_api`.`players` (`email`,`screen_name`,`full_name`) VALUES ('gamer200@gmail.com','gamer200','Mike Walsh');

-- Seed Games
INSERT INTO `player_api`.`games` (`name`) VALUES ('Shoot Em Up 7');
INSERT INTO `player_api`.`games` (`name`) VALUES ('Battle Royale');
INSERT INTO `player_api`.`games` (`name`) VALUES ('Street Hoops');

-- Seed Stat Types
INSERT INTO `player_api`.`stat_types` (`name`) VALUES ('Win');
INSERT INTO `player_api`.`stat_types` (`name`) VALUES ('Loss');
INSERT INTO `player_api`.`stat_types` (`name`) VALUES ('Kill');
INSERT INTO `player_api`.`stat_types` (`name`) VALUES ('Death');
