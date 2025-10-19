import ContactSubmission from '../models/ContactSubmission.js';

export const submitContactForm = async (req, res) => {
    const { name, email, phone, message, agree } = req.body;

    if (!name || !email || !phone || !message || agree !== true) {
        return res.status(400).json({ message: 'All fields are required and agreement must be checked.' });
    }

    try {
        const newSubmission = new ContactSubmission({
            name,
            email,
            phone,
            message,
            agree,
        });

        const savedSubmission = await newSubmission.save();
        res.status(201).json({ message: 'Form submitted successfully!', submission: savedSubmission });

    } catch (error) {
        console.error('Error saving contact submission:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation failed', errors: error.errors });
        }
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

export const getContactSubmissions = async (req, res) => {
    try {
        const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
        res.status(200).json(submissions);
    } catch (error) {
        console.error('Error fetching contact submissions:', error);
        res.status(500).json({ message: 'Server error while fetching submissions.' });
    }
};