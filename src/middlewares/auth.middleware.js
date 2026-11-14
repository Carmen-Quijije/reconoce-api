import { sesiones, usuarios } from '../repos/datos.repo.js';

export function verificarSesion(req, res, next) {
    const token = req.get('Authorization')?.match(/^Bearer ([^\s]+)$/i)?.[1];
    const usuario = usuarios.find(persona => persona.id === sesiones.get(token));
    if (!usuario) {
        return res.status(401).json({ mensaje: 'Se requiere una sesión válida' });
    }

    req.usuario = usuario;
    req.token = token;
    next();
}
