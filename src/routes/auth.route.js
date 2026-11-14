import { Router } from 'express';
import * as controller from '../controllers/auth.controller.js';
import { verificarSesion } from '../middlewares/auth.middleware.js';

const router = Router();
router.post('/registrar', controller.registrar);
router.post('/login', controller.iniciarSesion);
router.post('/logout', verificarSesion, controller.cerrarSesion);

export default router;
