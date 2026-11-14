import { Router } from 'express';
import * as controller from '../controllers/comunidad.controller.js';
import { verificarSesion } from '../middlewares/auth.middleware.js';

const router = Router();
router.get('/carreras', controller.listarCarreras);
router.get('/usuarios', verificarSesion, controller.listarUsuarios);
router.get('/perfil', verificarSesion, controller.verPerfil);

export default router;
