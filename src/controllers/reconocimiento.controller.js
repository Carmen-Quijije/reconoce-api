import * as servicio from '../services/reconocimiento.service.js';

export function listar(req, res) {
    const { vista = 'todos' } = req.query;
    if (!['todos', 'carrera', 'recibidos', 'enviados'].includes(vista)) {
        return res.status(400).json({ mensaje: 'Vista no válida' });
    }
    res.json(servicio.listar(req.usuario, vista));
}

export function crear(req, res) {
    const { estado, cuerpo } = servicio.crear(req.usuario.id, req.body ?? {});
    res.status(estado).json(cuerpo);
}
