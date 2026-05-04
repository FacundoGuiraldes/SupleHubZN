const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor, agrega un nombre"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Por favor, agrega una descripción"]
    },
    price: {
        type: Number,
        required: [true, "Por favor, agrega un precio"],
        default: 0
    },
    category: {
        type: String,
        required: [true, "Por favor, selecciona una categoría"],
        enum: ['Proteinas', 'Creatinas', 'Aminoacidos', 'Pre-entrenos', 'Accesorios']
    },
    stock: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String,
        default: "no-image.jpg"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', ProductSchema);