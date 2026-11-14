# reconoce-tlc-api

Reconoce TLC es el muro de reconocimientos del Tecnológico Liceo Cristiano. Los estudiantes y docentes pueden agradecer la ayuda de otras personas de la comunidad, consultar las publicaciones del muro y revisar los reconocimientos que han recibido o enviado.

El avance incluye **8 de los 16 endpoints previstos (50 %)**. La API está hecha con Node.js y Express. Las carreras, los usuarios y los reconocimientos iniciales se cargan desde `src/repos/datos.repo.js`. Los cambios se guardan en memoria y se pierden al reiniciar el servidor.

## Perfiles y responsabilidades

| Perfil | Qué puede hacer |
| --- | --- |
| Visitante | Consultar las carreras, crear una cuenta de estudiante e iniciar sesión. |
| Estudiante | Buscar personas, enviar reconocimientos, consultar el muro y revisar su perfil y sus reconocimientos recibidos y enviados. |
| Docente | Participar en el muro con los mismos permisos que un estudiante. El usuario de ejemplo Pedro Ramírez tiene este perfil. |

## Endpoints implementados

| Endpoint | Función |
| --- | --- |
| `GET /api/carreras` | Listar las carreras disponibles para el registro. |
| `POST /api/auth/registrar` | Crear una cuenta de estudiante. |
| `POST /api/auth/login` | Iniciar sesión con usuario o correo y obtener un token. |
| `POST /api/auth/logout` | Cerrar la sesión e invalidar su token. |
| `GET /api/usuarios` | Buscar personas por nombre o usuario con `?buscar=texto`. |
| `GET /api/perfil` | Consultar los datos del usuario y sus totales de reconocimientos recibidos y enviados. |
| `GET /api/reconocimientos` | Listar los reconocimientos recientes y filtrarlos por vista. |
| `POST /api/reconocimientos` | Publicar un reconocimiento para otra persona. |

## Endpoints pendientes

| Endpoint | Función prevista |
| --- | --- |
| `POST /api/auth/recuperar-contrasena` | Solicitar un enlace de recuperación. |
| `POST /api/auth/restablecer-contrasena` | Cambiar la contraseña con un token de recuperación. |
| `PATCH /api/perfil` | Editar los datos del perfil. |
| `PUT /api/perfil/foto` | Subir o reemplazar la foto del perfil. |
| `PATCH /api/reconocimientos/{id}` | Editar un reconocimiento propio. |
| `DELETE /api/reconocimientos/{id}` | Eliminar un reconocimiento propio. |
| `PUT /api/reconocimientos/{id}/me-gusta` | Dar o retirar un Me gusta. |
| `PUT /api/reconocimientos/{id}/valoracion` | Valorar un reconocimiento recibido. |

## Ejecutar y probar

Desde la carpeta del proyecto, con Node.js 18 o superior:

```bash
npm ci
npm start
```

En Postman, usa `http://127.0.0.1:4000` como URL base. Para las solicitudes con cuerpo, selecciona **Body → raw → JSON**.

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
7. Envía `POST /api/auth/logout` para cerrar la sesión. La respuesta es `204`.

Para registrar una cuenta de prueba, envía este cuerpo a `POST /api/auth/registrar`:

```json
{
  "nombre": "Camila Vega",
  "usuario": "camila.vega",
  "correo": "camila@itslc.example",
  "carreraId": 1,
  "contrasena": "CamilaDemo123!",
  "aceptaTerminos": true
}
```
