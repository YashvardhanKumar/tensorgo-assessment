import {Router} from 'express';
import { isAuthenticated } from '../middleware/auth';
import { createServ, getServByContactId, getServById } from './custserv.controller';

const router = Router();

router.post('/create', isAuthenticated, createServ);
router.post('/get', isAuthenticated, getServByContactId);
router.get('/get/:id', isAuthenticated, getServById);

export default router