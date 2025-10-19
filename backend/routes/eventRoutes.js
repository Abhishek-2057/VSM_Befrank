import express from 'express';
import {
    createEvent, getEventById, updateEvent,
    deleteEvent,getAllEvents
} from '../controllers/eventController.js';
import { verifyToken } from '../middleware/jwtAuth.js';
import { eventUpload } from '../uitils/fileUpload.js';

const router = express.Router();

router.get('/', getAllEvents);

// GET /api/events/:id -> Get a single event
router.get('/:id', getEventById);

// POST /api/events/create -> Create a new event
router.post('/create', verifyToken, eventUpload, createEvent);

// PUT /api/events/:id -> Update an event
router.put('/:id', verifyToken, eventUpload, updateEvent);

// DELETE /api/events/:id -> Delete an event
router.delete('/:id', verifyToken, deleteEvent);

export default router;