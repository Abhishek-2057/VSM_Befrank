import ContactSubmission from '../models/ContactSubmission.js';
import { sendContactEmail } from '../uitils/emailService.js';

export const submitContactForm = async (req, res) => {
  const { name, email, phone, message, agree } = req.body;

  if (!name || !email || !phone || !message || agree !== true) {
    return res
      .status(400)
      .json({
        message: "All fields are required and agreement must be checked.",
      });
  }

  try {
    // 1. Save to Database
    const newSubmission = new ContactSubmission({
      name,
      email,
      phone,
      message,
      agree,
    });

    const savedSubmission = await newSubmission.save();

    // 2. Send Email to Admin
    try {
        sendContactEmail({ name, email, phone, message });
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
    }

    res
      .status(201)
      .json({
        message: "Form submitted successfully!",
        submission: savedSubmission,
      });
  } catch (error) {
    console.error("Error saving contact submission:", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
    }
    res.status(500).json({ message: "Server error. Please try again later." });
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

export const deleteContactSubmission = async (req, res) => {
    const { id } = req.params;

    try {
        const submission = await ContactSubmission.findById(id);

        if (!submission) {
            return res.status(404).json({ message: 'Submission not found.' });
        }

        await submission.deleteOne(); 

        res.status(200).json({ message: 'Submission deleted successfully.' });

    } catch (error) {
        console.error('Error deleting contact submission:', error);
        if (error.name === 'CastError') {
             return res.status(400).json({ message: 'Invalid submission ID format.' });
        }
        res.status(500).json({ message: 'Server error while deleting submission.' });
    }
};