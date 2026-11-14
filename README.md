# Reconoce TLC

Reconoce TLC es el muro de reconocimientos del Tecnológico Liceo Cristiano. Los integrantes de la comunidad del ITSLC pueden agradecer la ayuda de otras personas de la comunidad, consultar las publicaciones del muro y revisar los reconocimientos que han recibido o enviado.

## Alcance del proyecto completo

- **Inicio de sesión.** Los miembros de la comunidad ingresan con su nombre de usuario o correo institucional y su contraseña. Pueden cerrar su sesión desde el menú de su cuenta.
- **Registro.** El formulario solicita nombre completo, correo institucional, usuario, carrera, contraseña y aceptación de los términos. También permite añadir una foto de perfil.
- **Recuperación de contraseña.** La persona solicita un enlace a su correo y lo usa para ingresar y confirmar una contraseña nueva.
- **Muro de reconocimientos.** Cada publicación indica quién da el reconocimiento, quién lo recibe y qué acción se agradece. Se puede buscar a una persona por nombre o usuario, consultar el muro general o filtrar por carrera. El autor puede editar o eliminar su publicación. Los usuarios pueden dar o retirar un Me gusta. También pueden activar o desactivar la estrella para sumarse al reconocimiento publicado por otra persona.
- **Mi perfil.** Muestra los datos personales, la foto, la carrera y los totales de reconocimientos recibidos y enviados. Cada persona puede consultar ambas listas y actualizar sus propios datos y su foto.

- **Moderación de cuentas.** La única cuenta administradora puede suspender o eliminar cuentas de otros usuarios. Las cuentas suspendidas pierden el acceso a la plataforma.

## Datos del proyecto

El diseño prevé guardar usuarios, carreras, reconocimientos, reacciones y adhesiones. Cada reconocimiento se relaciona con un autor y un destinatario. Cada usuario puede registrar un Me gusta y una adhesión por publicación. Ambas acciones se pueden revertir de forma independiente. La versión final guardará los datos en una base de datos y usará el correo institucional para la recuperación de contraseña.

## Perfiles y responsabilidades

| Rol | Permisos en la versión completa |
| --- | --- |
| Administrador (`admin`) | Hay una sola cuenta administradora. Puede publicar y gestionar sus reconocimientos, dar Me gusta y sumarse con la estrella a los reconocimientos de otros. También puede suspender o eliminar cuentas de otros usuarios. |
| Usuario estándar (`usuario`) | Incluye a estudiantes, docentes y otros miembros de la comunidad del ITSLC. Puede gestionar su perfil y sus reconocimientos, buscar personas, consultar el muro, dar Me gusta y sumarse con la estrella. La suspensión y eliminación de cuentas de otros usuarios están reservadas al administrador. |

Quienes todavía no han iniciado sesión pueden consultar las carreras, registrarse como usuarios normales, iniciar sesión o solicitar la recuperación de su contraseña.

## API y estado de la entrega

Este avance implementa **9** y deja **9 pendientes**. El avance funciona con Node.js y Express. Para probar el avance, la API carga carreras, usuarios y reconocimientos de ejemplo desde `src/repos/datos.repo.js`. Los datos nuevos se guardan en memoria y se pierden al reiniciar el servidor.

## Endpoints implementados

- `GET /api/carreras` — Listar las carreras disponibles para el registro.
- `POST /api/auth/registrar` — Crear una cuenta con el rol `usuario`.
- `POST /api/auth/login` — Iniciar sesión con usuario o correo y obtener un token.
- `POST /api/auth/logout` — Cerrar la sesión e invalidar su token.
- `GET /api/usuarios` — Buscar personas por nombre o usuario con `?buscar=texto`.
- `GET /api/perfil` — Consultar los datos del usuario y sus totales de reconocimientos recibidos y enviados.
- `GET /api/reconocimientos` — Listar los reconocimientos recientes y filtrarlos por vista.
- `POST /api/reconocimientos` — Publicar un reconocimiento para otra persona.

- `PUT /api/reconocimientos/{id}/estrella` — Activar o desactivar la estrella para sumarse al reconocimiento de otra persona.

## Endpoints pendientes

- `POST /api/auth/recuperar-contrasena` — Solicitar un enlace de recuperación.
- `POST /api/auth/restablecer-contrasena` — Cambiar la contraseña con un token de recuperación.
- `PATCH /api/perfil` — Editar los datos del perfil.
- `PUT /api/perfil/foto` — Subir o reemplazar la foto del perfil.
- `PATCH /api/reconocimientos/{id}` — Editar un reconocimiento propio.
- `DELETE /api/reconocimientos/{id}` — Eliminar un reconocimiento propio.
- `PUT /api/reconocimientos/{id}/me-gusta` — Dar o retirar un Me gusta.
- `PATCH /api/usuarios/{id}/suspension` — Suspender una cuenta. Requiere el rol de administrador.
- `DELETE /api/usuarios/{id}` — Eliminar la cuenta de otro usuario. Requiere el rol de administrador.

## Ejecutar y probar

Desde la carpeta del proyecto, con Node.js 18 o superior:

```bash
npm ci
npm start
```

### Probar en Postman

Importa la colección de Reconoce TLC y ejecuta sus nueve solicitudes en orden. El inicio de sesión guarda el token. Si repites el registro, cambia el usuario y el correo o reinicia el servidor.

Para hacer las solicitudes a mano, usa `http://127.0.0.1:4000` como URL base. Para las solicitudes con cuerpo, selecciona **Body → raw → JSON**.

1. Consulta `GET /api/carreras` para ver las carreras de prueba.
2. Envía `POST /api/auth/login` con este cuerpo:

   ```json
   {
     "identificador": "ana.martinez",
     "contrasena": "AnaDemo123!"
   }
   ```

3. Copia el `token` de la respuesta y envíalo como `Authorization: Bearer <token>` en las solicitudes de perfil, usuarios, reconocimientos y cierre de sesión.
4. Consulta `GET /api/perfil` y busca un destinatario con `GET /api/usuarios?buscar=pedro`.
5. Envía `POST /api/reconocimientos` con este cuerpo:

   ```json
   {
     "destinatarioId": 2,
     "mensaje": "Gracias por ayudarme a repasar antes de la evaluación."
   }
   ```

6. Consulta `GET /api/reconocimientos?vista=enviados` para ver lo que publicaste. También puedes usar `todos`, `recibidos` o `carrera`. Esta última filtra por la carrera del destinatario.
7. Envía `PUT /api/reconocimientos/1/estrella` con el token y el cuerpo `{"activa": true}` para sumarte. La respuesta incluye el total `estrellas` y tu estado `estrellaActiva`. Envía `{"activa": false}` para retirar tu estrella.
8. Envía `POST /api/auth/logout` para cerrar la sesión. La respuesta es `204`.

El nombre completo admite espacios y varios apellidos. El usuario debe tener entre 8 y 20 caracteres. El correo debe terminar en `@tecnologicoliceocristiano.edu.ec`.

Para registrar una cuenta de prueba, envía este cuerpo a `POST /api/auth/registrar`:

```json
{
  "nombre": "Camila Vega",
  "usuario": "camila.vega",
  "correo": "prueba.reconoce@tecnologicoliceocristiano.edu.ec",
  "carreraId": 1,
  "contrasena": "CamilaDemo123!",
  "aceptaTerminos": true
}
```

Si una consulta no tiene resultados, la API devuelve `404` con un mensaje que indica qué faltó, por ejemplo «Todavía no has enviado reconocimientos». Para consultar carreras usa `GET /api/carreras`.
