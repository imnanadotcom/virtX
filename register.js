document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginErrorDiv = document.getElementById('register-error');
  
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Evitar la recarga de la página
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const name = document.getElementById('name').value;
      try {
        const response = await fetch('http://localhost:8080/api/register', { // Reemplaza con la URL de tu API de login
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "name": name , "email" :  email , "password": password }),
        });


        
  
        const data = await response.json();
  
        if (response.ok ) {
          window.location.href = 'login.html';
        } else {
          // Mostrar mensaje de error
          loginErrorDiv.textContent = data.message || 'Error al registrar el usuario';
          loginErrorDiv.style.display = 'block';
        }
      } catch (error) {
        console.error('Error en el registro:', error);
        loginErrorDiv.textContent = 'Error de conexión con el servidor.';
        loginErrorDiv.style.display = 'block';
      }
    });
  });   