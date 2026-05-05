const mongoose = require('mongoose');
const Producto = require('./models/Producto'); // Verifica que la ruta a tu modelo sea correcta
require('dotenv').config();

async function resetearPrecios() {
  try {
    // 1. Conexión a la base de datos usando tu variable de entorno
    await mongoose.connect(process.env.MONGO_URI || process.env.DATABASE_URL);
    console.log("Conectado a MongoDB Atlas...");

    // 2. Actualización masiva: pone el precio en 0 a todos los documentos
    const resultado = await Producto.updateMany({}, { precio: 0 });

    console.log(`¡Éxito! Se actualizaron ${resultado.modifiedCount} productos.`);
    console.log("Ahora todos los productos en SupleHubZN valen $0.");

    process.exit(0);
  } catch (error) {
    console.error("Error al resetear precios:", error);
    process.exit(1);
  }
}

resetearPrecios();