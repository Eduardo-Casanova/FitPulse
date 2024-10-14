import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';

// Importar rutas
import idRoutes from './routes/id.js';
import generoRoutes from './routes/genero.js';
import invitadoRoutes from './routes/invitado.js';
import premiumRoutes from './routes/premium.js';
import usersRoutes from './routes/users.js'; // Importar rutas de usuarios
import { verificarToken } from './middlewares/auth.js'; // Importar middleware de verificación de token

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001; // Usar el puerto del archivo .env si está disponible

// Middleware de aplicación (Logger) - Se ejecuta en todas las rutas
app.use((req, res, next) => {
  console.log(`Solicitud recibida: Método: ${req.method} - Ruta: ${req.path}`);
  next(); // Pasa al siguiente middleware o ruta
});

// Middleware para parsear JSON
app.use(express.json());

// Middleware de seguridad con helmet
app.use(helmet());

// Middleware para manejo de CORS
app.use(cors());

// Middleware de rutas específicas para /api/usuarios
app.use('/api/usuarios', (req, res, next) => {
  console.log('Middleware específico para /api/usuarios');
  next();
});

// Rutas protegidas con el middleware verificarToken
app.use('/api/usuarios', verificarToken, usersRoutes);           // Rutas para usuarios
app.use('/api/usuarios/genero', verificarToken, generoRoutes);   // Rutas para consultas por género
app.use('/api/usuarios/invitado', verificarToken, invitadoRoutes); // Rutas para consultas por estado de invitado
app.use('/api/usuarios/premium', verificarToken, premiumRoutes);   // Rutas para consultas por estado de premium

// Ruta de login para generar el token
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Simulación de verificación de credenciales
  if (email === 'Eduardocasanova190@gmail.com' && password === '050827Delmy') {
    const payload = { email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciales incorrectas' });
  }
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Ocurrió un error en el servidor');
});

// Middleware para manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
