document.addEventListener('DOMContentLoaded', () => {
    const deleteButton = document.querySelector('.delete-account-button');
    const confirmDeleteButton = document.getElementById('confirm-delete-button');
    const deletePasswordInput = document.getElementById('delete-password');
    const deleteAccountErrorDiv = document.getElementById('delete-account-error');
    const deletePasswordErrorDiv = document.getElementById('delete-password-error');
    const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));

    deleteButton.addEventListener('click', () => {
        confirmDeleteModal.show();
    });

    confirmDeleteButton.addEventListener('click', async () => {
        const password = deletePasswordInput.value;

        if (!password) {
            deletePasswordErrorDiv.textContent = 'Por favor, ingrese su contraseña.';
            deletePasswordErrorDiv.style.display = 'block';
            return;
        }

        deletePasswordErrorDiv.style.display = 'none'; 

        try {
            const response = await fetch('http://localhost:8080/api/account', { // Reemplaza con la URL correcta para eliminar la cuenta
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                },
                body: JSON.stringify({ "password": password }),
            });

            if (response.ok) {
                alert('Su cuenta ha sido eliminada exitosamente.');
                localStorage.removeItem('jwtToken')
                window.location.href = "/index.html"; 
            } else if (response.status === 400) {
                deletePasswordErrorDiv.textContent = 'Contraseña incorrecta.';
                deletePasswordErrorDiv.style.display = 'block';
            } else if (response.status === 401){
                localStorage.removeItem('jwtToken');
                window.location.href = "/index.html";
            }else {
                const errorData = await response.json();
                deleteAccountErrorDiv.textContent = errorData.message || 'Error al eliminar la cuenta.';
                deleteAccountErrorDiv.style.display = 'block';
            }
        } catch (error) {
            console.error('Error al eliminar la cuenta:', error);
            deleteAccountErrorDiv.textContent = 'Error de conexión con el servidor al intentar eliminar la cuenta.';
            deleteAccountErrorDiv.style.display = 'block';
        }
    });
});