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
-- Table `application-database`.`ContactPerson`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `application-database`.`ContactPerson` (
  `contactPerson_id` INT NOT NULL AUTO_INCREMENT,
  `fistname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `tel` VARCHAR(45) NULL,
  PRIMARY KEY (`contactPerson_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `application-database`.`County`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `application-database`.`County` (
  `countyNumber` CHAR(2) NOT NULL,
  `name` VARCHAR(100) NULL,
  PRIMARY KEY (`countyNumber`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `application-database`.`School`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `application-database`.`School` (
  `orgnr` INT NOT NULL AUTO_INCREMENT,
  `schoolName` VARCHAR(45) NOT NULL,
  `countyNumber` CHAR(2) NOT NULL,
  PRIMARY KEY (`orgnr`),
  INDEX `fk_School_County1_idx` (`countyNumber` ASC),
  CONSTRAINT `fk_School_County1`
    FOREIGN KEY (`countyNumber`)
    REFERENCES `application-database`.`County` (`countyNumber`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `application-database`.`SubjectArea`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `application-database`.`SubjectArea` (
  `subject_id` INT NOT NULL AUTO_INCREMENT,
  `subjectName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`subject_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `application-database`.`Position`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `application-database`.`Position` (
  `position_id` INT NOT NULL AUTO_INCREMENT,
  `positionType` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`position_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `application-database`.`Application`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `application-database`.`Application` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `tel` VARCHAR(45) NULL,
  `ContactPerson_id` INT NULL,
  `schoolOrgnr` INT NOT NULL,
  `subjectId` INT NOT NULL,
  `positionId` INT NOT NULL,
  `status` ENUM('recieved', 'assigned', 'reviewed', 'accepted', 'rejected') NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Application_ContactPerson1_idx` (`ContactPerson_id` ASC),
  INDEX `fk_Application_School1_idx` (`schoolOrgnr` ASC),
  INDEX `fk_Application_SubjectArea1_idx` (`subjectId` ASC),
  INDEX `fk_Application_Position1_idx` (`positionId` ASC),
  CONSTRAINT `fk_Application_ContactPerson1`
    FOREIGN KEY (`ContactPerson_id`)
    REFERENCES `application-database`.`ContactPerson` (`contactPerson_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Application_School1`
    FOREIGN KEY (`schoolOrgnr`)
    REFERENCES `application-database`.`School` (`orgnr`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Application_SubjectArea1`
    FOREIGN KEY (`subjectId`)
    REFERENCES `application-database`.`SubjectArea` (`subject_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Application_Position1`
    FOREIGN KEY (`positionId`)
    REFERENCES `application-database`.`Position` (`position_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `application-database`.`File`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `application-database`.`File` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `filename` VARCHAR(45) NOT NULL,
  `fileKey` VARCHAR(45) NOT NULL,
  `Application_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_File_Application_idx` (`Application_id` ASC),
  CONSTRAINT `fk_File_Application`
    FOREIGN KEY (`Application_id`)
    REFERENCES `application-database`.`Application` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
