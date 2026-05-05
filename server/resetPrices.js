/**
 * resetPrices.js
 *
 * Script de mantenimiento para SupleHubZN.
 * Uso: resetear el precio de todos los productos a $0 para testear
 * el flujo de caja sin valores reales en entornos de desarrollo/staging.
 *
 * Ejecución:
 *   node resetPrices.js
 *
 * Requiere la variable de entorno MONGO_URI definida en server/.env.
 */

'use strict';

require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('❌  MONGO_URI no está definida. Verificá el archivo .env en server/');
    process.exit(1);
}

async function resetPrices() {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        console.log('✅  Conectado a MongoDB');

        const db = client.db();

        // Actualiza el campo "precio" a 0 en toda la colección "products"
        const result = await db
            .collection('products')
            .updateMany({}, { $set: { precio: 0 } });

        console.log(`✅  ${result.modifiedCount} producto(s) actualizado(s) a precio $0`);
    } catch (err) {
        console.error('❌  Error durante el reset de precios:', err.message);
        process.exit(1);
    } finally {
        await client.close();
        console.log('🔌  Conexión cerrada');
    }
}

resetPrices();
