// middlewares/auth.js
import jwt from 'jsonwebtoken';

export function verificarToken(req, res, next) {
    const token = req.headers['authorization'];

    // Verificar si el token no está presente
    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    // Extraer "Bearer " del token si está presente
    const tokenSinBearer = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

    // Verificar el token
    jwt.verify(tokenSinBearer, process.env.JWT_SECRET, (err, decoded) => {
        // Manejo de errores si el token es inválido
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }

        // Almacenar la información del usuario decodificado
        req.user = decoded; 
        next(); // Pasar al siguiente middleware o ruta
    });
}
