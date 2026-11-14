import { Router } from 'express';
import * as controller from '../controllers/reconocimiento.controller.js';
import { verificarSesion } from '../middlewares/auth.middleware.js';

const router = Router();
router.use(verificarSesion);
router.get('/', controller.listar);
router.post('/', controller.crear);
router.put('/:id/estrella', controller.actualizarEstrella);

export default router;
