SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema build_invest
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `build_invest` DEFAULT CHARACTER SET utf8 ;
USE `build_invest` ;

-- -----------------------------------------------------
-- Table `build_invest`.`architect`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `build_invest`.`architect` (
  `idarchitect` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `complete_name` VARCHAR(70) NOT NULL,
  `dni` VARCHAR(10) NOT NULL,
  `n_matricula` VARCHAR(45) NOT NULL,
  `antecedentes` BLOB NOT NULL,
  `curriculum` BLOB NOT NULL,
  PRIMARY KEY (`idarchitect`),
  UNIQUE INDEX `dni_UNIQUE` (`dni` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `build_invest`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `build_invest`.`users` (
  `email` VARCHAR(255) NOT NULL,
  `username` VARCHAR(16) NOT NULL,
  `password` VARCHAR(70) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`email`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

-- -----------------------------------------------------
-- Table `build_invest`.`project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `build_invest`.`project` (
  `idproject` INT NOT NULL AUTO_INCREMENT,
  `architect` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `latitude` VARCHAR(25) NOT NULL,
  `length` VARCHAR(25) NOT NULL,
  `interest_rate` DECIMAL(10,2) NOT NULL,
  `min` INT NOT NULL,
  `max` INT NOT NULL,
  `start_date` TIMESTAMP NOT NULL,
  `estimated_end` TIMESTAMP NOT NULL,
  `total` DECIMAL(10,2) NULL,
  PRIMARY KEY (`idproject`),
  INDEX `fk_proyect_architect1_idx` (`architect` ASC) VISIBLE,
  CONSTRAINT `fk_proyect_architect1`
    FOREIGN KEY (`architect`)
    REFERENCES `build_invest`.`architect` (`idarchitect`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `build_invest`.`investment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `build_invest`.`investment` (
  `user_email` VARCHAR(255) NOT NULL,
  `project` INT NOT NULL,
  `amount` INT NOT NULL,
  `date` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`user_email`, `project`),
  INDEX `fk_user_has_proyect_proyect1_idx` (`project` ASC) VISIBLE,
  INDEX `fk_user_has_proyect_user_idx` (`user_email` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_proyect_user`
    FOREIGN KEY (`user_email`)
    REFERENCES `build_invest`.`users` (`email`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_proyect_proyect1`
    FOREIGN KEY (`project`)
    REFERENCES `build_invest`.`project` (`idproject`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
