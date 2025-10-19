// import { uploadFileToMinio } from '../config/minioConfig.js';
// import Event from '../models/event.js';

// export const createEvent = async (req, res) => {
//     try {
//         const { eventName, location, facilitatorName, date, description } = req.body;

//         // Check for files
//         if (!req.files || !req.files.mainImage || !req.files.galleryImages) {
//             return res.status(400).json({ message: 'Main image and gallery images are required.' });
//         }

//         // 1. Upload Main Image
//         const mainImageFile = req.files.mainImage[0];
//         const mainImageUrl = await uploadFileToMinio(mainImageFile);

//         // 2. Upload Gallery Images
//         const galleryFiles = req.files.galleryImages;
//         // Upload all gallery images in parallel
//         const galleryUploadPromises = galleryFiles.map(file => uploadFileToMinio(file));
//         const galleryImageUrls = await Promise.all(galleryUploadPromises);

//         // 3. Create Event in MongoDB
//         const newEvent = new Event({
//             eventName,
//             location,
//             facilitatorName: facilitatorName || '', // Handle optional field
//             date,
//             description,
//             mainImageUrl,
//             galleryImageUrls,
//         });

//         await newEvent.save();
        
//         res.status(201).json({ message: 'Event created successfully', event: newEvent });

//     } catch (error) {
//         console.error('Error creating event:', error);
//         res.status(500).json({ message: 'Server error while creating event.', error: error.message });
//     }
// };



import { uploadAndGetPresignedUrl, minioClient } from '../config/minioConfig.js';
import Event from '../models/event.js';


export const createEvent = async (req, res) => {
    try {
        const { eventName, location, facilitatorName, date, description } = req.body;

        if (!req.files || !req.files.mainImage || !req.files.galleryImages) {
            return res.status(400).json({ message: 'Main image and gallery images are required.' });
        }

        const mainImageFile = req.files.mainImage[0];
        const mainImage = await uploadAndGetPresignedUrl(mainImageFile);

        const galleryFiles = req.files.galleryImages;
        const galleryUploadPromises = galleryFiles.map(file => uploadAndGetPresignedUrl(file));
        const galleryImages = await Promise.all(galleryUploadPromises);

        const newEvent = new Event({
            eventName,
            location,
            facilitatorName: facilitatorName || '',
            date,
            description,
            mainImage,
            galleryImages,
        });

        await newEvent.save();
        
        res.status(201).json({ message: 'Event created successfully', event: newEvent });

    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Server error while creating event.', error: error.message });
    }
};


export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }

        let needsSave = false;
        const BUCKET_NAME = process.env.MINIO_BUCKET || 'events';
        const EXPIRY_IN_SECONDS = 7 * 24 * 60 * 60;

        const refreshUrlIfNeeded = async (image) => {
            if (image && image.objectName && new Date() >= new Date(image.expiresAt)) {
                console.log(`Refreshing URL for object: ${image.objectName}`);
                const newUrl = await minioClient.presignedGetObject(BUCKET_NAME, image.objectName, EXPIRY_IN_SECONDS);
                const newExpiresAt = new Date();
                newExpiresAt.setSeconds(newExpiresAt.getSeconds() + EXPIRY_IN_SECONDS);
                
                image.url = newUrl;
                image.expiresAt = newExpiresAt;
                return true;
            }
            return false;
        };

        if (await refreshUrlIfNeeded(event.mainImage)) {
            needsSave = true;
        }

        for (const image of event.galleryImages) {
            if (await refreshUrlIfNeeded(image)) {
                needsSave = true;
            }
        }
        
        if (needsSave) {
            await event.save();
            console.log(`Refreshed image URLs for event ID: ${event._id}`);
        }

        res.status(200).json({ message: 'Event fetched successfully.', data: event });

    } catch (error) {
        console.error("Error fetching or refreshing event:", error);
        res.status(500).json({ message: 'Server error while fetching the event.' });
    }
};