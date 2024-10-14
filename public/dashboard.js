// Función para agregar un usuario
async function addUser() {
    const name = document.getElementById('addName').value.trim();
    const email = document.getElementById('addEmail').value.trim();
    const weight = document.getElementById('addWeight').value.trim();
    const height = document.getElementById('addHeight').value.trim();
    const gender = document.getElementById('addGender').value.trim();
    const guest = document.getElementById('addGuest').value;
    const premium = document.getElementById('addPremium').value;

    // Validar campos
    if (!name || !email || !weight || !height || !gender) {
        showResult('Por favor, completa todos los campos.', false);
        return;
    }

    try {
        const response = await fetch('/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, weight, height, gender, guest, premium })
        });

        const data = await response.json();
        showResult(data.message || 'Usuario agregado con éxito.', data.success);
        clearAddFields();
    } catch (error) {
        showResult('Error: ' + error.message, false);
    }
}

// Función para actualizar un usuario
async function updateUser() {
    const userId = document.getElementById('updateUserId').value.trim();
    const name = document.getElementById('updateName').value.trim();
    const email = document.getElementById('updateEmail').value.trim();
    const weight = document.getElementById('updateWeight').value.trim();
    const height = document.getElementById('updateHeight').value.trim();
    const gender = document.getElementById('updateGender').value.trim();
    const guest = document.getElementById('updateGuest').value;
    const premium = document.getElementById('updatePremium').value;

    if (!userId || !name || !email || !weight || !height || !gender) {
        showResult('Por favor, completa todos los campos.', false);
        return;
    }

    try {
        const response = await fetch(`/api/usuarios/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, weight, height, gender, guest, premium })
        });

        const data = await response.json();
        showResult(data.message || 'Usuario actualizado con éxito.', data.success);
        clearUpdateFields();
    } catch (error) {
        showResult('Error: ' + error.message, false);
    }
}

// Función para eliminar un usuario
async function deleteUser() {
    const userId = document.getElementById('deleteUserId').value.trim();

    if (!userId) {
        showResult('Por favor, ingresa un ID de usuario.', false);
        return;
    }

    try {
        const response = await fetch(`/api/usuarios/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        showResult(data.message || 'Usuario eliminado con éxito.', data.success);
        document.getElementById('deleteUserId').value = '';
    } catch (error) {
        showResult('Error: ' + error.message, false);
    }
}

// Función para mostrar el resultado de la operación
function showResult(message, success) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = message;
    resultDiv.className = success ? 'result success' : 'result error';
}

// Funciones para limpiar los campos
function clearAddFields() {
    document.getElementById('addName').value = '';
    document.getElementById('addEmail').value = '';
    document.getElementById('addWeight').value = '';
    document.getElementById('addHeight').value = '';
    document.getElementById('addGender').value = '';
    document.getElementById('addGuest').value = 'true';
    document.getElementById('addPremium').value = 'true';
}

function clearUpdateFields() {
    document.getElementById('updateUserId').value = '';
    document.getElementById('updateName').value = '';
    document.getElementById('updateEmail').value = '';
    document.getElementById('updateWeight').value = '';
    document.getElementById('updateHeight').value = '';
    document.getElementById('updateGender').value = '';
    document.getElementById('updateGuest').value = 'true';
    document.getElementById('updatePremium').value = 'true';
}

// Asignar los eventos de clic a los botones
document.getElementById('addUserBtn').addEventListener('click', addUser);
document.getElementById('updateUserBtn').addEventListener('click', updateUser);
document.getElementById('deleteUserBtn').addEventListener('click', deleteUser);
