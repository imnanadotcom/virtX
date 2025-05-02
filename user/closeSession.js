document.addEventListener('DOMContentLoaded', () => {
    const nuevoBoton = document.getElementById('sesion')
    if (nuevoBoton) {
        nuevoBoton.addEventListener('click', (event) => {
            event.preventDefault(); // Evita la navegación por defecto del enlace

            localStorage.removeItem('jwtToken');
            window.location.href = '/index.html';

        });
    } else {
        console.error('No se encontró el botón con la imagen 34.png');
    }
});