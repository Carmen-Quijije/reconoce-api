import { reconocimientos, resumenUsuario, usuarios } from '../repos/datos.repo.js';

function presentar(reconocimiento) {
    const autor = usuarios.find(persona => persona.id === reconocimiento.autorId);
    const destinatario = usuarios.find(persona => persona.id === reconocimiento.destinatarioId);
    return { ...reconocimiento, autor: resumenUsuario(autor), destinatario: resumenUsuario(destinatario) };
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

    return resultados.reverse().map(presentar);
}

export function crear(autorId, datos) {
    const { destinatarioId, mensaje } = datos;
    if (!Number.isSafeInteger(destinatarioId) || destinatarioId === autorId ||
        typeof mensaje !== 'string' || !mensaje.trim() || mensaje.trim().length > 500) {
        return { estado: 400, cuerpo: { mensaje: 'Selecciona a otra persona y escribe un mensaje de 1 a 500 caracteres' } };
    }

    if (!usuarios.some(persona => persona.id === destinatarioId)) {
        return { estado: 404, cuerpo: { mensaje: 'Destinatario no encontrado' } };
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
    return { estado: 201, cuerpo: presentar(reconocimiento) };
}
