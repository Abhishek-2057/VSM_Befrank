import express from 'express';
import {
    createEvent, getEventById, updateEvent,
    deleteEvent,
    getAllEvents,
    getGalleryImages,
    getLatestEvents
} from '../controllers/eventController.js';
import { verifyToken } from '../middleware/jwtAuth.js';
import { eventUpload } from '../uitils/fileUpload.js';

const router = express.Router();

router.get('/getAllEvents', getAllEvents);

// POST /api/events/create -> Create a new event
router.post('/create', verifyToken, eventUpload, createEvent);

router.get('/latest', getLatestEvents);

router.get('/getEventById/:id', getEventById);
// PUT /api/events/:id -> Update an event
router.put('/:id', verifyToken, eventUpload, updateEvent);

// DELETE /api/events/:id -> Delete an event
router.delete('/:id', verifyToken, deleteEvent);

router.get('/gallery', getGalleryImages);

export default router;