// routes/users.js
import express from 'express';
import { getAllUsers, addUser } from '../controllers/usercontrollers.js'; // Asegúrate de que la ruta sea correcta
import { verificarToken } from '../middlewares/auth.js'; // Ajusta la ruta según tu estructura

const router = express.Router();

// Ruta para obtener todos los usuarios (asegúrate de que el controlador esté implementado correctamente)
router.get('/', verificarToken, getAllUsers); // Protege la ruta de obtener todos los usuarios

// Ruta para agregar un nuevo usuario (protegida)
router.post('/', verificarToken, addUser); // Añadido el middleware para proteger esta ruta

// Ruta protegida
router.get('/perfil', verificarToken, (req, res) => {
    res.json({ mensaje: 'Acceso autorizado a tu perfil', usuario: req.user });
});

// Exportar router
export default router;