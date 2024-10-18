require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes'); // Importar el archivo de rutas principal

// Middlewares
app.use(express.json());
app.use(cors());

// Usar el archivo de rutas principal
app.use('/api', routes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
