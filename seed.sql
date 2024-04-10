DROP DATABASE IF EXISTS JZ_log;

CREATE DATABASE JZ_log;

\c JZ_log;

DROP TABLE IF EXISTS log;
DROP TABLE IF EXISTS users;

-- Database: JZ_log
-- Description: This database stores log data for engine diagnostics and user information for individual users.

-- Table: log
-- Description: This table stores log data including engine temperature, boost pressure, fuel pressure, oil pressure, oil temperature, and O2 levels.


CREATE TABLE log (
    id SERIAL PRIMARY KEY,
    Engine_Temp INTEGER NOT NULL,
    Boost_Pressure INTEGER NOT NULL,
    Fuel_Pressure INTEGER NOT NULL,
    Oil_Pressure INTEGER NOT NULL,
    Oil_Temp INTEGER NOT NULL,
    O2 INTEGER NOT NULL
);


-- Table: users
-- Description: This table stores user information including username, password, email, first name, and last name.


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL
);
