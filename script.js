const carrito=document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista =document.querySelector('#lista-carrito tbod');
const VaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargareventlisteners();

function cargareventlisteners() {

    elementos1.addEventListener('click , comprarElemento');
    carrito.addEventListener('click , EliminarElemento');
    VaciarCarritoBtn.addEventListener8('click , VaciarCarrito');

}

function comprarElemento(e) {
    e.preventdefault();
    if(e.target.classlist.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
        <img src="${elemento.imagen}" width=100 >
        </td>
         <td>
            ${elemento.titulo}
        </td>
         <td>
            ${elemento.precio}
        </td>
         <td>
            <a herf="#" class="borrar" data-id="${elemento.id}">X </a>
        </td>
    `;

    lista.appendChild(row);

}

function EliminarElemento (e) {
    e.preventdefault();
    let elemento,
        elementoId;
        if(e.target.classlist.contains('borrar')) {
            e.target.parentElement.parentElement.remove();
            elemeneto = e.target.parentElement.parentElement;
            elementoId = elemento.querySelector('a').getAttribute('data-id');
        }
}

function vaciarcarrito() {
    while(lista.firstChild) {
        lista.removeChild(lista.firstChild);

    }
    return false;
}

