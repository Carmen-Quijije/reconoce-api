export const carreras = [
    { id: 1, nombre: 'Desarrollo de Software' },
    { id: 2, nombre: 'Administración' }
];

export const usuarios = [
    { id: 1, nombre: 'Ana Martínez', usuario: 'ana.martinez', correo: 'ana@itslc.example', carreraId: 1, rol: 'estudiante', fotoUrl: null, contrasena: 'AnaDemo123!' },
    { id: 2, nombre: 'Pedro Ramírez', usuario: 'pedro.ramirez', correo: 'pedro@itslc.example', carreraId: 1, rol: 'docente', fotoUrl: null, contrasena: 'PedroDemo123!' },
    { id: 3, nombre: 'Lucía Torres', usuario: 'lucia.torres', correo: 'lucia@itslc.example', carreraId: 2, rol: 'estudiante', fotoUrl: null, contrasena: 'LuciaDemo123!' }
];

export const reconocimientos = [
    { id: 1, autorId: 3, destinatarioId: 2, mensaje: 'Gracias por recibirnos con una sonrisa y estar siempre dispuesto a ayudar.', creadoEn: '2026-11-12T16:00:00Z', meGusta: 2, valoracion: 5 },
    { id: 2, autorId: 3, destinatarioId: 1, mensaje: 'Gracias por compartir tus apuntes y explicar el tema con paciencia.', creadoEn: '2026-11-12T18:00:00Z', meGusta: 1, valoracion: 4 }
];

export const sesiones = new Map();

export function resumenUsuario({ id, nombre, usuario, carreraId, rol, fotoUrl }) {
    return { id, nombre, usuario, carreraId, rol, fotoUrl };
}
