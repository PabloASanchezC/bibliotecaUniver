document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('swiper-contenedor-libros');
    
    // 1. Detectar automáticamente en qué página estamos parados
    const categoriaActual = document.body.getAttribute('data-categoria');

    if (!categoriaActual) {
        console.error("Falta el atributo data-categoria en el body de este HTML.");
        return;
    }

    // 2. Hacer fetch al JSON
    fetch('../libros.json')
        .then(response => {
            if (!response.ok) throw new Error("No se pudo cargar el archivo central de la biblioteca");
            return response.json();
        })
        .then(todoElCatalogo => {
            
            // 3. LA MAGIA: Filtramos el JSON gigante dejando solo la clasificación de esta página
            const librosFiltrados = todoElCatalogo.filter(libro => libro.categoria === categoriaActual);

            if (librosFiltrados.length === 0) {
                contenedor.innerHTML = `<div class="swiper-slide"><p>No hay libros disponibles en esta categoría.</p></div>`;
                return;
            }

            let htmlSlides = "";

            // 4. Construimos el carrusel solo con los libros filtrados
            librosFiltrados.forEach(libro => {
                htmlSlides += `
                    <div class="swiper-slide">
                        <div class="icons"> 
                            <a href="../index.html" style="color: inherit;"><i class="fa-solid fa-circle-arrow-left"></i></a>
                            <img src="images/logo.png" alt="Logo">
                            <i class="fa-regular fa-heart"></i>
                        </div>
                        <div class="product-content">
                            <div class="product-txt">
                                <span>${libro.subcategoria}</span>
                                <h3>${libro.titulo}</h3>
                                <p>Autor: ${libro.autor}</p>
                            </div>
                            <div class="product-img">
                                <img src="${libro.imagen}" alt="${libro.titulo}">
                            </div>
                        </div>
                        <a href="${libro.url_libro}" class="btn-swiper" target="_blank">Ver</a>
                    </div>
                `;
            });

            contenedor.innerHTML = htmlSlides;

            // 5. Encendemos el Swiper 3D
            inicializarCarrusel();
        })
        .catch(error => console.error('Error en el catálogo dinámico:', error));
});

function inicializarCarrusel() {
    new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        coverflowEffect: {
            depth: 500,
            modifier: 1,
            slideShadows: true,
            rotate: 0,
            stretch: 0
        }
    });
}