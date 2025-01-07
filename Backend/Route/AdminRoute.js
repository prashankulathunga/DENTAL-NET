import express from 'express';
import AdminController from '../controller/AdminController.js';

const router = express.Router();

router.post('/signup', AdminController.signup);
router.post('/login', AdminController.login);


export default router;