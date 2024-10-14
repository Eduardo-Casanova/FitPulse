let token = '';

document.getElementById('login').addEventListener('click', login); // Agrega el event listener al botón

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validación del correo electrónico
    if (!validateEmail(email)) {
        showResult('Por favor, introduce un correo electrónico válido.', true);
        return;
    }

    fetch('/api/login', { // Usa la ruta relativa para la API
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            token = data.token;
            showResult('Inicio de sesión exitoso. Redirigiendo...', false);
            clearInputFields();

            // Guardar el token en localStorage
            localStorage.setItem('jwtToken', token);

            // Redirigir a dashboard.html
            setTimeout(() => {
                window.location.href = '/dashboard'; // Redirige a dashboard.html
            }, 1500); // Redirige después de 1.5 segundos
        } else {
            showResult('Error: ' + (data.error || 'Error desconocido'), true);
        }
    })
    .catch(error => {
        showResult('Error: ' + error, true);
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showResult(message, isError) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = message;
    resultDiv.className = isError ? 'result error' : 'result success';
}

function clearInputFields() {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}
