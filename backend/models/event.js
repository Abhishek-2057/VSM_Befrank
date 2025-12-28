import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true }, // The permanent Cloudinary URL
  publicId: { type: String, required: true }, // Needed to delete the image from Cloudinary later
});

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: [true, "Event name is required"],
    },

    category: {
      type: String,
      required: [true, "Event category is required"],
      enum: {
        values: ["SchoolBeFrank", "BeFrankForVsmers"],
        message: "{VALUE} is not a valid event category",
      },
    },

    location: {
      type: String,
      required: [true, "Location is required"],
    },
    facilitatorName: {
      type: String,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    mainImage: {
      type: imageSchema,
      required: [true, "Main image is required"],
    },
    galleryImages: {
      type: [imageSchema],
      required: [true, "Gallery images are required"],
      validate: [
        (v) => Array.isArray(v) && v.length > 0,
        "At least one gallery image is required",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
