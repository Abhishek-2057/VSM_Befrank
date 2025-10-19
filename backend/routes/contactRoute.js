import express from 'express';
import { submitContactForm, getContactSubmissions, deleteContactSubmission } from '../controllers/contactController.js';
import { verifyToken } from '../middleware/jwtAuth.js';

const router = express.Router();

router.post('/submit', submitContactForm);

router.get('/submissions', verifyToken, getContactSubmissions);

router.delete('/submissions/:id', verifyToken, deleteContactSubmission);

export default router;