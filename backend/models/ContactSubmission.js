import mongoose from 'mongoose';

const contactSubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "is invalid"], // Basic email validation
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\d{10}$/, "is invalid"], // 10-digit validation
    },
    reason: {
      type: String,
      required: true,
      enum: [
        "Volunteer with Us",
        "Become a Donor",
        "Suggest a School",
        "other",
      ],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    agree: {
      type: Boolean,
      required: true,
      validate: [(val) => val === true, "User must agree to terms"],
    },
  },
  {
    timestamps: true,
  }
);

const ContactSubmission = mongoose.model('ContactSubmission', contactSubmissionSchema);
export default ContactSubmission;