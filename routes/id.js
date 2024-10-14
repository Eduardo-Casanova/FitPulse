// routes/id.js
import express from 'express';
import usuarios from '../data/WEB.json' assert { type: 'json' }; // Afirmación de tipo para JSON

const router = express.Router();

// Obtener un usuario por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.ID === id);

  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

// Exportar el router como valor por defecto
export default router;
