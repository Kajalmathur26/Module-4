import express from 'express';
import { signup, myProfile } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.get('/myprofile', myProfile);

export default router;
