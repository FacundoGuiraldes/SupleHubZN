const contenedor = document.getElementById('productos-container');

async function cargarProductos() {
    try {
        // Llamada a tu API real en Render
        const API_URL = import.meta.env.VITE_API_URL || 'https://suplehubzn-backend.onrender.com/api';
        const respuesta = await fetch(`${API_URL}/productos`);
        
        if (!respuesta.ok) {
            throw new Error(`Error en el servidor: ${respuesta.status}`);
        }

        const productos = await respuesta.json();

        // Limpiamos el contenedor
        contenedor.innerHTML = '';

        // Si no hay productos, mostramos un mensaje
        if (productos.length === 0) {
            contenedor.innerHTML = '<p>No hay productos disponibles por el momento.</p>';
            return;
        }

        // Recorremos los productos y creamos el HTML
        productos.forEach(producto => {
            const card = document.createElement('div');
            card.classList.add('producto-card');

            card.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p class="categoria">${producto.categoria}</p>
                <p>${producto.descripcion}</p>
                <p class="precio">$${producto.precio.toLocaleString('es-AR')}</p>
                <button class="btn-comprar">Agregar al carrito</button>
            `;
            contenedor.appendChild(card);
        });

    } catch (error) {
        console.error("Error al cargar productos:", error);
        contenedor.innerHTML = '<p>Error al conectar con el servidor. Por favor, intenta más tarde.</p>';
    }
}

// Iniciamos la carga
cargarProductos();