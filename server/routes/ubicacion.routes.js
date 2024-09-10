const express = require('express');
const { sql, getConnection } = require('../database/db');
require('dotenv').config();

const app = express();

app.use(express.json());

// Ruta para obtener todos los registros de INVCATUBICA
app.get('/ubicaciones', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM INVCATUBICA");
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send("Error al obtener datos: " + error);
    }
});

// Ruta para obtener un registro de INVCATUBICA
app.get('/ubicaciones/:INVBODEGA/:INVUBICA', async (req, res) => {
    const { INVBODEGA, INVUBICA } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('INVBODEGA', sql.VarChar, INVBODEGA)
            .input('INVUBICA', sql.VarChar, INVUBICA)
            .query("SELECT * FROM INVCATUBICA WHERE INVBODEGA = @INVBODEGA AND INVUBICA = @INVUBICA");

        if (result.recordset.length > 0) {
            res.json(result.recordset[0]); // Devuelve el primer registro encontrado
        } else {
            res.status(404).send("Ubicación no encontrada");
        }
    } catch (error) {
        res.status(500).send("Error al obtener la ubicación: " + error);
    }
});


// Ruta para insertar una nueva ubicación
app.post('/ubicaciones', async (req, res) => {
    const { INVBODEGA, INVUBICA, INVALTURA, INVMAXUNID, INVFLAGEXT, INVORDEN } = req.body;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('INVBODEGA', sql.VarChar, INVBODEGA)
            .input('INVUBICA', sql.VarChar, INVUBICA)
            .input('INVALTURA', sql.Numeric(20, 4), INVALTURA)
            .input('INVMAXUNID', sql.Numeric(20, 4), INVMAXUNID)
            .input('INVFLAGEXT', sql.VarChar, INVFLAGEXT)
            .input('INVORDEN', sql.VarChar, INVORDEN)
            .query("INSERT INTO INVCATUBICA (INVBODEGA, INVUBICA, INVALTURA, INVMAXUNID, INVFLAGEXT, INVORDEN) VALUES (@INVBODEGA, @INVUBICA, @INVALTURA, @INVMAXUNID, @INVFLAGEXT, @INVORDEN)");

        res.status(201).send("Ubicación insertada correctamente");
    } catch (error) {
        res.status(500).send("Error al insertar datos: " + error);
    }
});

// Ruta para actualizar una ubicación
app.put('/ubicaciones/:INVBODEGA/:INVUBICA', async (req, res) => {
    const { INVBODEGA, INVUBICA } = req.params;
    const { INVALTURA, INVMAXUNID, INVFLAGEXT, INVORDEN } = req.body;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('INVBODEGA', sql.VarChar, INVBODEGA)
            .input('INVUBICA', sql.VarChar, INVUBICA)
            .input('INVALTURA', sql.Numeric(20, 4), INVALTURA)
            .input('INVMAXUNID', sql.Numeric(20, 4), INVMAXUNID)
            .input('INVFLAGEXT', sql.VarChar, INVFLAGEXT)
            .input('INVORDEN', sql.VarChar, INVORDEN)
            .query("UPDATE INVCATUBICA SET INVALTURA=@INVALTURA, INVMAXUNID=@INVMAXUNID, INVFLAGEXT=@INVFLAGEXT, INVORDEN=@INVORDEN WHERE INVBODEGA=@INVBODEGA AND INVUBICA=@INVUBICA");

        res.send("Ubicación actualizada correctamente");
    } catch (error) {
        res.status(500).send("Error al actualizar datos: " + error);
    }
});

// Ruta para eliminar una ubicación
app.delete('/ubicaciones/:INVBODEGA/:INVUBICA', async (req, res) => {
    const { INVBODEGA, INVUBICA } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('INVBODEGA', sql.VarChar, INVBODEGA)
            .input('INVUBICA', sql.VarChar, INVUBICA)
            .query("DELETE FROM INVCATUBICA WHERE INVBODEGA=@INVBODEGA AND INVUBICA=@INVUBICA");

        res.send("Ubicación eliminada correctamente");
    } catch (error) {
        res.status(500).send("Error al eliminar datos: " + error);
    }
});


module.exports = app;
