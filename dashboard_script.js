document.addEventListener('DOMContentLoaded', (event) => {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // For now, simply redirect to the login page
            window.location.href = 'index.html';
        });
    }
});
