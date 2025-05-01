document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('a.btn-outline-primary');
    let submenuVisible = false;
    let currentSubmenu = null;
    let handleClickOutsideListener = null;

    loginButton.addEventListener('click', (event) => {
        event.preventDefault(); // Evita la redirección por defecto

        const jwtToken = localStorage.getItem('jwtToken');

        if (jwtToken) {
            if (submenuVisible && currentSubmenu) {
                // Si el submenú está visible, lo removemos y limpiamos
                currentSubmenu.remove();
                currentSubmenu = null;
                submenuVisible = false;
                if (handleClickOutsideListener) {
                    document.removeEventListener('click', handleClickOutsideListener);
                    handleClickOutsideListener = null;
                }
            } else {
                // Si el submenú no está visible, lo creamos y lo mostramos
                const submenu = document.createElement('div');
                submenu.classList.add('dropdown-menu', 'show');
                submenu.style.position = 'absolute';

                const buttonRect = loginButton.getBoundingClientRect();
                const submenuWidth = 180; 
                const windowWidth = window.innerWidth;
                const buttonCenter = buttonRect.left + buttonRect.width / 2;
                let leftPosition = buttonCenter - submenuWidth / 2; 

                // Ajustar si se sale por la izquierda
                if (leftPosition < 10) {
                    leftPosition = 10;
                }

                // Ajustar si se sale por la derecha
                if (leftPosition + submenuWidth > windowWidth - 10) {
                    leftPosition = windowWidth - submenuWidth - 10;
                }

                submenu.style.top = buttonRect.bottom + window.scrollY + 'px';
                submenu.style.left = leftPosition + 'px';

                const logoutItem = document.createElement('a');
                logoutItem.classList.add('dropdown-item');
                logoutItem.textContent = 'Cerrar Sesión';

                const userInfoItem = document.createElement('a');
                userInfoItem.classList.add('dropdown-item');
                // Vista de la Informacion del usuario
                userInfoItem.href = 'user/UserInfo.html';
                userInfoItem.textContent = 'Información del Usuario';

                submenu.appendChild(logoutItem);
                submenu.appendChild(userInfoItem);
                document.body.appendChild(submenu); // Añadir al body

                currentSubmenu = submenu;
                submenuVisible = true;

                // Ocultar el submenú al hacer clic fuera de él
                handleClickOutsideListener = (event) => {
                    if (!loginButton.contains(event.target) && !submenu.contains(event.target)) {
                        submenu.remove();
                        currentSubmenu = null;
                        submenuVisible = false;
                        document.removeEventListener('click', handleClickOutsideListener);
                        handleClickOutsideListener = null;
                    }
                };
                document.addEventListener('click', handleClickOutsideListener);

                logoutItem.addEventListener('click', () => {
                    localStorage.removeItem('jwtToken');
                    submenu.remove();
                    currentSubmenu = null;
                    submenuVisible = false;
                    if (handleClickOutsideListener) {
                        document.removeEventListener('click', handleClickOutsideListener);
                        handleClickOutsideListener = null;
                    }
                    window.location.reload();
                });

                userInfoItem.addEventListener('click', () => {
                    if (handleClickOutsideListener) {
                        document.removeEventListener('click', handleClickOutsideListener);
                        handleClickOutsideListener = null;
                    }
                });
            }
        } else {
            window.location.href = 'login.html';
        }
    });
});