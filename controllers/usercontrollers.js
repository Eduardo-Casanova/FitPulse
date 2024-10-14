import fs from 'fs';
import path from 'path';

// Ruta del archivo JSON
const filePath = path.join(process.cwd(), 'data/WEB.json'); // Asegúrate de que la ruta sea correcta

// Función para leer usuarios del archivo JSON
const readUsersFromFile = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        console.log("Datos leídos desde el archivo:", data); // Verificación
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.warn('El archivo no existe, retornando un arreglo vacío');
            return [];
        }
        console.error('Error al leer el archivo:', error);
        return [];
    }
};

// Función para escribir usuarios en el archivo JSON
const writeUsersToFile = (users) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2)); // Escribir el archivo JSON de forma legible
    } catch (error) {
        console.error('Error al escribir en el archivo:', error);
    }
};

// Función para agregar un nuevo usuario
const addUser = (req, res) => {
    const newUser = req.body;

    // Validar que los campos requeridos están presentes y que peso y altura son números
    if (!newUser.nombre || !newUser.correo || 
        !newUser.peso || !newUser.altura || !newUser.genero) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const peso = parseFloat(newUser.peso);
    const altura = parseFloat(newUser.altura);

    if (isNaN(peso) || isNaN(altura)) {
        return res.status(400).json({ message: 'El peso y la altura deben ser números válidos' });
    }

    // Leer usuarios existentes
    const users = readUsersFromFile();

    // Verificar si el usuario ya existe por correo
    const existingUser = users.find(u => u.correo === newUser.correo);
    if (existingUser) {
        return res.status(409).json({ message: 'El usuario ya existe con ese correo' });
    }

    // Asignar un nuevo ID (el último ID + 1)
    const newID = users.length > 0 ? users[users.length - 1].ID + 1 : 1;

    // Formatear altura a dos decimales
    const formattedAltura = altura.toFixed(2);

    // Reordenar el objeto para que el ID esté primero
    const userWithIdFirst = { ID: newID, ...newUser, altura: formattedAltura };

    // Agregar el nuevo usuario a la lista
    users.push(userWithIdFirst);

    // Escribir la nueva lista de usuarios en el archivo JSON
    writeUsersToFile(users);

    // Enviar respuesta
    res.status(201).json({
        message: 'Usuario agregado exitosamente',
        user: userWithIdFirst,
    });
};

// Función para obtener todos los usuarios
const getAllUsers = (req, res) => {
    const users = readUsersFromFile();
    console.log("Número de usuarios:", users.length); // Verificación
    res.status(200).json(users);
};

// Función para obtener un usuario por ID
const getUserById = (req, res) => {
    const userId = parseInt(req.params.id, 10); // Obtener el ID de los parámetros de la URL
    const users = readUsersFromFile();

    // Buscar el usuario por ID
    const user = users.find(u => u.ID === userId);

    if (user) {
        res.status(200).json(user); // Si se encuentra el usuario, lo retornamos
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' }); // Si no se encuentra, retornamos un error 404
    }
};

// Exportar las funciones
export { addUser, getAllUsers, getUserById };
