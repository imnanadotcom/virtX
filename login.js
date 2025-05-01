document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginErrorDiv = document.getElementById('login-error');
  
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Evitar la recarga de la página
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      try {
        const response = await fetch('http://localhost:8080/api/login', { // Reemplaza con la URL de tu API de login
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "email" :  email , "password": password }),
        });


        
  
        const data = await response.json();
  
        if (response.ok && data.token) {
          // Almacenar el JWT
          localStorage.setItem('jwtToken', data.token);
  
          // Redirigir a la página principal o a la siguiente página
          window.location.href = 'index.html';
        } else {
          // Mostrar mensaje de error
          loginErrorDiv.textContent = data.message || 'Error al iniciar sesión. Credenciales incorrectas.';
          loginErrorDiv.style.display = 'block';
        }
      } catch (error) {
        console.error('Error en la petición de login:', error);
        loginErrorDiv.textContent = 'Error de conexión con el servidor.';
        loginErrorDiv.style.display = 'block';
      }
    });
  });   