-- ESS Internship Portal Database Schema

CREATE DATABASE IF NOT EXISTS ess_portal;

USE ess_portal;


-- Admin users table
CREATE TABLE IF NOT EXISTS admins (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) DEFAULT NULL,
    password VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
);


-- Internship applications table
CREATE TABLE IF NOT EXISTS applications (
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(100) DEFAULT NULL,
    lastName VARCHAR(100) DEFAULT NULL,
    email VARCHAR(100) DEFAULT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    university VARCHAR(100) DEFAULT NULL,
    fieldOfStudy VARCHAR(100) DEFAULT NULL,
    academicYear VARCHAR(50) DEFAULT NULL,
    department VARCHAR(100) DEFAULT NULL,
    startDate DATE DEFAULT NULL,
    coverLetter TEXT,
    status VARCHAR(20) DEFAULT 'Pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);


-- Contact messages table
CREATE TABLE IF NOT EXISTS contacts (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) DEFAULT NULL,
    email VARCHAR(100) DEFAULT NULL,
    subject VARCHAR(255) DEFAULT NULL,
    message TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isRead TINYINT(1) DEFAULT 0,
    reply TEXT,
    repliedAt TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id)
);