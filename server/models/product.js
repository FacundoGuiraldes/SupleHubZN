const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true, min: 0 },
    categoria: { type: String, required: true }, // Ej: Proteínas, Creatinas
    imagen: { type: String }, // Aquí irá la URL de la foto
    stock: { type: Number, default: 0 },
    fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);