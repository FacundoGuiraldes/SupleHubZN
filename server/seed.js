require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/suplehubzn';

const productos = [
  {
    nombre: 'Premium Whey Protein (1kg)',
    descripcion: 'La proteína más vendida de Argentina. 25g de proteína por scoop. Blend de concentrado, aislado e hidrolizado de suero de máxima pureza, con BCAAs y L-Glutamina.',
    precio: 71500,
    categoria: 'Proteínas',
    imagen: 'https://cdn.shopify.com/s/files/1/0567/4716/3735/files/PWI-2lb-Vainilla.png?v=1718218495',
    stock: 25,
  },
  {
    nombre: 'Hydro Whey Isolate (907g)',
    descripcion: 'Proteína de máxima pureza y rápida absorción, ideal para definición. 28g de proteína y 7.1g de BCAAs por porción. Sin grasas.',
    precio: 121500,
    categoria: 'Proteínas',
    imagen: 'https://cdn.shopify.com/s/files/1/0599/3683/3741/files/Iso-Va_2.png?v=1768316321',
    stock: 20,
  },
  {
    nombre: 'Creatina Monohidrato Star Nutrition (300g)',
    descripcion: 'Creatina micronizada grado farmacéutico. 100% pura. Aumenta fuerza y potencia. 60 porciones de 5g.',
    precio: 33000,
    categoria: 'Fuerza',
    imagen: 'https://cdn.shopify.com/s/files/1/0567/4716/3735/files/CreatineM-300g.png?v=1718218487',
    stock: 30,
  },
  {
    nombre: 'Pre-Entreno Pump V8 (285g)',
    descripcion: 'El pre-entreno más potente del mercado local. 8 ingredientes activos: Citrulina, Beta Alanina, Cafeína, Betaína y más. Máximo enfoque y pump muscular.',
    precio: 40000,
    categoria: 'Pre-entrenos',
    imagen: 'https://cdn.shopify.com/s/files/1/0567/4716/3735/files/PumpV8-GRAPE_4ea8875d-bfe5-400d-b041-c17199de0a27.png?v=1719843200',
    stock: 18,
  },
  {
    nombre: 'BCAA 2:1:1 Reload (220g)',
    descripcion: 'Aminoácidos ramificados para evitar el catabolismo y recuperar fibras. 4g de BCAAs por porción con electrolitos para rehidratación post-entrenamiento.',
    precio: 24600,
    categoria: 'Recuperación',
    imagen: 'https://acdn-us.mitiendanube.com/stores/001/247/962/products/proyecto-nuevo-20-dcc0019cac1a45761117634873886737-1024-1024.webp',
    stock: 22,
  },
  {
    nombre: 'Mass Gainer (3kg)',
    descripcion: 'Mezcla calórica de carbohidratos y proteínas para ganar peso rápido. Ideal para hardgainers que necesitan aumentar su ingesta calórica diaria.',
    precio: 95000,
    categoria: 'Ganadores',
    imagen: 'https://cdn.shopify.com/s/files/1/0567/4716/3735/files/PWI-2lb-Chocolate.png?v=1718218498',
    stock: 12,
  },
  {
    nombre: 'Micellar Casein (908g)',
    descripcion: 'Proteína de liberación lenta, ideal para consumir antes de dormir. Aporta aminoácidos de manera sostenida durante toda la noche para evitar el catabolismo.',
    precio: 110000,
    categoria: 'Proteínas',
    imagen: 'https://cdn.shopify.com/s/files/1/0599/3683/3741/files/Iso-Ch_2.png?v=1768316321',
    stock: 10,
  },
  {
    nombre: 'L-Glutamina (150g)',
    descripcion: 'Recuperador muscular y refuerzo del sistema inmunológico. 5g de L-Glutamina micronizada de máxima pureza por porción. 30 servicios.',
    precio: 23000,
    categoria: 'Recuperación',
    imagen: 'https://cdn.shopify.com/s/files/1/0567/4716/3735/files/WhatsAppImage2024-12-12at11.32.07.jpg?v=1734017745',
    stock: 28,
  },
  {
    nombre: 'Animal Pak (44 packs)',
    descripcion: 'El complejo vitamínico más completo para atletas de alto rendimiento. Más de 85 nutrientes por pack: vitaminas, minerales, aminoácidos, enzimas digestivas y antioxidantes.',
    precio: 154000,
    categoria: 'Vitaminas & Minerales',
    imagen: 'https://acdn-us.mitiendanube.com/stores/003/703/137/products/animal-pak-44-nueva-presentacion-5a2c448cacfa9ae8d217617449016673-1024-1024.webp',
    stock: 8,
  },
  {
    nombre: 'Omega 3 Fish Oil (60 caps)',
    descripcion: 'Ácidos grasos esenciales EPA y DHA para salud cardiovascular, cerebral y articular. Sin gluten, apto celíacos.',
    precio: 27000,
    categoria: 'Vitaminas & Minerales',
    imagen: 'https://acdn-us.mitiendanube.com/stores/001/247/962/products/proyecto-nuevo-20-dcc0019cac1a45761117634873886737-1024-1024.webp',
    stock: 35,
  },
  {
    nombre: 'Isopure Zero Carb (1.3kg)',
    descripcion: 'Proteína aislada premium sin carbohidratos para atletas de élite. 25g de proteína pura por porción, cero azúcares, cero lactosa.',
    precio: 195000,
    categoria: 'Proteínas',
    imagen: 'https://acdn-us.mitiendanube.com/stores/002/507/221/products/whatsapp-image-2025-04-28-at-19-25-45-01bb01164c96f1fa9617458791709188-1024-1024.webp',
    stock: 6,
  },
  {
    nombre: 'C4 Original (30 serv)',
    descripcion: 'Pre-entreno importado de nivel mundial para energía explosiva. Fórmula con Beta-Alanina, Creatina Nitrate, ArgiNO3 y Cafeína Anhidra.',
    precio: 85000,
    categoria: 'Pre-entrenos',
    imagen: 'https://cdn.shopify.com/s/files/1/0567/4716/3735/files/PumpV8-ACAI_0a4d191e-85bc-450f-9bed-63e0f4a9cb6a.png?v=1719843200',
    stock: 10,
  },
  {
    nombre: 'Creatina Monohidrato ENA Sport (200g)',
    descripcion: 'Creatina micronizada Creapure® de alta calidad para mejora del rendimiento. 100% pura, sin gluten, sin lactosa, apto vegano.',
    precio: 45000,
    categoria: 'Fuerza',
    imagen: 'https://cdn.shopify.com/s/files/1/0599/3683/3741/files/CreaPure_2.png?v=1761763735',
    stock: 25,
  },
  {
    nombre: 'ZMA (90 caps)',
    descripcion: 'Combinación de Zinc, Magnesio y Vitamina B6 para mejorar el descanso, la recuperación y los niveles de testosterona de manera natural.',
    precio: 19600,
    categoria: 'Vitaminas & Minerales',
    imagen: 'https://cdn.shopify.com/s/files/1/0567/4716/3735/files/ZMA.png?v=1718218497',
    stock: 20,
  },
  {
    nombre: 'Shaker Pro 700ml',
    descripcion: 'Mezclador oficial SupleHubZN con rejilla anti-grumos y cierre hermético. BPA Free, fácil de lavar, alta durabilidad. Con marcas de medición.',
    precio: 12000,
    categoria: 'Accesorios',
    imagen: '/shaker-suplehubzn.png',
    stock: 50,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a MongoDB');

    const existentes = await Product.countDocuments();
    if (existentes > 0) {
      console.log(`Ya hay ${existentes} productos. Limpiando colección...`);
      await Product.deleteMany({});
    }

    const insertados = await Product.insertMany(productos);
    console.log(`✓ ${insertados.length} productos insertados correctamente.`);

    insertados.forEach(p => console.log(`  - [${p.categoria}] ${p.nombre} → $${p.precio.toLocaleString('es-AR')}`));
  } catch (err) {
    console.error('Error al insertar productos:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  }
}

seed();
