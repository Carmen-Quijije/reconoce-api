import * as servicio from '../services/reconocimiento.service.js';

export function listar(req, res) {
    const { vista = 'todos' } = req.query;
    if (!['todos', 'carrera', 'recibidos', 'enviados'].includes(vista)) {
        return res.status(400).json({ mensaje: 'Vista no válida' });
    }
    const reconocimientos = servicio.listar(req.usuario, vista);
    if (reconocimientos.length === 0) {
        const mensajes = {
            todos: 'Todavía no hay reconocimientos publicados.',
            carrera: 'Todavía no hay reconocimientos de tu carrera.',
            recibidos: 'Todavía no has recibido reconocimientos.',
            enviados: 'Todavía no has enviado reconocimientos.'
        };
        return res.status(404).json({ mensaje: mensajes[vista] });
    }
    res.json(reconocimientos);
}

export function crear(req, res) {
    const { estado, cuerpo } = servicio.crear(req.usuario.id, req.body ?? {});
    res.status(estado).json(cuerpo);
}

export function actualizarEstrella(req, res) {
    const { estado, cuerpo } = servicio.actualizarEstrella(req.params.id, req.usuario.id, req.body?.activa);
    res.status(estado).json(cuerpo);
}
