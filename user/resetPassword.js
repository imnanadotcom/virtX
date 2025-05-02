document.addEventListener('DOMContentLoaded', () => {
    const updatePasswordForm = document.getElementById('update-password-form');
    const passwordUpdateError = document.getElementById('password-update-error');

    updatePasswordForm.addEventListener('submit', async (event) => {
        const jwtToken = localStorage.getItem('jwtToken');
        event.preventDefault(); 

        const newPasswordValue = document.getElementById('new-password').value;
        const confirmNewPasswordValue = document.getElementById('confirm-new-password').value;

        const password = document.getElementById('old-password').value;

        if (newPasswordValue !== confirmNewPasswordValue) {
            passwordUpdateError.textContent = 'Las nuevas contraseñas no coinciden.';
            passwordUpdateError.style.display = 'block';
            return; 
        }else{

            try {
                const response = await fetch('http://localhost:8080/api/account/password-reset', { // Reemplaza con la URL de tu API de login
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "old_password" :  password , "new_password": newPasswordValue }),
                });
        
                const data = await response.json();
                if (response.ok) {
                    window.location.reload();
                }else if(response.status === 400){
                    passwordUpdateError.textContent = data ||'Contraseña Incorrecta.';
                    passwordUpdateError.style.display = 'block';
                }else if (response.status === 401){
                    localStorage.removeItem('jwtToken');
                    window.location.href = "/index.html";
                    
                }
            } catch (error) {
                console.error('Error en el registro:', error);
                passwordUpdateError.textContent = 'Error de conexión con el servidor.';
                passwordUpdateError.style.display = 'block';
            }

        }
    
       
    });


});