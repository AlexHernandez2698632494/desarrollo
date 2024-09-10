// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth.routes'); // Ajusta la ruta si es necesario
const ubicacionRoutes = require('./routes/ubicacion.routes'); // Ajusta la ruta si es necesario

const port = 3000;
// Permite CORS para todas las solicitudes
app.use(cors());
// Middleware para parsear JSON
app.use(express.json());

// Usar rutas
app.use('/auth', authRoutes); // Prefijo '/auth' para todas las rutas de auth.js
app.use('/api', ubicacionRoutes); // Prefijo '/api' para todas las rutas de ubicacion.js

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://192.168.1.153:${port}`);
});
