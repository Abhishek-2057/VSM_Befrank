import express from 'express';
import {
    createEvent, getEventById, updateEvent,
    deleteEvent
} from '../controllers/eventController.js';
import { verifyToken } from '../middleware/jwtAuth.js';
import { eventUpload } from '../uitils/fileUpload.js';

const router = express.Router();

// Route: POST /api/events/create
// 1. verifyToken - Checks if admin is logged in
// 2. eventUpload - Parses multipart/form-data (text and files)
// 3. createEvent - Uploads files to MinIO and saves data to MongoDB
router.post('/create', verifyToken, eventUpload, createEvent);

router.get('getEventById/:id', getEventById);

router.get('/getAllEvents', getAllEvents);

router.put('/updateEvent/:id', verifyToken, eventUpload, updateEvent);

// Delete an event (protected)
router.delete('/deleteEvent/:id', verifyToken, deleteEvent);

export default router;