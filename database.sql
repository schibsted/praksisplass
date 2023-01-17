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
-- Table `application-database`.`Schools`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `application-database`.`Schools` (
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `application-database`.`study`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `application-database`.`study` (
  `study` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`study`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `application-database`.`Schools_has_study`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `application-database`.`Schools_has_study` (
  `Schools_name` VARCHAR(45) NOT NULL,
  `study_study` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Schools_name`, `study_study`),
  INDEX `fk_Schools_has_study_study1_idx` (`study_study` ASC),
  INDEX `fk_Schools_has_study_Schools_idx` (`Schools_name` ASC),
  CONSTRAINT `fk_Schools_has_study_Schools`
    FOREIGN KEY (`Schools_name`)
    REFERENCES `application-database`.`Schools` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Schools_has_study_study1`
    FOREIGN KEY (`study_study`)
    REFERENCES `application-database`.`study` (`study`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
  `Schools_has_study_Schools_name` VARCHAR(45) NOT NULL,
  `Schools_has_study_study_study` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Applications_Schools_has_study1_idx` (`Schools_has_study_Schools_name` ASC, `Schools_has_study_study_study` ASC),
  CONSTRAINT `fk_Applications_Schools_has_study1`
    FOREIGN KEY (`Schools_has_study_Schools_name` , `Schools_has_study_study_study`)
    REFERENCES `application-database`.`Schools_has_study` (`Schools_name` , `study_study`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
