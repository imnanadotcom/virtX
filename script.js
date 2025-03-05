let index = 0;
const slides = document.querySelector(".carousel");
const slideImages = document.querySelectorAll(".carousel img");
const totalSlides = slideImages.length;

// Ajustar dinámicamente el ancho del carrusel para que cada imagen tenga su espacio
slides.style.width = `${totalSlides * 100}vw`; // Cada imagen ocupa 100vw
slideImages.forEach(img => img.style.width = `100vw`); // Cada imagen se ajusta al ancho completo

// Función para mover el carrusel
function moveSlide(step) {
    index += step;

    // Si se pasa del último, vuelve al primero y viceversa
    if (index < 0) {
        index = totalSlides - 1;
    } else if (index >= totalSlides) {
        index = 0;
    }

    // Mueve el carrusel con translateX
    slides.style.transform = `translateX(${-index * 100}vw)`;
}

// Función para mover automáticamente el carrusel cada 3 segundos
function autoMove() {
    moveSlide(1);
}

// Iniciar auto-movimiento
let autoSlide = setInterval(autoMove, 3000);

// Eventos de los botones
document.querySelector(".prev").addEventListener("click", function () {
    moveSlide(-1);
    resetAutoSlide();
});

document.querySelector(".next").addEventListener("click", function () {
    moveSlide(1);
    resetAutoSlide();
});

// Reiniciar el auto-movimiento cuando el usuario interactúa

function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(autoMove, 3000);

}

