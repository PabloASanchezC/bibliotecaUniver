document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('swiper-contenedor-libros');

    // 1. Leer los libros desde el archivo JSON de la carpeta
    fetch('naturales.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo de libros de ciencias naturales");
            }
            return response.json();
        })
        .then(libros => {
            let htmlSlides = "";

            // 2. Generar dinámicamente cada slide del Swiper
            libros.forEach(libro => {
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
                        <a href="${libro.url_libro}" class="btn-1" target="_blank">${libro.texto_boton}</a>
                    </div>
                `;
            });

            // 3. Inyectar los elementos en el DOM
            contenedor.innerHTML = htmlSlides;

            // 4. INICIALIZAR SWIPER (Obligatorio hacerlo después de inyectar el HTML)
            inicializarCarrusel();
        })
        .catch(error => console.error('Error al renderizar los libros:', error));
});

// Función Swiper
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