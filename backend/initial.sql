# Users
CREATE TABLE `atrato`.`clientes` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(45) NULL,
    `last_name` VARCHAR(45) NULL,
    `email` VARCHAR(45) NULL,
    `gender` VARCHAR(45) NULL,
    `isQuincenal` TINYINT NULL,
PRIMARY KEY (`id`));

# Platforms
CREATE TABLE `atrato`.`plataformas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `monthlyPrice` FLOAT NULL,
  PRIMARY KEY (`id`));

# Subscriptions
CREATE TABLE `atrato`.`suscripciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NULL,
  `platformId` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `platformFk_idx` (`platformId` ASC) VISIBLE,
  INDEX `userIdFk_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `userIdFk`
    FOREIGN KEY (`userId`)
    REFERENCES `atrato`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `platformFk`
    FOREIGN KEY (`platformId`)
    REFERENCES `atrato`.`platforms` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
# Payments
CREATE TABLE `atrato`.`diasFeriados` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `amount` FLOAT NULL,
  `dateCreated` DATE NULL,
  `userId` INT NULL,
  PRIMARY KEY (`id`)),
  CONSTRAINT `userIdFk`
    FOREIGN KEY (`userId`)
    REFERENCES `atrato`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
# Dias feriados
CREATE TABLE `atrato`.`diasFeriados` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NULL,
  `isActive` TINYINT NULL,
  `description` VARCHAR(100) NULL,
  PRIMARY KEY (`id`));