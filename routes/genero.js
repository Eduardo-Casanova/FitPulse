// routes/genero.js
import express from 'express';
import usuarios from '../data/WEB.json' assert { type: 'json' }; // Afirmación de tipo para JSON

const router = express.Router();

// Obtener usuarios por género
router.get('/:genero', (req, res) => {
  const genero = req.params.genero.toLowerCase();
  const usuariosGenero = usuarios.filter(u => u.genero.toLowerCase() === genero);

  if (usuariosGenero.length > 0) {
    res.json(usuariosGenero);
  } else {
    res.status(404).json({ message: 'No se encontraron usuarios con ese género' });
  }
});

// Exportar el router como valor por defecto
export default router;
