// import React, { useState, useCallback, useEffect } from 'react';
// import ReactQuill from "react-quill-new";
// import "react-quill-new/dist/quill.snow.css";
// import axiosInstance from '../../utils/axiosInstance';
// import { X } from 'lucide-react';
// import { useNavigate, useParams } from 'react-router-dom';

// const FormInput = ({ label, name, type, value, onChange, error, ...props }) => {
//     const inputStyle = "w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300";
//     return (
//         <div>
//             <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
//                 {label}
//             </label>
//             <input
//                 type={type}
//                 id={name}
//                 name={name}
//                 value={value}
//                 onChange={onChange}
//                 className={`${inputStyle} ${error ? 'border-red-500' : ''}`}
//                 {...props}
//             />
//             {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//         </div>
//     );
// };

// const DragDropArea = ({ onFilesDrop, acceptedFiles, multiple = false, label, error, previews, onRemoveFile }) => {
//     const [isDragging, setIsDragging] = useState(false);

//     const handleDragOver = useCallback((e) => {
//         e.preventDefault();
//         setIsDragging(true);
//     }, []);

//     const handleDragLeave = useCallback((e) => {
//         e.preventDefault();
//         setIsDragging(false);
//     }, []);

//     const handleDrop = useCallback((e) => {
//         e.preventDefault();
//         setIsDragging(false);
//         const files = Array.from(e.dataTransfer.files);
//         onFilesDrop(multiple ? files : [files[0]]);
//     }, [multiple, onFilesDrop]);

//     const handleFileInput = (e) => {
//         const files = Array.from(e.target.files);
//         onFilesDrop(multiple ? files : [files[0]]);
//     };

//     return (
//         <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//                 {label}
//             </label>
            
//             <div
//                 className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 cursor-pointer
//                     ${isDragging 
//                         ? 'border-blue-500 bg-blue-50' 
//                         : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
//                     } 
//                     ${error ? 'border-red-500 bg-red-50' : ''}`}
//                 onDragOver={handleDragOver}
//                 onDragLeave={handleDragLeave}
//                 onDrop={handleDrop}
//             >
//                 <input
//                     type="file"
//                     multiple={multiple}
//                     accept="image/*"
//                     onChange={handleFileInput}
//                     className="hidden"
//                     id={`file-input-${label.replace(/\s+/g, '-')}`}
//                 />
//                 <label 
//                     htmlFor={`file-input-${label.replace(/\s+/g, '-')}`}
//                     className="cursor-pointer"
//                 >
//                     <div className="space-y-2">
//                         <svg className="mx-auto h-12 w-12 text-gray-400" 
//                             stroke="currentColor" fill="none" viewBox="0 0 48 48">
//                             <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
//                                 strokeWidth={2} 
//                                 strokeLinecap="round" 
//                                 strokeLinejoin="round" />
//                         </svg>
//                         <div className="flex text-sm items-center justify-center text-gray-600">
//                             <span className="relative rounded-md font-medium text-blue-600 hover:text-blue-500">
//                                 Upload a file
//                             </span>
//                             <p className="pl-1">or drag and drop</p>
//                         </div>
//                         <p className="text-xs text-gray-500">
//                             PNG, JPG, GIF up to 5MB
//                         </p>
//                     </div>
//                 </label>
//             </div>

//             {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

//             {/* Preview Section */}
//             {previews && previews.length > 0 && (
//                 <div className="mt-4">
//                     <p className="text-sm font-medium text-gray-700 mb-2">Previews:</p>
//                     <div className={`grid gap-4 ${multiple ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6' : ''}`}>
//                         {previews.map((preview, index) => (
//                             <div key={index} className="relative group">
//                                 <img 
//                                     src={preview.url} 
//                                     alt={`Preview ${index + 1}`} 
//                                     className={`rounded-lg object-cover ${multiple ? 'w-full h-24' : 'w-1/3'}`} 
//                                 />
//                                 {multiple && (
//                                     <button
//                                         type="button"
//                                         onClick={() => onRemoveFile(index)}
//                                         className="absolute -top-2 -right-2 bg-red-500 text-white items-center justify-center rounded-full w-6 h-6 flex opacity-100 cursor-pointer group-hover:opacity-100 transition-opacity duration-200"
//                                     >
//                                         <X size={20}/>
//                                     </button>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// const quillModules = {
//     toolbar: {
//         container: [
//             [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//             [{ 'font': [] }],
//             [{ 'size': ['small', false, 'large', 'huge'] }],
//             ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//             [{ 'color': [] }, { 'background': [] }],
//             [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
//             [{ 'align': [] }],
//             ['link', 'image', 'video'],
//             ['clean'],
//             ['code-block'],
//             [{ 'script': 'sub' }, { 'script': 'super' }],
//             [{ 'direction': 'rtl' }]
//         ],
//     },
// };

// export const EventForm = () => {
//     const { id } = useParams(); // Get event ID from URL for editing
//     const navigate = useNavigate();
//     const isEditMode = !!id;

//     const [formData, setFormData] = useState({ eventName: '', location: '', facilitatorName: '', date: '' });
//     const [description, setDescription] = useState('');
    
//     // For new uploads
//     const [mainImage, setMainImage] = useState(null);
//     const [galleryImages, setGalleryImages] = useState([]); // Holds new file objects
    
//     // For displaying previews
//     const [mainImagePreview, setMainImagePreview] = useState('');
//     const [galleryImagePreviews, setGalleryImagePreviews] = useState([]); // Holds all previews (existing + new)

//     // For tracking existing images in edit mode
//     const [existingGalleryImages, setExistingGalleryImages] = useState([]);

//     const [errors, setErrors] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [uploadProgress, setUploadProgress] = useState(0);


//     useEffect(() => {
//         if (isEditMode) {
//             const fetchEventData = async () => {
//                 try {
//                     const response = await axiosInstance.get(`/api/events/getEventById/${id}`);
//                     const event = response.data.data;
//                     setFormData({
//                         eventName: event.eventName,
//                         location: event.location,
//                         facilitatorName: event.facilitatorName,
//                         date: new Date(event.date).toISOString().split('T')[0], // Format date for input
//                     });
//                     setDescription(event.description);
//                     setMainImagePreview(event.mainImage.url);
//                     setExistingGalleryImages(event.galleryImages);
//                     setGalleryImagePreviews(event.galleryImages.map(img => ({ ...img, isExisting: true })));
//                 } catch (error) {
//                     console.error("Failed to fetch event data:", error);
//                     alert("Could not load event data for editing.");
//                 }
//             };
//             fetchEventData();
//         }
//     }, [id, isEditMode]);

//     // --- Handlers ---

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     // Handler for ReactQuill
//     const handleDescriptionChange = (value) => {
//         setDescription(value);
//         if (value && value !== '<p><br></p>') {
//             setErrors(prev => ({ ...prev, description: null }));
//         }
//     };

//     const handleMainImageDrop = (files) => {
//         if (files.length > 0) {
//             const file = files[0];
//             setMainImage(file);
//             setMainImagePreview(URL.createObjectURL(file));
//             setErrors(prev => ({ ...prev, mainImage: null }));
//         }
//     };

// const handleGalleryImagesDrop = (files) => {
//         const newFiles = files.map(file => ({
//             url: URL.createObjectURL(file),
//             file: file,
//             isExisting: false
//         }));
//         setGalleryImages(prev => [...prev, ...files]);
//         setGalleryImagePreviews(prev => [...prev, ...newFiles]);
//     };

//     const removeGalleryImage = (indexToRemove) => {
//         const previewToRemove = galleryImagePreviews[indexToRemove];
        
//         if (previewToRemove.isExisting) {
//             // Remove from existing images
//             setExistingGalleryImages(prev => prev.filter((_, index) => index !== existingGalleryImages.findIndex(img => img._id === previewToRemove._id)));
//         } else {
//             // Remove from new images
//             URL.revokeObjectURL(previewToRemove.url);
//             setGalleryImages(prev => prev.filter((_, index) => index !== galleryImages.findIndex(f => f === previewToRemove.file)));
//         }

//         // Update previews
//         setGalleryImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
//     };

//     // Clear all gallery images
//     const clearAllGalleryImages = () => {
//         // Revoke all object URLs
//         galleryImagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
//         setGalleryImages([]);
//         setGalleryImagePreviews([]);
//     };

//     // --- Validation & Submission ---

//     const validate = () => {
//         const newErrors = {};
//         if (!formData.eventName) newErrors.eventName = 'Event name is required';
//         if (!formData.location) newErrors.location = 'Location is required';
//         if (!formData.date) newErrors.date = 'Event date is required';
//         if (!description || description === '<p><br></p>') {
//             newErrors.description = 'Description is required';
//         }
//         if (!mainImage && !isEditMode) newErrors.mainImage = 'A main event image is required';
//         if (galleryImages.length === 0 && existingGalleryImages.length === 0) newErrors.galleryImages = 'At least one gallery image is required';
//         return newErrors;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const validationErrors = validate();
//         setErrors(validationErrors);

//         if (Object.keys(validationErrors).length > 0) {
//             console.error("Validation Failed:", validationErrors);
//             return;
//         }

//         setIsSubmitting(true);
//         setUploadProgress(0);

//         const data = new FormData();
//         data.append('eventName', formData.eventName);
//         data.append('location', formData.location);
//         data.append('facilitatorName', formData.facilitatorName);
//         data.append('date', formData.date);
//         data.append('description', description);

//         if (mainImage) {
//             data.append('mainImage', mainImage);
//         }
        
//         galleryImages.forEach(file => {
//             data.append('galleryImages', file);
//         });

//         if (isEditMode) {
//             data.append('existingGalleryImages', JSON.stringify(existingGalleryImages));
//         }

//         try {
//             const config = {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//                 onUploadProgress: (progressEvent) => {
//                     const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                     setUploadProgress(percent);
//                 }
//             };

//             if (isEditMode) {
//                 await axiosInstance.put(`/api/events/${id}`, data, config);
//                 alert('Event Updated Successfully!');
//                 navigate('/admin/events'); // Navigate back to the list
//             } else {
//                 await axiosInstance.post('/api/events/create', data, config);
//                 alert('Event Created Successfully!');
//                 // ... resetForm() logic ...
//             }
//         } catch (error) {
//             console.error("Submission failed:", error);
//             alert('Operation failed. Please check the console.');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // Reset form function
//     const resetForm = () => {
//         setFormData({ eventName: '', location: '', facilitatorName: '', date: '' });
//         setDescription('');
//         setMainImage(null);
//         setGalleryImages([]);
        
//         // Revoke object URLs
//         if (mainImagePreview) URL.revokeObjectURL(mainImagePreview);
//         galleryImagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
        
//         setMainImagePreview('');
//         setGalleryImagePreviews([]);
//         setErrors({});
//     };

//     return (
//         <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
//             <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg" noValidate>
//                 <h2 className="text-3xl font-bold text-[#f48321] mb-8">
//                     {isEditMode ? 'Edit Event' : 'Create New Event'}
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Event Name */}
//                     <FormInput 
//                         label="Event Name" 
//                         name="eventName" 
//                         type="text" 
//                         value={formData.eventName} 
//                         onChange={handleChange} 
//                         error={errors.eventName}
//                     />

//                     {/* Event Date */}
//                     <FormInput 
//                         label="Event Date" 
//                         name="date" 
//                         type="date" 
//                         value={formData.date} 
//                         onChange={handleChange} 
//                         error={errors.date}
//                     />

//                     {/* Location */}
//                     <FormInput 
//                         label="Location (e.g., Thane)" 
//                         name="location" 
//                         type="text" 
//                         value={formData.location} 
//                         onChange={handleChange} 
//                         error={errors.location}
//                     />

//                     {/* Facilitator Name */}
//                     <FormInput 
//                         label="Facilitator Name (Optional)" 
//                         name="facilitatorName" 
//                         type="text" 
//                         value={formData.facilitatorName} 
//                         onChange={handleChange} 
//                         error={errors.facilitatorName}
//                     />
                    
//                     {/* Description (ReactQuill) */}
//                     <div className="md:col-span-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Description
//                         </label>
//                         <ReactQuill 
//                             theme="snow"
//                             value={description}
//                             onChange={handleDescriptionChange}
//                             modules={quillModules}
//                             className={errors.description ? 'border border-red-500 rounded-lg' : ''}
//                         />
//                         {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
//                     </div>

//                     {/* Main Image Input with Drag & Drop */}
//                     <div className="md:col-span-2">
//                         <DragDropArea
//                             onFilesDrop={handleMainImageDrop}
//                             multiple={false}
//                             label="Main Event Image (for card)"
//                             error={errors.mainImage}
//                             previews={mainImagePreview ? [{ url: mainImagePreview }] : []}
//                         />
//                     </div>
                    
//                     {/* Gallery Images Input with Drag & Drop */}
//                     <div className="md:col-span-2">
//                         <DragDropArea
//                             onFilesDrop={handleGalleryImagesDrop}
//                             multiple={true}
//                             label="Gallery Images (Drag and drop multiple images)"
//                             error={errors.galleryImages}
//                             previews={galleryImagePreviews}
//                             onRemoveFile={removeGalleryImage}
//                         />
                        
//                         {/* Clear All Gallery Images Button */}
//                         {galleryImages.length > 0 && (
//                             <div className="mt-2 text-right">
//                                 <button
//                                     type="button"
//                                     onClick={clearAllGalleryImages}
//                                     className="text-sm text-red-600 hover:text-red-800 font-medium"
//                                 >
//                                     Clear All Gallery Images
//                                 </button>
//                             </div>
//                         )}
                        
//                         {/* Gallery Images Count */}
//                         {galleryImages.length > 0 && (
//                             <p className="text-sm text-gray-600 mt-2">
//                                 {galleryImages.length} image(s) selected
//                             </p>
//                         )}
//                     </div>
                    
//                     {/* Upload Progress & Submit Button */}
//                     <div className="md:col-span-2">
//                         {isSubmitting && (
//                             <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
//                                 <div 
//                                     className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
//                                     style={{ width: `${uploadProgress}%` }}
//                                 ></div>
//                                 <p className="text-sm text-center mt-1">{uploadProgress}% Uploaded</p>
//                             </div>
//                         )}
//                         <div className="text-right">
//                             <button 
//                                 type="submit" 
//                                 className="bg-[#2692d1] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 disabled:bg-gray-400"
//                                 disabled={isSubmitting}
//                             >
//                                 {isSubmitting ? 'Saving...' : isEditMode ? 'Update Event' : 'Create Event'}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };


import React, { useState, useCallback, useEffect } from 'react';
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axiosInstance from '../../utils/axiosInstance';
import { X, Upload, Image as ImageIcon, Calendar, MapPin, User } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const FormInput = ({ label, name, type, value, onChange, error, icon: Icon, ...props }) => {
    const inputStyle = "w-full pl-11 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2692d1] focus:border-transparent transition-all duration-300";
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <div className="relative">
                {Icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f48321]">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`${inputStyle} ${error ? 'border-red-400 ring-2 ring-red-100' : ''}`}
                    {...props}
                />
            </div>
            {error && <p className="text-red-500 text-xs mt-1.5 ml-1">{error}</p>}
        </div>
    );
};


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
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <ImageIcon size={16} className="mr-2 text-[#f48321]" />
                {label}
            </label>
            
            <div
                className={`border-3 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer
                    ${isDragging 
                        ? 'border-[#2692d1] bg-blue-50 scale-[1.02]' 
                        : 'border-gray-300 bg-gradient-to-br from-gray-50 to-white hover:border-[#f48321] hover:shadow-md'
                    } 
                    ${error ? 'border-red-400 bg-red-50/50' : ''}`}
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
                    <div className="space-y-3">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#2692d1] to-[#1e7bb8] rounded-full flex items-center justify-center">
                            <Upload className="text-white" size={28} />
                        </div>
                        <div className="flex text-sm items-center justify-center text-gray-600">
                            <span className="relative rounded-md font-semibold text-[#2692d1] hover:text-[#1e7bb8]">
                                Click to upload
                            </span>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">
                            PNG, JPG, GIF up to 5MB
                        </p>
                    </div>
                </label>
            </div>


            {error && <p className="text-red-500 text-xs mt-1.5 ml-1">{error}</p>}


            {/* Preview Section */}
            {previews && previews.length > 0 && (
                <div className="mt-5">
                    <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <ImageIcon size={14} className="mr-1.5 text-[#f48321]" />
                        Preview {multiple && `(${previews.length})`}
                    </p>
                    <div className={`grid gap-4 ${multiple ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6' : ''}`}>
                        {previews.map((preview, index) => (
                            <div key={index} className="relative group">
                                <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-[#2692d1] transition-all duration-200">
                                    <img 
                                        src={preview.url} 
                                        alt={`Preview ${index + 1}`} 
                                        className={`object-cover ${multiple ? 'w-full h-28' : 'w-full h-40'} group-hover:scale-110 transition-transform duration-300`} 
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                                </div>
                                {multiple && (
                                    <button
                                        type="button"
                                        onClick={() => onRemoveFile(index)}
                                        className="absolute -top-2 -right-2 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
                                    >
                                        <X size={16} strokeWidth={3} />
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


export const EventForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;


    const [formData, setFormData] = useState({ eventName: '', location: '', facilitatorName: '', date: '' });
    const [description, setDescription] = useState('');
    
    const [mainImage, setMainImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    
    const [mainImagePreview, setMainImagePreview] = useState('');
    const [galleryImagePreviews, setGalleryImagePreviews] = useState([]);


    const [existingGalleryImages, setExistingGalleryImages] = useState([]);


    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);



    useEffect(() => {
        if (isEditMode) {
            const fetchEventData = async () => {
                try {
                    const response = await axiosInstance.get(`/api/events/getEventById/${id}`);
                    const event = response.data.data;
                    setFormData({
                        eventName: event.eventName,
                        location: event.location,
                        facilitatorName: event.facilitatorName,
                        date: new Date(event.date).toISOString().split('T')[0],
                    });
                    setDescription(event.description);
                    setMainImagePreview(event.mainImage.url);
                    setExistingGalleryImages(event.galleryImages);
                    setGalleryImagePreviews(event.galleryImages.map(img => ({ ...img, isExisting: true })));
                } catch (error) {
                    console.error("Failed to fetch event data:", error);
                     toast.error("Could not load event data for editing.");
                }
            };
            fetchEventData();
        }
    }, [id, isEditMode]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleDescriptionChange = (value) => {
        setDescription(value);
        if (value && value !== '<p><br></p>') {
            setErrors(prev => ({ ...prev, description: null }));
        }
    };


    const handleMainImageDrop = (files) => {
        if (files.length > 0) {
            const file = files[0];
            setMainImage(file);
            setMainImagePreview(URL.createObjectURL(file));
            setErrors(prev => ({ ...prev, mainImage: null }));
        }
    };


    const handleGalleryImagesDrop = (files) => {
        const newFiles = files.map(file => ({
            url: URL.createObjectURL(file),
            file: file,
            isExisting: false
        }));
        setGalleryImages(prev => [...prev, ...files]);
        setGalleryImagePreviews(prev => [...prev, ...newFiles]);
    };


    const removeGalleryImage = (indexToRemove) => {
        const previewToRemove = galleryImagePreviews[indexToRemove];
        
        if (previewToRemove.isExisting) {
            setExistingGalleryImages(prev => prev.filter((_, index) => index !== existingGalleryImages.findIndex(img => img._id === previewToRemove._id)));
        } else {
            URL.revokeObjectURL(previewToRemove.url);
            setGalleryImages(prev => prev.filter((_, index) => index !== galleryImages.findIndex(f => f === previewToRemove.file)));
        }


        setGalleryImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
    };


    const clearAllGalleryImages = () => {
        galleryImagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
        setGalleryImages([]);
        setGalleryImagePreviews([]);
    };


    const validate = () => {
        const newErrors = {};
        if (!formData.eventName) newErrors.eventName = 'Event name is required';
        if (!formData.location) newErrors.location = 'Location is required';
        if (!formData.date) newErrors.date = 'Event date is required';
        if (!description || description === '<p><br></p>') {
            newErrors.description = 'Description is required';
        }
        if (!mainImage && !isEditMode) newErrors.mainImage = 'A main event image is required';
        if (galleryImages.length === 0 && existingGalleryImages.length === 0) newErrors.galleryImages = 'At least one gallery image is required';
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


        const data = new FormData();
        data.append('eventName', formData.eventName);
        data.append('location', formData.location);
        data.append('facilitatorName', formData.facilitatorName);
        data.append('date', formData.date);
        data.append('description', description);


        if (mainImage) {
            data.append('mainImage', mainImage);
        }
        
        galleryImages.forEach(file => {
            data.append('galleryImages', file);
        });


        if (isEditMode) {
            data.append('existingGalleryImages', JSON.stringify(existingGalleryImages));
        }


        try {
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percent);
                }
            };


            if (isEditMode) {
                await axiosInstance.put(`/api/events/${id}`, data, config);
                 toast.success('Event Updated Successfully!');
                navigate('/admin/events');
            } else {
                await axiosInstance.post('/api/events/create', data, config);
                toast.success('Event Created Successfully!');
                // ... resetForm() logic ...
                navigate('/admin/events');
            }
        } catch (error) {
            console.error("Submission failed:", error);
            toast.success('Operation failed. Please check the console.');
        } finally {
            setIsSubmitting(false);
        }
    };


    const resetForm = () => {
        setFormData({ eventName: '', location: '', facilitatorName: '', date: '' });
        setDescription('');
        setMainImage(null);
        setGalleryImages([]);
        
        if (mainImagePreview) URL.revokeObjectURL(mainImagePreview);
        galleryImagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
        
        setMainImagePreview('');
        setGalleryImagePreviews([]);
        setErrors({});
    };


    return (
        <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-orange-50/20 min-h-screen p-4 sm:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-[#2692d1] to-[#1e7bb8] p-8 rounded-2xl shadow-xl mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {isEditMode ? '✏️ Edit Event' : '✨ Create New Event'}
                    </h2>
                    <p className="text-blue-100">Fill in the details below to {isEditMode ? 'update' : 'create'} your event</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-100" noValidate>
                    <div className="space-y-8">
                        {/* Basic Information Section */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-[#f48321] inline-block">
                                📋 Basic Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <FormInput 
                                    label="Event Name" 
                                    name="eventName" 
                                    type="text" 
                                    value={formData.eventName} 
                                    onChange={handleChange} 
                                    error={errors.eventName}
                                    icon={ImageIcon}
                                    placeholder="Enter event name"
                                />

                                <FormInput 
                                    label="Event Date" 
                                    name="date" 
                                    type="date" 
                                    value={formData.date} 
                                    onChange={handleChange} 
                                    error={errors.date}
                                    icon={Calendar}
                                />

                                <FormInput 
                                    label="Location" 
                                    name="location" 
                                    type="text" 
                                    value={formData.location} 
                                    onChange={handleChange} 
                                    error={errors.location}
                                    icon={MapPin}
                                    placeholder="e.g., Mumbai, Thane"
                                />

                                <FormInput 
                                    label="Facilitator Name (Optional)" 
                                    name="facilitatorName" 
                                    type="text" 
                                    value={formData.facilitatorName} 
                                    onChange={handleChange} 
                                    error={errors.facilitatorName}
                                    icon={User}
                                    placeholder="Enter facilitator name"
                                />
                            </div>
                        </div>

                        {/* Description Section */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-[#f48321] inline-block">
                                📝 Description
                            </h3>
                            <div className="mt-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Event Description
                                </label>
                                <div className={`rounded-xl overflow-hidden border-2 ${errors.description ? 'border-red-400' : 'border-gray-200'} focus-within:border-[#2692d1] transition-colors`}>
                                    <ReactQuill 
                                        theme="snow"
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        modules={quillModules}
                                        placeholder="Write a detailed description of your event..."
                                    />
                                </div>
                                {errors.description && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.description}</p>}
                            </div>
                        </div>

                        {/* Images Section */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-[#f48321] inline-block">
                                🖼️ Event Images
                            </h3>
                            <div className="space-y-6 mt-6">
                                {/* Main Image */}
                                <DragDropArea
                                    onFilesDrop={handleMainImageDrop}
                                    multiple={false}
                                    label="Main Event Image (Featured)"
                                    error={errors.mainImage}
                                    previews={mainImagePreview ? [{ url: mainImagePreview }] : []}
                                />
                                
                                {/* Gallery Images */}
                                <DragDropArea
                                    onFilesDrop={handleGalleryImagesDrop}
                                    multiple={true}
                                    label="Gallery Images (Multiple)"
                                    error={errors.galleryImages}
                                    previews={galleryImagePreviews}
                                    onRemoveFile={removeGalleryImage}
                                />
                                
                                {/* Clear Gallery & Count */}
                                {galleryImages.length > 0 && (
                                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                                        <p className="text-sm font-medium text-[#2692d1]">
                                            ✓ {galleryImages.length} new image(s) selected
                                        </p>
                                        <button
                                            type="button"
                                            onClick={clearAllGalleryImages}
                                            className="text-sm text-red-600 hover:text-red-700 font-semibold hover:underline transition-colors"
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Upload Progress */}
                        {isSubmitting && (
                            <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-xl border-2 border-[#2692d1]">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold text-gray-700">Uploading...</span>
                                    <span className="text-sm font-bold text-[#f48321]">{uploadProgress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <div 
                                        className="bg-gradient-to-r from-[#2692d1] to-[#f48321] h-3 rounded-full transition-all duration-300 shadow-lg" 
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gray-100">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/events')}
                                className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 border-2 border-gray-200"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="flex-1 px-6 py-4 bg-gradient-to-r from-[#2692d1] to-[#1e7bb8] hover:from-[#1e7bb8] hover:to-[#2692d1] text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? '⏳ Saving...' : isEditMode ? '✅ Update Event' : '🚀 Create Event'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
