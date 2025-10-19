import express from 'express';
import { createEvent,getEventById } from '../controllers/eventController.js';
import { verifyToken } from '../middleware/jwtAuth.js';
import { eventUpload } from '../uitils/fileUpload.js';

const router = express.Router();

// Route: POST /api/events/create
// 1. verifyToken - Checks if admin is logged in
// 2. eventUpload - Parses multipart/form-data (text and files)
// 3. createEvent - Uploads files to MinIO and saves data to MongoDB
router.post('/create', verifyToken, eventUpload, createEvent);

router.get('/:id', getEventById);

export default router;