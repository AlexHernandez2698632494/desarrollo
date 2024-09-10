const express = require('express');
const { sql, getConnection } = require('../database/db'); // Asegúrate de tener configurada la conexión
const bcrypt = require('bcryptjs'); // Importamos bcrypt para encriptar contraseñas
require('dotenv').config();

const app = express();
app.use(express.json());

// Ruta para obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT ID, Nombre, Apellido, Correo, Usuario FROM Usuarios");
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send("Error al obtener los usuarios: " + error);
    }
});

// Ruta para obtener un usuario por correo o nombre de usuario y validar contraseña
app.get('/usuarios/:identificador/:password', async (req, res) => {
    const { identificador, password } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('identificador', sql.VarChar, identificador)
            .query(`
                SELECT * FROM Usuarios 
                WHERE Correo = @identificador OR Usuario = @identificador
            `);

        if (result.recordset.length === 0) {
            return res.status(404).send("Usuario no encontrado");
        }

        const usuario = result.recordset[0];
        const contraseñaValida = await bcrypt.compare(password, usuario.Contraseña);

        if (contraseñaValida) {
            res.json({
                ID: usuario.ID,
                Nombre: usuario.Nombre,
                Apellido: usuario.Apellido,
                Correo: usuario.Correo,
                Usuario: usuario.Usuario
            });
        } else {
            res.status(401).send("Contraseña incorrecta");
        }
    } catch (error) {
        res.status(500).send("Error al obtener el usuario: " + error);
    }
});


// Ruta para insertar un nuevo usuario (encriptando la contraseña)
app.post('/usuarios', async (req, res) => {
    const { Nombre, Apellido, Correo, Usuario, Contraseña } = req.body;

    // Encriptar la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const contraseñaEncriptada = await bcrypt.hash(Contraseña, salt);

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('Nombre', sql.VarChar, Nombre)
            .input('Apellido', sql.VarChar, Apellido)
            .input('Correo', sql.VarChar, Correo)
            .input('Usuario', sql.VarChar, Usuario)
            .input('Contraseña', sql.VarChar, contraseñaEncriptada)
            .query(`
                INSERT INTO Usuarios (Nombre, Apellido, Correo, Usuario, Contraseña)
                VALUES (@Nombre, @Apellido, @Correo, @Usuario, @Contraseña)
            `);

        res.status(201).send("Usuario insertado correctamente");
    } catch (error) {
        if (error.message.includes("Violation of UNIQUE KEY constraint")) {
            res.status(400).send("El correo o usuario ya existe");
        } else {
            res.status(500).send("Error al insertar el usuario: " + error);
        }
    }
});

module.exports = app;
