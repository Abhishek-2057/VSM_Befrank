import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../config/cloudinaryConfig.js";
import Event from "../models/event.js";
import ContactSubmission from "../models/ContactSubmission.js";


export const getDashboardStats = async (req, res) => {
  try {
    // Total counts
    const totalContacts = await ContactSubmission.countDocuments();
    const totalEvents = await Event.countDocuments();

    // Reason-wise contact distribution
    const contactByReason = await ContactSubmission.aggregate([
      {
        $group: {
          _id: "$reason",
          count: { $sum: 1 },
        },
      },
    ]);

    // Monthly contact trend (last 6 months)
    const contactTrend = await ContactSubmission.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      { $limit: 6 },
    ]);

    // Event category distribution
    // Event category distribution
    const rawEventByCategory = await Event.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    // Convert to object
    const eventByCategory = {
      SchoolBeFrank: 0,
      BeFrankForVsmers: 0,
    };

    rawEventByCategory.forEach((item) => {
      eventByCategory[item._id] = item.count;
    });

    // Upcoming vs past events
    const now = new Date();
    const upcomingEvents = await Event.countDocuments({ date: { $gte: now } });
    const pastEvents = await Event.countDocuments({ date: { $lt: now } });

    res.json({
      totalContacts,
      totalEvents,
      contactByReason,
      contactTrend,
      eventByCategory,
      upcomingEvents,
      pastEvents,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { eventName, location, facilitatorName, date, description,category } =
      req.body;

    if (!req.files || !req.files.mainImage || !req.files.galleryImages) {
      return res
        .status(400)
        .json({ message: "Main image and gallery images are required." });
    }

    // 1. Upload Main Image
    const mainImageFile = req.files.mainImage[0];
    const mainImageResult = await uploadToCloudinary(
      mainImageFile.buffer,
      "be-frank/events"
    );

    // 2. Upload Gallery Images
    const galleryFiles = req.files.galleryImages;
    const galleryUploadPromises = galleryFiles.map((file) =>
      uploadToCloudinary(file.buffer, "be-frank/events")
    );
    const galleryResults = await Promise.all(galleryUploadPromises);

    // 3. Create Event
    const newEvent = new Event({
      eventName,
      category,
      location,
      facilitatorName: facilitatorName || "",
      date,
      description,
      mainImage: {
        url: mainImageResult.url,
        publicId: mainImageResult.publicId,
      },
      galleryImages: galleryResults.map((img) => ({
        url: img.url,
        publicId: img.publicId,
      })),
    });

    await newEvent.save();

    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res
      .status(500)
      .json({
        message: "Server error while creating event.",
        error: error.message,
      });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    // No need to refresh URLs for Cloudinary!
    res
      .status(200)
      .json({ message: "Event fetched successfully.", data: event });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Server error while fetching the event." });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const {
      eventName,
      location,
      facilitatorName,
      date,
      description,
      category,
      existingGalleryImages,
    } = req.body;
    const eventId = req.params.id;

    const eventToUpdate = await Event.findById(eventId);
    if (!eventToUpdate) {
      return res.status(404).json({ message: "Event not found." });
    }

    // 1. Update text fields
    eventToUpdate.eventName = eventName;
    eventToUpdate.category = category;
    eventToUpdate.location = location;
    eventToUpdate.facilitatorName = facilitatorName;
    eventToUpdate.date = date;
    eventToUpdate.description = description;

    // 2. Handle Main Image update
    if (req.files && req.files.mainImage) {
      // Delete old image from Cloudinary
      if (eventToUpdate.mainImage?.publicId) {
        await deleteFromCloudinary(eventToUpdate.mainImage.publicId);
      }
      // Upload new image
      const mainImageFile = req.files.mainImage[0];
      const result = await uploadToCloudinary(
        mainImageFile.buffer,
        "be-frank/events"
      );
      eventToUpdate.mainImage = { url: result.url, publicId: result.publicId };
    }

    // 3. Handle Gallery Images update
    let finalGallery = [];

    // existingGalleryImages comes as a JSON string of IDs or objects
    const existingIds = JSON.parse(existingGalleryImages || "[]").map(
      (img) => img._id
    );

    // Filter out images that are no longer in the list (deleted by user)
    for (const img of eventToUpdate.galleryImages) {
      if (existingIds.includes(img._id.toString())) {
        finalGallery.push(img); // Keep it
      } else {
        // Delete from Cloudinary
        await deleteFromCloudinary(img.publicId);
      }
    }

    // Upload new gallery images
    if (req.files && req.files.galleryImages) {
      const galleryFiles = req.files.galleryImages;
      const uploadPromises = galleryFiles.map((file) =>
        uploadToCloudinary(file.buffer, "be-frank/events")
      );
      const newImages = await Promise.all(uploadPromises);

      // Add new images to the gallery
      const formattedNewImages = newImages.map((img) => ({
        url: img.url,
        publicId: img.publicId,
      }));
      finalGallery = [...finalGallery, ...formattedNewImages];
    }

    eventToUpdate.galleryImages = finalGallery;

    const updatedEvent = await eventToUpdate.save();

    res
      .status(200)
      .json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    res
      .status(500)
      .json({
        message: "Server error while updating event.",
        error: error.message,
      });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const eventToDelete = await Event.findById(eventId);

    if (!eventToDelete) {
      return res.status(404).json({ message: "Event not found." });
    }

    // 1. Delete Main Image
    if (eventToDelete.mainImage?.publicId) {
      await deleteFromCloudinary(eventToDelete.mainImage.publicId);
    }

    // 2. Delete Gallery Images
    const galleryDeletePromises = eventToDelete.galleryImages.map((img) =>
      deleteFromCloudinary(img.publicId)
    );
    await Promise.all(galleryDeletePromises);

    // 3. Delete from DB
    await Event.findByIdAndDelete(eventId);

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res
      .status(500)
      .json({
        message: "Server error while deleting event.",
        error: error.message,
      });
  }
};



export const getAllEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, startDate, endDate } = req.query;

    const filter = {};
    if (search) {
      filter.eventName = { $regex: search, $options: "i" };
    }
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) {
        const endOfDay = new Date(endDate);
        endOfDay.setHours(23, 59, 59, 999);
        filter.date.$lte = endOfDay;
      }
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const events = await Event.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limitNum)
      .select("eventName location date createdAt mainImage"); // mainImage now contains .url

    const totalEvents = await Event.countDocuments(filter);

    // No "URL Refresh" loop needed here! Cloudinary URLs are permanent.

    res.status(200).json({
      message: "Events fetched successfully.",
      data: events,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalEvents / limitNum),
        totalEvents,
        limit: limitNum,
      },
    });
  } catch (error) {
    console.error("Error fetching all events:", error);
    res
      .status(500)
      .json({
        message: "Server error while fetching events.",
        error: error.message,
      });
  }
};

export const getLatestEvents = async (req, res) => {
  try {
    const events = await Event.find({})
      .sort({ date: -1 })
      .limit(3)
      .select("eventName location date mainImage");

    res.status(200).json({
      message: "Latest 3 events fetched successfully",
      data: events,
    });
  } catch (error) {
    console.error("Error fetching latest events:", error);
    res.status(500).json({
      message: "Failed to fetch latest events",
      error: error.message,
    });
  }
};

export const getGalleryImages = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const aggregationPipeline = [
      { $match: { galleryImages: { $exists: true, $ne: [] } } },
      { $sort: { date: -1 } },
      { $unwind: "$galleryImages" },
      { $replaceRoot: { newRoot: "$galleryImages" } },
    ];

    const countPipeline = [...aggregationPipeline, { $count: "totalImages" }];
    const countResult = await Event.aggregate(countPipeline);
    const totalImages = countResult.length > 0 ? countResult[0].totalImages : 0;

    const imagesPipeline = [
      ...aggregationPipeline,
      { $skip: skip },
      { $limit: limitNum },
    ];
    const images = await Event.aggregate(imagesPipeline);

    // No "URL Refresh" loop needed here either.

    res.status(200).json({
      message: "Gallery images fetched successfully.",
      data: images,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalImages / limitNum),
        totalImages,
        limit: limitNum,
      },
    });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    res
      .status(500)
      .json({
        message: "Server error while fetching gallery images.",
        error: error.message,
      });
  }
};




export const getEventsByCategory = async (req, res) => {
  try {
    const { category } = req.params; // Get category from URL params
    const { page = 1, limit = 10 } = req.query; // Pagination query params

    // Validate the category matches your Enum
    const validCategories = ["SchoolBeFrank", "BeFrankForVsmers"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category requested." });
    }

    const filter = { category: category };

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const events = await Event.find(filter)
      .sort({ date: -1 }) // Sort by latest date
      .skip(skip)
      .limit(limitNum)
      .select("eventName location date createdAt mainImage category");

    const totalEvents = await Event.countDocuments(filter);

    res.status(200).json({
      message: `${category} events fetched successfully.`,
      data: events,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalEvents / limitNum),
        totalEvents,
        limit: limitNum,
      },
    });
  } catch (error) {
    console.error(`Error fetching ${req.params.category} events:`, error);
    res.status(500).json({
      message: "Server error while fetching category events.",
      error: error.message,
    });
  }
};