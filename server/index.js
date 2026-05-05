const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Configuración de variables de entorno
dotenv.config({ path: path.resolve(__dirname, './.env') });

// Conexión a MongoDB
connectDB();

const app = express();

// Middlewares
// CORS permite que tu futuro Frontend se comunique con este Backend
app.use(cors()); 
app.use(express.json());

// Importar rutas
const productRoutes = require('./routes/productRoutes');
const pedidoRoutes  = require('./routes/pedidoRoutes');

// Usar rutas
app.use('/api/productos', productRoutes);
app.use('/api/pedidos',   pedidoRoutes);

// Ruta de prueba para el navegador
app.get('/', (req, res) => {
  res.send('API de SupleHubZN funcionando correctamente...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Testea los productos en: http://localhost:${PORT}/api/productos`);
});