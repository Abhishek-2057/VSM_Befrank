import React, { useState } from 'react';
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axiosInstance from '../../utils/axiosInstance';

// Reusable Input Field Component
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

// ReactQuill modules configuration
const quillModules = {
    toolbar: {
        container: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean'],
            ['code-block'],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'direction': 'rtl' }]
        ],
    },
};

// Main Admin Form Component
export const EventForm = () => {
    // State for simple text fields
    const [formData, setFormData] = useState({
        eventName: '',
        location: '',
        facilitatorName: '',
        date: '',
    });

    // State for ReactQuill description (it's handled separately)
    const [description, setDescription] = useState('');

    // State for file data
    const [mainImage, setMainImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);

    // State for image previews
    const [mainImagePreview, setMainImagePreview] = useState('');
    const [galleryImagePreviews, setGalleryImagePreviews] = useState([]);

    // State for form status
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // --- Handlers ---

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handler for ReactQuill
    const handleDescriptionChange = (value) => {
        setDescription(value);
        if (value && value !== '<p><br></p>') { // Clear error if user starts typing
            setErrors(prev => ({ ...prev, description: null }));
        }
    };

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMainImage(file);
            setMainImagePreview(URL.createObjectURL(file));
            setErrors(prev => ({ ...prev, mainImage: null }));
        }
    };

    const handleGalleryImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setGalleryImages(files);
        galleryImagePreviews.forEach(URL.revokeObjectURL); // Revoke old URLs
        setGalleryImagePreviews(files.map(file => URL.createObjectURL(file)));
        setErrors(prev => ({ ...prev, galleryImages: null }));
    };

    // --- Validation & Submission ---

    const validate = () => {
        const newErrors = {};
        if (!formData.eventName) newErrors.eventName = 'Event name is required';
        if (!formData.location) newErrors.location = 'Location is required';
        if (!formData.date) newErrors.date = 'Event date is required';
        if (!description || description === '<p><br></p>') {
            newErrors.description = 'Description is required';
        }
        if (!mainImage) newErrors.mainImage = 'A main event image is required';
        if (galleryImages.length === 0) newErrors.galleryImages = 'At least one gallery image is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            console.error("Validation Failed:", validationErrors);
            return;
        }

        setIsSubmitting(true);
        setUploadProgress(0);

        // We must use FormData for file uploads
        const data = new FormData();
        data.append('eventName', formData.eventName);
        data.append('location', formData.location);
        data.append('facilitatorName', formData.facilitatorName);
        data.append('date', formData.date);
        data.append('description', description);
        data.append('mainImage', mainImage); // Append the main image file
        galleryImages.forEach(file => {
            data.append('galleryImages', file); // Append each gallery image
        });

        try {
            // Use axios for upload progress
            await axiosInstance.post('/api/events/create', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // Auth header should be added automatically by your axiosInstance
                },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percent);
                }
            });

            alert('Event Created Successfully!');
            // Reset form
            setFormData({ eventName: '', location: '', facilitatorName: '', date: '' });
            setDescription('');
            setMainImage(null);
            setGalleryImages([]);
            setMainImagePreview('');
            setGalleryImagePreviews([]);
            setErrors({});

        } catch (error) {
            console.error("Failed to create event:", error.response?.data || error.message);
            alert('Failed to create event. Please check the console.');
        } finally {
            setIsSubmitting(false);
            setUploadProgress(0);
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
                    <FormInput 
                        label="Facilitator Name (Optional)" 
                        name="facilitatorName" 
                        type="text" 
                        value={formData.facilitatorName} 
                        onChange={handleChange} 
                        error={errors.facilitatorName}
                    />
                    
                    {/* Description (ReactQuill) */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <ReactQuill 
                            theme="snow"
                            value={description}
                            onChange={handleDescriptionChange}
                            modules={quillModules}
                            className={errors.description ? 'border border-red-500 rounded-lg' : ''}
                        />
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
                            accept="image/*"
                            onChange={handleMainImageChange}
                            className={fileInputStyle}
                            disabled={isSubmitting}
                        />
                        {errors.mainImage && <p className="text-red-500 text-sm mt-1">{errors.mainImage}</p>}
                        {mainImagePreview && (
                            <div className="mt-4"><img src={mainImagePreview} alt="Main preview" className="w-1/2 rounded-lg object-cover" /></div>
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
                            accept="image/*"
                            multiple
                            onChange={handleGalleryImagesChange}
                            className={fileInputStyle}
                            disabled={isSubmitting}
                        />
                        {errors.galleryImages && <p className="text-red-500 text-sm mt-1">{errors.galleryImages}</p>}
                        {galleryImagePreviews.length > 0 && (
                            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                                {galleryImagePreviews.map((preview, index) => (
                                    <img key={index} src={preview} alt={`Gallery preview ${index + 1}`} className="w-full h-24 rounded-lg object-cover" />
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Upload Progress & Submit Button */}
                    <div className="md:col-span-2">
                        {isSubmitting && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div 
                                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                                <p className="text-sm text-center mt-1">{uploadProgress}% Uploaded</p>
                            </div>
                        )}
                        <div className="text-right">
                            <button 
                                type="submit" 
                                className="bg-[#2692d1] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 disabled:bg-gray-400"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Create Event'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};