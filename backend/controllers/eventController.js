import { uploadFileToMinio } from '../config/minioConfig.js';
import Event from '../models/event.js';

export const createEvent = async (req, res) => {
    try {
        const { eventName, location, facilitatorName, date, description } = req.body;

        // Check for files
        if (!req.files || !req.files.mainImage || !req.files.galleryImages) {
            return res.status(400).json({ message: 'Main image and gallery images are required.' });
        }

        // 1. Upload Main Image
        const mainImageFile = req.files.mainImage[0];
        const mainImageUrl = await uploadFileToMinio(mainImageFile);

        // 2. Upload Gallery Images
        const galleryFiles = req.files.galleryImages;
        // Upload all gallery images in parallel
        const galleryUploadPromises = galleryFiles.map(file => uploadFileToMinio(file));
        const galleryImageUrls = await Promise.all(galleryUploadPromises);

        // 3. Create Event in MongoDB
        const newEvent = new Event({
            eventName,
            location,
            facilitatorName: facilitatorName || '', // Handle optional field
            date,
            description,
            mainImageUrl,
            galleryImageUrls,
        });

        await newEvent.save();
        
        res.status(201).json({ message: 'Event created successfully', event: newEvent });

    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Server error while creating event.', error: error.message });
    }
};