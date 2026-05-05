const contenedor = document.getElementById('productos-container');

async function cargarProductos() {
    try {
        // Llamada a tu API
        const respuesta = await fetch('https://tu-url-de-render.onrender.com/api/productos');
        const productos = await respuesta.json();

        // Limpiamos el mensaje de "Cargando..."
        contenedor.innerHTML = '';

        // Recorremos los productos y creamos el HTML para cada uno
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
        contenedor.innerHTML = '<p>Error al conectar con el servidor. ¿Está encendido el Backend?</p>';
    }
}

cargarProductos();