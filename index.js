const express = require('express');
const path = require('path');
const rutas = require('./routes/index.js');  // Importa las rutas de la API

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', rutas);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});