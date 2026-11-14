import * as servicio from '../services/auth.service.js';
import { sesiones } from '../repos/datos.repo.js';

export function registrar(req, res) {
    const { estado, cuerpo } = servicio.registrar(req.body ?? {});
    res.status(estado).json(cuerpo);
}

export function iniciarSesion(req, res) {
    const { estado, cuerpo } = servicio.iniciarSesion(req.body ?? {});
    res.status(estado).json(cuerpo);
}

export function cerrarSesion(req, res) {
    sesiones.delete(req.token);
    res.status(204).end();
}
