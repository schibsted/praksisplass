-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema application-database
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema application-database
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `application-database` DEFAULT CHARACTER SET utf8 ;
USE `application-database` ;

-- -----------------------------------------------------
-- Table `application-database`.`Files`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `application-database`.`Files` (
  `filename` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`filename`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `application-database`.`Schools`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `application-database`.`Schools` (
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `application-database`.`Study`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `application-database`.`Study` (
  `study` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`study`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `application-database`.`Applications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `application-database`.`Applications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phoneNumber` VARCHAR(45) NULL,
  `school` VARCHAR(45) NOT NULL,
  `study` VARCHAR(45) NOT NULL,
  `filename` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Applications_files1_idx` (`filename` ASC),
  INDEX `fk_Applications_Schools1_idx` (`school` ASC),
  INDEX `fk_Applications_study1_idx` (`study` ASC),
  CONSTRAINT `fk_Applications_files1`
    FOREIGN KEY (`filename`)
    REFERENCES `application-database`.`Files` (`filename`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Applications_Schools1`
    FOREIGN KEY (`school`)
    REFERENCES `application-database`.`Schools` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Applications_study1`
    FOREIGN KEY (`study`)
    REFERENCES `application-database`.`Study` (`study`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
