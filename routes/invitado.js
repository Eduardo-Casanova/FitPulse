// routes/invitado.js
import express from 'express';
import usuarios from '../data/WEB.json' assert { type: 'json' }; // Afirmación de tipo para JSON

const router = express.Router();

// Obtener usuarios por estado de invitado
router.get('/:estado', (req, res) => {
  const estado = req.params.estado.toLowerCase();
  const usuariosInvitado = usuarios.filter(u => u.invitado.toLowerCase() === estado);

  if (usuariosInvitado.length > 0) {
    res.json(usuariosInvitado);
  } else {
    res.status(404).json({ message: 'No se encontraron usuarios con ese estado de invitado' });
  }
});

// Exportar el router como valor por defecto
export default router;
