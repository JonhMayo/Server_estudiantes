const express = require('express');
const path = require('path');
const rutas = require('./routes/index.js');  // Importa las rutas de la API
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const app = express();
//Cargar los certificados SSL/TLS
const options = {
    key: fs.readFileSync('certificados/key.pem'),
    cert: fs.readFileSync('certificados/cert.pem'),
};
//crear servidor https
const server = https.createServer(options, app);
//Habilitar CORS
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', rutas);

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en https://localhost:${PORT}`);
});