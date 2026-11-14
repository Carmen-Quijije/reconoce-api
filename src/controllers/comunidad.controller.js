import { carreras, reconocimientos, resumenUsuario, usuarios } from '../repos/datos.repo.js';

export function listarCarreras(req, res) {
    if (carreras.length === 0) {
        return res.status(404).json({ mensaje: 'Todavía no hay carreras registradas.' });
    }
    res.json(carreras);
}

export function listarUsuarios(req, res) {
    const { buscar = '' } = req.query;
    if (typeof buscar !== 'string') {
        return res.status(400).json({ mensaje: 'El parámetro buscar debe ser texto' });
    }

    const consulta = buscar.trim().toLowerCase();
    const resultados = usuarios.filter(persona =>
        persona.nombre.toLowerCase().includes(consulta) || persona.usuario.includes(consulta)
    );
    if (resultados.length === 0) {
        const mensaje = consulta ? 'No encontramos usuarios con ese nombre.' : 'Todavía no hay usuarios registrados.';
        return res.status(404).json({ mensaje });
    }
    res.json(resultados.map(resumenUsuario));
}

export function verPerfil(req, res) {
    const persona = req.usuario;
    const recibidos = reconocimientos.filter(item => item.destinatarioId === persona.id).length;
    const enviados = reconocimientos.filter(item => item.autorId === persona.id).length;
    res.json({
        ...resumenUsuario(persona),
        correo: persona.correo,
        carrera: carreras.find(carrera => carrera.id === persona.carreraId).nombre,
        recibidos,
        enviados
    });
}
