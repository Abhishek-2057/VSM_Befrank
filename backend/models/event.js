import mongoose from 'mongoose';

const minioImageSchema = new mongoose.Schema({
    url: { type: String, required: true },          // The 7-day presigned URL
    objectName: { type: String, required: true },   // The permanent name in the MinIO bucket
    originalName: { type: String, required: true }, // The original filename
    expiresAt: { type: Date, required: true },      // When the URL will expire
}); // _id: false prevents creating an ObjectId for this sub-document

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: [true, 'Event name is required'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
    },
    facilitatorName: {
        type: String,
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    description: {
        type: String, 
        required: [true, 'Description is required'],
    },
    mainImage: {
        type: minioImageSchema, // Use the sub-schema for the main image
        required: [true, 'Main image is required'],
    },
    galleryImages: {
        type: [minioImageSchema], // An array of image objects
        required: [true, 'Gallery images are required'],
        validate: [v => Array.isArray(v) && v.length > 0, 'At least one gallery image is required']
    },
}, {
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);
export default Event;