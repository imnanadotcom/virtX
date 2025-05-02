document.addEventListener('DOMContentLoaded', () => {
    const editUserForm = document.getElementById('edit-user-form');
    const editUserErrorDiv = document.getElementById('user-change-error');

    editUserForm.addEventListener('submit', async (event) => {
        const jwtToken = localStorage.getItem('jwtToken');
        event.preventDefault(); 

        const name = document.getElementById('edit-user-field').value;
        const password = document.getElementById('password-field').value;

        try {
            const response = await fetch('http://localhost:8080/api/account', { // Reemplaza con la URL de tu API de login
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "name" :  name , "password": password }),
            });

            const data = await response.json();

            if (response.ok) {
                window.location.reload();
            }else if(response.status === 400){
                editUserErrorDiv.textContent = 'Contraseña Incorrecta.';
                editUserErrorDiv.style.display = 'block';
            }else if (response.status === 401){
                localStorage.removeItem('jwtToken');
                window.location.href = "/index.html";
                
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            editUserErrorDiv.textContent = 'Error de conexión con el servidor.';
            editUserErrorDiv.style.display = 'block';
        }
    
       
    });


});