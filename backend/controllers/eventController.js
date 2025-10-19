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



import {
    uploadAndGetPresignedUrl,
    deleteFileFromMinio,
    deleteMultipleFilesFromMinio,
    minioClient
} from '../config/minioConfig.js';
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


export const updateEvent = async (req, res) => {
    try {
        const { eventName, location, facilitatorName, date, description, existingGalleryImages } = req.body;
        const eventId = req.params.id;

        const eventToUpdate = await Event.findById(eventId);
        if (!eventToUpdate) {
            return res.status(404).json({ message: "Event not found." });
        }

        // 1. Update text fields
        eventToUpdate.eventName = eventName;
        eventToUpdate.location = location;
        eventToUpdate.facilitatorName = facilitatorName;
        eventToUpdate.date = date;
        eventToUpdate.description = description;

        // 2. Handle Main Image update
        if (req.files && req.files.mainImage) {
            // Delete old main image from MinIO
            await deleteFileFromMinio(eventToUpdate.mainImage.objectName);
            // Upload new main image
            const mainImageFile = req.files.mainImage[0];
            eventToUpdate.mainImage = await uploadAndGetPresignedUrl(mainImageFile);
        }
        
        // 3. Handle Gallery Images update
        let finalGallery = [];
        const imagesToDeleteFromMinio = [];
        
        // Figure out which old images were deleted
        const existingIds = JSON.parse(existingGalleryImages || '[]').map(img => img._id);
        eventToUpdate.galleryImages.forEach(img => {
            if (existingIds.includes(img._id.toString())) {
                finalGallery.push(img); // Keep this image
            } else {
                imagesToDeleteFromMinio.push(img.objectName); // Mark this for deletion
            }
        });

        // Delete the marked images from MinIO
        await deleteMultipleFilesFromMinio(imagesToDeleteFromMinio);
        
        // Upload new gallery images, if any
        if (req.files && req.files.galleryImages) {
            const galleryFiles = req.files.galleryImages;
            const galleryUploadPromises = galleryFiles.map(file => uploadAndGetPresignedUrl(file));
            const newGalleryImages = await Promise.all(galleryUploadPromises);
            finalGallery = [...finalGallery, ...newGalleryImages];
        }

        eventToUpdate.galleryImages = finalGallery;

        const updatedEvent = await eventToUpdate.save();

        res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });

    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Server error while updating event.', error: error.message });
    }
};


// --- DELETE EVENT (New) ---
export const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const eventToDelete = await Event.findById(eventId);

        if (!eventToDelete) {
            return res.status(404).json({ message: "Event not found." });
        }

        // 1. Collect all object names to delete from MinIO
        const objectsToDelete = [eventToDelete.mainImage.objectName];
        eventToDelete.galleryImages.forEach(img => {
            objectsToDelete.push(img.objectName);
        });

        // 2. Delete files from MinIO
        await deleteMultipleFilesFromMinio(objectsToDelete);
        
        // 3. Delete the event from MongoDB
        await Event.findByIdAndDelete(eventId);
        
        res.status(200).json({ message: 'Event deleted successfully' });

    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Server error while deleting event.', error: error.message });
    }
};


export const getAllEvents = async (req, res) => {
    try {
        // 1. Get query parameters with default values
        const { page = 1, limit = 10, search, startDate, endDate } = req.query;

        // 2. Build the dynamic filter object for the MongoDB query
        const filter = {};

        // Add case-insensitive search filter for the event name
        if (search) {
            filter.eventName = { $regex: search, $options: 'i' };
        }

        // Add date range filter
        if (startDate || endDate) {
            filter.date = {};
            if (startDate) {
                // Ensures we query from the beginning of the start date
                filter.date.$gte = new Date(startDate);
            }
            if (endDate) {
                // Ensures we query until the end of the end date
                const endOfDay = new Date(endDate);
                endOfDay.setHours(23, 59, 59, 999);
                filter.date.$lte = endOfDay;
            }
        }

        // 3. Parse pagination numbers
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;

        // 4. Execute queries to get paginated events and the total count
        // We use .select() to only fetch the data needed for the table, making the API faster.
        const events = await Event.find(filter)
            .sort({ date: -1 }) // Sort by the event date, newest first
            .skip(skip)
            .limit(limitNum)
            .select('eventName location date createdAt'); // We don't need image URLs here

        const totalEvents = await Event.countDocuments(filter);
        const totalPages = Math.ceil(totalEvents / limitNum);

        // 5. Send the structured response
        res.status(200).json({
            message: 'Events fetched successfully.',
            data: events,
            pagination: {
                currentPage: pageNum,
                totalPages,
                totalEvents,
                limit: limitNum,
            }
        });

    } catch (error) {
        console.error('Error fetching all events:', error);
        res.status(500).json({ message: 'Server error while fetching events.', error: error.message });
    }
};