import React, { useState } from 'react';

// Reusable Input Field Component (optional, but keeps code clean)
const FormInput = ({ label, name, type, value, onChange, error, ...props }) => {
    const inputStyle = "w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300";
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={`${inputStyle} ${error ? 'border-red-500' : ''}`}
                {...props}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

// Main Admin Form Component
export const EventForm = () => {
    // State for text-based form data
    const [formData, setFormData] = useState({
        eventName: '',
        schoolName: '',
        location: '',
        facilitatorName: '',
        date: '',
        description: '',
    });

    // State for file data
    const [mainImage, setMainImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);

    // State for image previews
    const [mainImagePreview, setMainImagePreview] = useState('');
    const [galleryImagePreviews, setGalleryImagePreviews] = useState([]);

    // State for validation errors
    const [errors, setErrors] = useState({});

    // --- Handlers ---

    // Handles changes for all text inputs and textareas
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handles the main image file input
    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMainImage(file);
            // Create a temporary URL for preview
            setMainImagePreview(URL.createObjectURL(file));
            setErrors(prev => ({ ...prev, mainImage: null })); // Clear error on new file
        }
    };

    // Handles the gallery image file input (for multiple files)
    const handleGalleryImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setGalleryImages(files);
        
        // Revoke old preview URLs to prevent memory leaks
        galleryImagePreviews.forEach(URL.revokeObjectURL);

        // Create new temporary URLs for previews
        const previews = files.map(file => URL.createObjectURL(file));
        setGalleryImagePreviews(previews);
        setErrors(prev => ({ ...prev, galleryImages: null })); // Clear error
    };

    // --- Validation & Submission ---

    // Validation logic
    const validate = () => {
        const newErrors = {};
        if (!formData.eventName) newErrors.eventName = 'Event name is required';
        if (!formData.schoolName) newErrors.schoolName = 'School name is required';
        if (!formData.location) newErrors.location = 'Location is required';
        if (!formData.date) newErrors.date = 'Event date is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!mainImage) newErrors.mainImage = 'A main event image is required';
        if (galleryImages.length === 0) newErrors.galleryImages = 'At least one gallery image is required';
        
        return newErrors;
    };

    // Handles form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            // --- SUCCESS ---
            // Here you would send the data to your backend
            console.log("Form Submitted Successfully!");
            console.log("Form Data:", formData);
            console.log("Main Image File:", mainImage);
            console.log("Gallery Image Files:", galleryImages);

            // You can add a success message and reset the form here
            alert('Event Created Successfully!');
            // Reset form (optional)
            // setFormData({ eventName: '', schoolName: '', ... });
            // setMainImage(null);
            // setGalleryImages([]);
            // setMainImagePreview('');
            // setGalleryImagePreviews([]);
        } else {
            console.error("Validation Failed:", validationErrors);
        }
    };

    // --- Render ---

    const fileInputStyle = "w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer";

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg" noValidate>
                <h2 className="text-3xl font-bold text-[#f48321] mb-8">Create New Event</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Event Name */}
                    <FormInput 
                        label="Event Name" 
                        name="eventName" 
                        type="text" 
                        value={formData.eventName} 
                        onChange={handleChange} 
                        error={errors.eventName}
                    />

                    {/* Event Date */}
                    <FormInput 
                        label="Event Date" 
                        name="date" 
                        type="date" 
                        value={formData.date} 
                        onChange={handleChange} 
                        error={errors.date}
                    />

                    {/* School Name */}
                    <FormInput 
                        label="School Name" 
                        name="schoolName" 
                        type="text" 
                        value={formData.schoolName} 
                        onChange={handleChange} 
                        error={errors.schoolName}
                    />

                    {/* Location */}
                    <FormInput 
                        label="Location (e.g., Thane)" 
                        name="location" 
                        type="text" 
                        value={formData.location} 
                        onChange={handleChange} 
                        error={errors.location}
                    />

                    {/* Facilitator Name */}
                    <div className="md:col-span-2">
                         <FormInput 
                            label="Facilitator Name" 
                            name="facilitatorName" 
                            type="text" 
                            value={formData.facilitatorName} 
                            onChange={handleChange} 
                            error={errors.facilitatorName}
                        />
                    </div>
                    
                    {/* Description */}
                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="5"
                            value={formData.description}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : ''}`}
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    {/* Main Image Input */}
                    <div className="md:col-span-2">
                        <label htmlFor="mainImage" className="block text-sm font-medium text-gray-700 mb-1">
                            Main Event Image (for card)
                        </label>
                        <input
                            type="file"
                            id="mainImage"
                            name="mainImage"
                            accept="image/*"
                            onChange={handleMainImageChange}
                            className={fileInputStyle}
                        />
                        {errors.mainImage && <p className="text-red-500 text-sm mt-1">{errors.mainImage}</p>}
                        {/* Main Image Preview */}
                        {mainImagePreview && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                                <img src={mainImagePreview} alt="Main preview" className="w-1/2 rounded-lg object-cover" />
                            </div>
                        )}
                    </div>
                    
                    {/* Gallery Images Input */}
                    <div className="md:col-span-2">
                        <label htmlFor="galleryImages" className="block text-sm font-medium text-gray-700 mb-1">
                            Gallery Images (Select one or more)
                        </label>
                        <input
                            type="file"
                            id="galleryImages"
                            name="galleryImages"
                            accept="image/*"
                            multiple
                            onChange={handleGalleryImagesChange}
                            className={fileInputStyle}
                        />
                        {errors.galleryImages && <p className="text-red-500 text-sm mt-1">{errors.galleryImages}</p>}
                        {/* Gallery Previews */}
                        {galleryImagePreviews.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Previews:</p>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                                    {galleryImagePreviews.map((preview, index) => (
                                        <img key={index} src={preview} alt={`Gallery preview ${index + 1}`} className="w-full h-24 rounded-lg object-cover" />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Submit Button */}
                    <div className="md:col-span-2 text-right">
                        <button 
                            type="submit" 
                            className="bg-[#2692d1] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                        >
                            Create Event
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};