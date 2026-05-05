const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Obtener productos (con opción de filtrar por categoría)
router.get('/', async (req, res) => {
    try {
        const { categoria } = req.query; // Leemos si viene algo como ?categoria=Proteinas
        let filtro = {};

        if (categoria) {
            filtro.categoria = categoria;
        }

        const productos = await Product.find(filtro);
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productos' });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    try {
        const nuevoProducto = new Product(req.body);
        const productoGuardado = await nuevoProducto.save();
        res.status(201).json(productoGuardado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear producto', error });
    }
});

// Obtener un solo producto por ID
router.get('/:id', async (req, res) => {
    try {
        const producto = await Product.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el producto', error });
    }
});

// Borrar un producto
router.get('/delete/:id', async (req, res) => {
    try {
        const productoEliminado = await Product.findByIdAndDelete(req.params.id);
        if (!productoEliminado) {
            return res.status(404).json({ mensaje: 'No se encontró el producto para borrar' });
        }
        res.json({ mensaje: 'Producto eliminado correctamente', producto: productoEliminado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el producto', error });
    }
});

module.exports = router;