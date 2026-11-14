import { reconocimientos, resumenUsuario, usuarios } from '../repos/datos.repo.js';

const adhesiones = new Map();

function presentar(reconocimiento, usuarioId) {
    const autor = usuarios.find(persona => persona.id === reconocimiento.autorId);
    const destinatario = usuarios.find(persona => persona.id === reconocimiento.destinatarioId);
    const usuariosConEstrella = adhesiones.get(reconocimiento.id);
    return {
        ...reconocimiento,
        autor: resumenUsuario(autor),
        destinatario: resumenUsuario(destinatario),
        estrellas: usuariosConEstrella?.size ?? 0,
        estrellaActiva: usuariosConEstrella?.has(usuarioId) ?? false
    };
}

export function listar(usuario, vista) {
    const resultados = reconocimientos.filter(item => {
        if (vista === 'enviados') return item.autorId === usuario.id;
        if (vista === 'recibidos') return item.destinatarioId === usuario.id;
        if (vista === 'carrera') {
            const destinatario = usuarios.find(persona => persona.id === item.destinatarioId);
            return destinatario.carreraId === usuario.carreraId;
        }
        return true;
    });

    return resultados.reverse().map(item => presentar(item, usuario.id));
}

export function crear(autorId, datos) {
    const { destinatarioId, mensaje } = datos;
    if (!Number.isSafeInteger(destinatarioId) || destinatarioId === autorId ||
        typeof mensaje !== 'string' || !mensaje.trim() || mensaje.trim().length > 500) {
        return { estado: 400, cuerpo: { mensaje: 'Selecciona a otra persona y escribe un mensaje de 1 a 500 caracteres' } };
    }

    if (!usuarios.some(persona => persona.id === destinatarioId)) {
        return { estado: 404, cuerpo: { mensaje: 'No encontramos a la persona que quieres reconocer.' } };
    }

    const reconocimiento = {
        id: reconocimientos.length + 1,
        autorId,
        destinatarioId,
        mensaje: mensaje.trim(),
        creadoEn: new Date().toISOString(),
        meGusta: 0,
        valoracion: null
    };
    reconocimientos.push(reconocimiento);
    return { estado: 201, cuerpo: presentar(reconocimiento, autorId) };
}

export function actualizarEstrella(id, usuarioId, activa) {
    if (!/^\d+$/.test(id) || !Number.isSafeInteger(Number(id)) || Number(id) < 1 || typeof activa !== 'boolean') {
        return { estado: 400, cuerpo: { mensaje: 'Indica un ID válido y el estado de la estrella' } };
    }

    const reconocimiento = reconocimientos.find(item => item.id === Number(id));
    if (!reconocimiento) {
        return { estado: 404, cuerpo: { mensaje: 'No encontramos ese reconocimiento.' } };
    }

    if (reconocimiento.autorId === usuarioId) {
        return { estado: 403, cuerpo: { mensaje: 'Solo puedes sumarte a reconocimientos de otras personas' } };
    }

    const usuariosConEstrella = adhesiones.get(reconocimiento.id) ?? new Set();
    if (activa) {
        usuariosConEstrella.add(usuarioId);
    } else {
        usuariosConEstrella.delete(usuarioId);
    }
    adhesiones.set(reconocimiento.id, usuariosConEstrella);

    return { estado: 200, cuerpo: presentar(reconocimiento, usuarioId) };
}
