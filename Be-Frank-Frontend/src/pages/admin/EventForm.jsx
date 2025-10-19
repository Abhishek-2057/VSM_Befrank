import React, { useState, useCallback } from 'react';
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axiosInstance from '../../utils/axiosInstance';
import { X } from 'lucide-react';
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

// Drag and Drop Component
const DragDropArea = ({ onFilesDrop, acceptedFiles, multiple = false, label, error, previews, onRemoveFile }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        onFilesDrop(multiple ? files : [files[0]]);
    }, [multiple, onFilesDrop]);

    const handleFileInput = (e) => {
        const files = Array.from(e.target.files);
        onFilesDrop(multiple ? files : [files[0]]);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            
            <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 cursor-pointer
                    ${isDragging 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
                    } 
                    ${error ? 'border-red-500 bg-red-50' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    multiple={multiple}
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                    id={`file-input-${label.replace(/\s+/g, '-')}`}
                />
                <label 
                    htmlFor={`file-input-${label.replace(/\s+/g, '-')}`}
                    className="cursor-pointer"
                >
                    <div className="space-y-2">
                        <svg className="mx-auto h-12 w-12 text-gray-400" 
                            stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                                strokeWidth={2} 
                                strokeLinecap="round" 
                                strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm items-center justify-center text-gray-600">
                            <span className="relative rounded-md font-medium text-blue-600 hover:text-blue-500">
                                Upload a file
                            </span>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 5MB
                        </p>
                    </div>
                </label>
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            {/* Preview Section */}
            {previews && previews.length > 0 && (
                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Previews:</p>
                    <div className={`grid gap-4 ${multiple ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6' : ''}`}>
                        {previews.map((preview, index) => (
                            <div key={index} className="relative group">
                                <img 
                                    src={preview.url} 
                                    alt={`Preview ${index + 1}`} 
                                    className={`rounded-lg object-cover ${multiple ? 'w-full h-24' : 'w-1/3'}`} 
                                />
                                {multiple && (
                                    <button
                                        type="button"
                                        onClick={() => onRemoveFile(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white items-center justify-center rounded-full w-6 h-6 flex opacity-100 cursor-pointer group-hover:opacity-100 transition-opacity duration-200"
                                    >
                                        <X size={20}/>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
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

    // State for ReactQuill description
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
        if (value && value !== '<p><br></p>') {
            setErrors(prev => ({ ...prev, description: null }));
        }
    };

    // Main Image Handlers
    const handleMainImageDrop = (files) => {
        if (files.length > 0) {
            const file = files[0];
            setMainImage(file);
            setMainImagePreview(URL.createObjectURL(file));
            setErrors(prev => ({ ...prev, mainImage: null }));
        }
    };

    // Gallery Images Handlers - FIXED
    const handleGalleryImagesDrop = (files) => {
        if (files.length > 0) {
            // Create new array with existing and new files
            const newGalleryImages = [...galleryImages, ...files];
            setGalleryImages(newGalleryImages);
            
            // Create previews for new files
            const newPreviews = files.map(file => ({
                url: URL.createObjectURL(file),
                file: file
            }));
            
            setGalleryImagePreviews(prev => [...prev, ...newPreviews]);
            setErrors(prev => ({ ...prev, galleryImages: null }));
        }
    };

    // Remove gallery image
    const removeGalleryImage = (index) => {
        // Revoke the object URL to prevent memory leaks
        URL.revokeObjectURL(galleryImagePreviews[index].url);
        
        // Remove from both arrays
        const newGalleryImages = [...galleryImages];
        const newPreviews = [...galleryImagePreviews];
        
        newGalleryImages.splice(index, 1);
        newPreviews.splice(index, 1);
        
        setGalleryImages(newGalleryImages);
        setGalleryImagePreviews(newPreviews);
    };

    // Clear all gallery images
    const clearAllGalleryImages = () => {
        // Revoke all object URLs
        galleryImagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
        setGalleryImages([]);
        setGalleryImagePreviews([]);
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
        data.append('mainImage', mainImage);
        
        // Append each gallery image
        galleryImages.forEach(file => {
            data.append('galleryImages', file);
        });

        try {
            await axiosInstance.post('/api/events/create', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percent);
                }
            });

            alert('Event Created Successfully!');
            
            // Reset form
            resetForm();

        } catch (error) {
            console.error("Failed to create event:", error.response?.data || error.message);
            alert('Failed to create event. Please check the console.');
        } finally {
            setIsSubmitting(false);
            setUploadProgress(0);
        }
    };

    // Reset form function
    const resetForm = () => {
        setFormData({ eventName: '', location: '', facilitatorName: '', date: '' });
        setDescription('');
        setMainImage(null);
        setGalleryImages([]);
        
        // Revoke object URLs
        if (mainImagePreview) URL.revokeObjectURL(mainImagePreview);
        galleryImagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
        
        setMainImagePreview('');
        setGalleryImagePreviews([]);
        setErrors({});
    };

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

                    {/* Main Image Input with Drag & Drop */}
                    <div className="md:col-span-2">
                        <DragDropArea
                            onFilesDrop={handleMainImageDrop}
                            multiple={false}
                            label="Main Event Image (for card)"
                            error={errors.mainImage}
                            previews={mainImagePreview ? [{ url: mainImagePreview }] : []}
                        />
                    </div>
                    
                    {/* Gallery Images Input with Drag & Drop */}
                    <div className="md:col-span-2">
                        <DragDropArea
                            onFilesDrop={handleGalleryImagesDrop}
                            multiple={true}
                            label="Gallery Images (Drag and drop multiple images)"
                            error={errors.galleryImages}
                            previews={galleryImagePreviews}
                            onRemoveFile={removeGalleryImage}
                        />
                        
                        {/* Clear All Gallery Images Button */}
                        {galleryImages.length > 0 && (
                            <div className="mt-2 text-right">
                                <button
                                    type="button"
                                    onClick={clearAllGalleryImages}
                                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                                >
                                    Clear All Gallery Images
                                </button>
                            </div>
                        )}
                        
                        {/* Gallery Images Count */}
                        {galleryImages.length > 0 && (
                            <p className="text-sm text-gray-600 mt-2">
                                {galleryImages.length} image(s) selected
                            </p>
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