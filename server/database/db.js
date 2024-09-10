const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10), // Convertir el puerto a número
    options: {
        encrypt: true,  // Esto es necesario para Azure, pero lo puedes cambiar si no es necesario
        trustServerCertificate: true, // Requerido para conexiones locales a SQL Server
    }
};

async function getConnection() {
    try {
        let pool = await sql.connect(config);
        console.log("Conectado a la base de datos");
        return pool;
    } catch (error) {
        console.error("Error conectando a la base de datos:", error);
        throw error;
    }
}

module.exports = {
    sql,
    getConnection
};
