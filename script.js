const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessageElement = document.getElementById('errorMessage');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent actual form submission

    errorMessageElement.textContent = ''; // Clear previous error messages
    errorMessageElement.classList.remove('show'); // Hide error message

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === '') {
        errorMessageElement.textContent = 'Username or Email is required.';
        errorMessageElement.classList.add('show'); // Show error message
        return;
    }

    if (password === '') {
        errorMessageElement.textContent = 'Password is required.';
        errorMessageElement.classList.add('show'); // Show error message
        return;
    }

    // If validation passes, make a fetch request to the backend
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json().then(data => ({ ok: response.ok, status: response.status, body: data })))
    .then(result => {
        if (result.ok && result.body.success) {
            // Redirect to dashboard on successful login
            window.location.href = 'dashboard.html';
        } else {
            // Display error message from backend
            errorMessageElement.textContent = result.body.message || 'Login failed. Please try again.';
            errorMessageElement.classList.add('show'); // Show error message
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        errorMessageElement.textContent = 'An error occurred. Please try again.';
        errorMessageElement.classList.add('show'); // Show error message
    });
});
