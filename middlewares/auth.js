// middlewares/auth.js
import jwt from 'jsonwebtoken';

export function verificarToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    // Extraer "Bearer " del token si está presente
    const tokenSinBearer = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

    jwt.verify(tokenSinBearer, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }

        req.user = decoded; // Almacena la información del usuario decodificado
        next();
    });
}
