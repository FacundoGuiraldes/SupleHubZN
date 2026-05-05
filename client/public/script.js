const contenedor = document.getElementById('productos-container');
const API_URL = 'https://suplehubzn-backend.onrender.com/api';

/* ── Carrito (LocalStorage) ─────────────────────────────── */

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito') || '[]');
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarContador() {
    const carrito = obtenerCarrito();
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const contador = document.querySelector('.cart-count');
    if (contador) {
        contador.textContent = total;
        contador.classList.toggle('cart-count--activo', total > 0);
    }
}

function mostrarToast(nombre) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = `✓ ${nombre} agregado al carrito`;
    toast.classList.add('toast--visible');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('toast--visible'), 2800);
}

function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();
    const existente = carrito.find(item => item._id === producto._id);

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({
            _id: producto._id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen || '',
            categoria: producto.categoria,
            cantidad: 1,
        });
    }

    guardarCarrito(carrito);
    actualizarContador();
    mostrarToast(producto.nombre);
}

/* ── Renderizado de tarjetas ─────────────────────────────── */

function renderizarProductos(productos) {
    contenedor.innerHTML = '';

    if (productos.length === 0) {
        contenedor.innerHTML = '<p>No hay productos disponibles por el momento.</p>';
        return;
    }

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('producto-card');

        const imagenHTML = producto.imagen
            ? `<div class="producto-img-wrapper"><img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img" loading="lazy" onerror="this.parentElement.style.display='none'"></div>`
            : '';

        card.innerHTML = `
            ${imagenHTML}
            <div class="producto-info">
                <p class="categoria">${producto.categoria}</p>
                <h3>${producto.nombre}</h3>
                <p class="descripcion">${producto.descripcion}</p>
                <p class="precio">$${producto.precio.toLocaleString('es-AR')}</p>
                <button class="btn-comprar">Agregar al carrito</button>
            </div>
        `;

        card.querySelector('.btn-comprar').addEventListener('click', () => {
            agregarAlCarrito(producto);
        });

        contenedor.appendChild(card);
    });
}

/* ── Carga inicial ───────────────────────────────────────── */

async function cargarProductos() {
    try {
        const respuesta = await fetch(`${API_URL}/productos`);

        if (!respuesta.ok) {
            throw new Error(`Error en el servidor: ${respuesta.status}`);
        }

        const productos = await respuesta.json();
        if (typeof ordenarYRenderizar === 'function') {
            ordenarYRenderizar(productos);
        } else {
            renderizarProductos(productos);
        }

    } catch (error) {
        console.error('Error al cargar productos:', error);
        contenedor.innerHTML = '<p>Error al conectar con el servidor. Por favor, intenta más tarde.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
    cargarProductos();
});
