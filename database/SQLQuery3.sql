-- Crear la base de datos
CREATE DATABASE LogisticaDB;
GO

-- Usar la base de datos
USE LogisticaDB;
GO

-- Crear la tabla INVCATUBICA
CREATE TABLE INVCATUBICA (
    INVBODEGA VARCHAR(15) NOT NULL,
    INVUBICA VARCHAR(15) NOT NULL,
    INVALTURA NUMERIC(20,4) NOT NULL,
    INVMAXUNID NUMERIC(20,4) NOT NULL,
    INVFLAGEXT VARCHAR(1) NOT NULL,
    INVORDEN VARCHAR(1) NOT NULL,
    PRIMARY KEY (INVBODEGA, INVUBICA)
);
GO

-- Insertar datos de prueba en la tabla INVCATUBICA
INSERT INTO INVCATUBICA (INVBODEGA, INVUBICA, INVALTURA, INVMAXUNID, INVFLAGEXT, INVORDEN)
VALUES 
    ('Bodega1', 'Ubica1', 10.50, 500.00, 'N', '1'),
    ('Bodega1', 'Ubica2', 8.75, 300.00, 'Y', '2'),
    ('Bodega2', 'Ubica3', 15.00, 600.00, 'N', '3'),
    ('Bodega3', 'Ubica4', 12.25, 700.00, 'Y', '4');
GO

-- Crear la tabla de usuarios
CREATE TABLE Usuarios (
    ID INT IDENTITY(1,1) PRIMARY KEY,           -- Campo ID auto-incremental como clave primaria
    Nombre VARCHAR(50) NOT NULL,                -- Nombre del usuario
    Apellido VARCHAR(50) NOT NULL,              -- Apellido del usuario
    Correo VARCHAR(100) UNIQUE NOT NULL,        -- Correo del usuario (debe ser único)
    Usuario VARCHAR(50) UNIQUE NOT NULL,        -- Nombre de usuario (debe ser único)
    Contraseña VARCHAR(255) NOT NULL            -- Contraseña del usuario (debería ser cifrada)
);


SELECT * FROM INVCATUBICA

select COUNT(*) from INVCATUBICA