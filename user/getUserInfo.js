document.addEventListener('DOMContentLoaded', () => {
    const jwtToken = localStorage.getItem('jwtToken');

    if (!jwtToken) {
        // Si no hay token, redirigir a error.html
        window.location.href = '/error.html';
        return; // Detener la ejecución del resto del script
    }

    fetch('http://localhost:8080/api/account', {
        headers: {
            'Authorization': `Bearer ${jwtToken}` // Adjuntar el token en el encabezado Authorization
        }
    })
        .then(response => {
            if (!response.ok) {
                // Si la respuesta no es exitosa (ej. 401 Unauthorized), redirigir a error.html
                window.location.href = '/error.html';
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(userData => {
            // Actualizar los elementos HTML con los datos del usuario recibidos de la API
            document.getElementById("user-name").textContent = userData.name || "No disponible";
            document.getElementById("user-email").textContent = userData.email || "No disponible";
            document.getElementById("user-role").textContent = userData.role || "No disponible";
        })
        .catch(error => {
            console.error('Error al obtener los datos del usuario:', error);
            // Ya se redirigió a error.html en caso de error en la respuesta
            // Aquí podrías manejar otros tipos de errores de fetch si es necesario
        });
});