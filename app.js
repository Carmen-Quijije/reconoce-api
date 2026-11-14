import express from 'express';
import authRouter from './src/routes/auth.route.js';
import comunidadRouter from './src/routes/comunidad.route.js';
import reconocimientoRouter from './src/routes/reconocimiento.route.js';

const app = express();
const puerto = process.env.PORT || 4000;

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api', comunidadRouter);
app.use('/api/reconocimientos', reconocimientoRouter);

app.use((req, res) => {
    res.status(404).json({ mensaje: 'Esa ruta no existe. Revisa la dirección de la solicitud.' });
});

app.use((error, req, res, next) => {
    if (error.status === 400) {
        return res.status(400).json({ mensaje: 'El cuerpo de la solicitud debe ser JSON válido' });
    }

    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
});

app.listen(puerto, '127.0.0.1', () => {
    console.log(`API de Reconoce TLC disponible en http://127.0.0.1:${puerto}`);
});
