-- =========================================================
-- BASE DE DATOS DEL PROYECTO NESTJS
-- =========================================================

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS eventos_db;

-- Seleccionar la base de datos
USE eventos_db;

-- =========================================================
-- TABLA: eventos
-- =========================================================

CREATE TABLE IF NOT EXISTS eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    fecha DATETIME NOT NULL,
    lugar VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- =========================================================
-- TABLA: asistentes
-- =========================================================

CREATE TABLE IF NOT EXISTS asistentes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    telefono VARCHAR(20),
    evento_id INT NOT NULL,

    CONSTRAINT fk_asistente_evento
        FOREIGN KEY (evento_id)
        REFERENCES eventos(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =========================================================
-- DATOS DE PRUEBA: EVENTOS
-- =========================================================

INSERT INTO eventos (nombre, descripcion, fecha, lugar)
VALUES
(
    'Conferencia de Tecnología',
    'Conferencia sobre nuevas tecnologías y desarrollo de software',
    '2026-10-15 09:00:00',
    'Auditorio Principal'
),
(
    'Taller de NestJS',
    'Taller práctico de desarrollo de APIs con NestJS',
    '2026-10-20 14:00:00',
    'Sala de Sistemas'
),
(
    'Feria de Tecnología',
    'Feria dedicada a proyectos tecnológicos',
    '2026-11-05 10:00:00',
    'Centro de Convenciones'
);

-- =========================================================
-- DATOS DE PRUEBA: ASISTENTES
-- =========================================================

INSERT INTO asistentes (nombre, correo, telefono, evento_id)
VALUES
(
    'David Burbano',
    'david@gmail.com',
    '3001234567',
    1
),
(
    'Juan Perez',
    'juan@gmail.com',
    '3012345678',
    1
),
(
    'Maria Lopez',
    'maria@gmail.com',
    '3023456789',
    2
);

-- =========================================================
-- CONSULTAS PARA COMPROBAR LA BASE DE DATOS
-- =========================================================

-- Ver eventos
SELECT * FROM eventos;

-- Ver asistentes
SELECT * FROM asistentes;

-- Ver asistentes junto con su evento
SELECT
    a.id,
    a.nombre AS asistente,
    a.correo,
    a.telefono,
    e.nombre AS evento,
    e.fecha,
    e.lugar
FROM asistentes a
INNER JOIN eventos e
    ON a.evento_id = e.id;

-- =========================================================
-- COMPROBAR LA ESTRUCTURA
-- =========================================================

DESCRIBE eventos;
DESCRIBE asistentes;
