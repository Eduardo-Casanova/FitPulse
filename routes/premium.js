// routes/premium.js
import express from 'express';
import usuarios from '../data/WEB.json' assert { type: 'json' }; // Afirmación de tipo para JSON

const router = express.Router();

// Obtener usuarios por estado de premium
router.get('/:estado', (req, res) => {
  const estado = req.params.estado.toLowerCase();
  const usuariosPremium = usuarios.filter(u => u.premium.toLowerCase() === estado);

  if (usuariosPremium.length > 0) {
    res.json(usuariosPremium);
  } else {
    res.status(404).json({ message: 'No se encontraron usuarios con ese estado de premium' });
  }
});

// Exportar el router como valor por defecto
export default router;
