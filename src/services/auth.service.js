import { randomUUID } from 'node:crypto';
import { carreras, resumenUsuario, sesiones, usuarios } from '../repos/datos.repo.js';

export function registrar(datos) {
    const { nombre, usuario, correo, contrasena, carreraId, aceptaTerminos } = datos;
    if (typeof correo !== 'string' || !/^[^\s@]+@tecnologicoliceocristiano\.edu\.ec$/i.test(correo.trim())) {
        return { estado: 400, cuerpo: { mensaje: 'Usa un correo que termine en @tecnologicoliceocristiano.edu.ec.' } };
    }

    if (typeof nombre !== 'string' || !nombre.trim() ||
        typeof usuario !== 'string' || !/^[a-z0-9._-]{8,20}$/i.test(usuario.trim()) ||
        typeof contrasena !== 'string' || contrasena.length < 8 ||
        !carreras.some(carrera => carrera.id === carreraId) || aceptaTerminos !== true) {
        return { estado: 400, cuerpo: { mensaje: 'Revisa el nombre, el usuario (de 8 a 20 caracteres), la carrera, la contraseña y los términos.' } };
    }

    const nombreUsuario = usuario.trim().toLowerCase();
    const correoInstitucional = correo.trim().toLowerCase();
    if (usuarios.some(persona => persona.usuario === nombreUsuario || persona.correo === correoInstitucional)) {
        return { estado: 409, cuerpo: { mensaje: 'El usuario o correo ya está registrado' } };
    }

    const persona = {
        id: usuarios.length + 1,
        nombre: nombre.trim(),
        usuario: nombreUsuario,
        correo: correoInstitucional,
        carreraId,
        rol: 'usuario',
        fotoUrl: null,
        contrasena
    };
    usuarios.push(persona);
    return { estado: 201, cuerpo: resumenUsuario(persona) };
}

export function iniciarSesion(datos) {
    const { identificador, contrasena } = datos;
    if (typeof identificador !== 'string' || !identificador.trim() ||
        typeof contrasena !== 'string' || !contrasena) {
        return { estado: 400, cuerpo: { mensaje: 'Ingresa el usuario o correo y la contraseña' } };
    }

    const cuenta = identificador.trim().toLowerCase();
    const persona = usuarios.find(usuario => usuario.usuario === cuenta || usuario.correo === cuenta);
    if (!persona || persona.contrasena !== contrasena) {
        return { estado: 401, cuerpo: { mensaje: 'Revisa tu usuario o correo y tu contraseña.' } };
    }

    const token = randomUUID();
    sesiones.set(token, persona.id);
    return { estado: 200, cuerpo: { token, usuario: resumenUsuario(persona) } };
}
