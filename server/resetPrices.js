const mongoose = require('mongoose');

async function resetearPrecios() {
  try {
    // Tu cadena de conexión a Atlas
    const uri = "mongodb+srv://facundoguiraldes101_db_user:mWC9QquYrfIoTxI5@suplecluster.gijg5z3.mongodb.net/suplehub_db?appName=SupleCluster"; 
    
    console.log("Conectando a MongoDB Atlas...");
    await mongoose.connect(uri);
    
    const db = mongoose.connection.db;

    // Apuntamos directamente a la colección 'products'
    const resultado = await db.collection('products').updateMany({}, { $set: { precio: 0 } });

    console.log(`✅ ¡Misión cumplida!`);
    console.log(`🚀 Se actualizaron ${resultado.modifiedCount} documentos en la colección 'products'.`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error durante el proceso:", error);
    process.exit(1);
  }
}

resetearPrecios();