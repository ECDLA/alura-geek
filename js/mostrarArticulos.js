import { conexionAPI, eliminarObjeto, agregarObjeto } from './conexionAPI.js';

const articulos = document.querySelector('[data-articulos]');

function crearCarta(urlImagen, titulo, precio, id) {
    const carta = document.createElement('div');
    carta.className = 'articulos__articulo';
    carta.setAttribute('id', id);

    carta.innerHTML =
    `
    <img src="${urlImagen}" alt="Articulo de la tienda" class="productos__imagen">
    <h3 class="productos__tiutloArticulo">${titulo}</h3>
    
    <div class="productos__grupoPrecioYEliminar">
        <p class="productos__precioArticulo">$ ${precio}</p>
        <img src="assets/iconos/basura.svg" alt="Icono, bote de basura" data-eliminarCarta>
    </div>
    `

    return carta;
}

async function mostrarArticulos() {
    let articulo = await conexionAPI();

    articulo.forEach(articulo => {
        articulos.appendChild(crearCarta(articulo.urlImagen, articulo.titulo, articulo.precio, articulo.id));
    })

    eliminarArticulo();
}

function eliminarArticulo() {
    const eliminar = document.querySelectorAll('[data-eliminarCarta]');
    
    eliminar.forEach(id => {
        id.addEventListener('click', carta => {
            carta.preventDefault();

            const idPadre = carta.target.parentElement.parentElement;

            idPadre.remove();

            eliminarObjeto(idPadre.id);

        });
    })
}

function generarHexAleatorio() {
    // Usa la Web Crypto API para generar un Uint8Array de 32 bytes aleatorios.
    const arrayAleatorio = window.crypto.getRandomValues(new Uint8Array(2));

    // Convierte el Uint8Array a una cadena hexadecimal.
    const hexAleatorio = Array.from(arrayAleatorio).map(b => b.toString(16).padStart(2, '0')).join('');

    return hexAleatorio;
}

function agregarArticulo() {
    const id = generarHexAleatorio();

    document.querySelector('form').addEventListener('submit', evento => {
        evento.preventDefault();
        evento.reload();

        const data = Object.fromEntries(
            new FormData(evento.target)
        )

        // alert(JSON.stringify(data));

        const nombreDelArticulo = data.nombreDelArticulo;
        const precioDelArticulo = data.precioDelArticulo;
        const urlImagen = data.urlImagen;

        agregarObjeto(nombreDelArticulo, precioDelArticulo, urlImagen);
    })
}

mostrarArticulos();
agregarArticulo();