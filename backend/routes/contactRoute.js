import express from 'express';
import { submitContactForm, getContactSubmissions } from '../controllers/contactController.js';
import { verifyToken } from '../middleware/jwtAuth.js';

const router = express.Router();

router.post('/submit', submitContactForm);

router.get('/submissions', verifyToken, getContactSubmissions);

export default router;