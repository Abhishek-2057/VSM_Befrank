import mongoose from 'mongoose';

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
        type: String, // Will store the HTML from ReactQuill
        required: [true, 'Description is required'],
    },
    mainImageUrl: {
        type: String,
        required: [true, 'Main image URL is required'],
    },
    galleryImageUrls: {
        type: [String],
        required: [true, 'Gallery images are required'],
        validate: [v => v.length > 0, 'At least one gallery image is required']
    },
}, {
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);
export default Event;