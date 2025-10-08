import React, { useState } from 'react';

const ContactForm = () => {
    // State for form input values
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        agree: false,
    });

    // State for validation errors
    const [errors, setErrors] = useState({});

    // Handles changes for all inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    // Validation logic
    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.phone) {
            newErrors.phone = 'Phone is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Enter a valid 10-digit number';
        }
        if (!formData.message) newErrors.message = 'Message is required';
        if (!formData.agree) newErrors.agree = 'You must agree to the terms';
        
        return newErrors;
    };

    // Handles form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default browser submission
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log("Form Submitted:", formData);
            // Reset form after successful submission
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
                agree: false,
            });
        }
    };

    const inputClasses = (fieldName) => 
        `w-full bg-white rounded-lg px-4 py-3 text-base border transition-all duration-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none ${
            errors[fieldName] ? 'border-red-500' : 'border-gray-100'
        }`;

    return (
        <form 
            onSubmit={handleSubmit} 
            className="w-full max-w-lg mx-auto bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-sm"
            noValidate // Disable default browser validation
        >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 text-left">Contact Us</h2>
            <div className="w-24 sm:w-48 border border-yellow-400 my-4" />
            
            <div className="space-y-5">
                <div>
                    <input 
                        type="text"
                        name="name"
                        placeholder="Enter Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClasses("name")}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                    <input 
                        type="email"
                        name="email"
                        placeholder="Enter Your Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClasses("email")}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                    <input 
                        type="tel"
                        name="phone"
                        placeholder="Enter Your Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClasses("phone")}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                
                <div>
                    <textarea
                        name="message"
                        placeholder="Message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className={inputClasses("message")}
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                
                <div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="agree"
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-400"
                        />
                        <label htmlFor="agree" className="ml-2 text-sm text-gray-700">
                            Yes, I agree with sharing my details with VSM Thane.
                        </label>
                    </div>
                     {errors.agree && <p className="text-red-500 text-sm mt-1">{errors.agree}</p>}
                </div>

                <div className="text-left">
                    <button
                        type="submit"
                        className="bg-[#FFCB05] hover:bg-yellow-500 text-black font-semibold rounded-lg text-md px-12 py-2 transition-colors duration-300"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
};


// ---== Main Contact Page Component ==---
export const ContactPage = () => {
    return (
        <div className="py-4">
            <div className="mx-auto max-w-[85vw]">
                
                <div className="text-left pb-6">
                    <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
                        <span className="text-[#f48220]">we are set to build</span>
                        <br />
                        <span className="text-[#2792d0]">a better way to fun and learn!</span>
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row gap-8 lg:gap-12 rounded-lg">
                    <div className="w-full md:w-1/2 flex items-stretch">
                         <ContactForm />
                    </div>

                    <div className="w-full md:w-1/2 rounded-lg overflow-hidden min-h-[450px]">
                        <iframe
                            title="Google Maps Location"
                            src="https://maps.google.com/maps?q=Vidyadaan%20Sahayak%20Mandal%20Thane&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 md:gap-20 mt-12 md:mt-16 items-start md:items-center">
                    <div className="w-full md:w-auto md:flex-grow">
                        <h3 className="font-bold text-xl sm:text-2xl text-slate-800">
                            Registered Office Address
                        </h3>
                        <div className="h-[2px] w-1/3 bg-yellow-400 rounded-full my-3 shadow" />
                        <address className="text-base sm:text-lg text-slate-600 not-italic leading-relaxed">
                            <strong className="text-slate-800">Vidyadaan Sahayak Mandal (VSM Thane)</strong><br />
                            Office No. 2, 1st Staircase, 1st floor, Khopat ST Stand building, Khopat,<br />
                            Thane, Maharashtra, India – 400602
                        </address>
                    </div>

                    <div className="flex-shrink-0 md:pr-10">
                        <div className="flex items-center mb-2">
                            {/* Phone SVG Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800 mr-3"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            <a href="tel:+919987437446" className="text-base sm:text-lg text-slate-600 hover:text-black">+91-9987437446</a>
                        </div>
                        <div className="flex items-center">
                             {/* Mail SVG Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800 mr-3"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                             <a href="mailto:vsmthane@gmail.com" className="text-base sm:text-lg text-slate-600 hover:text-black">vsmthane@gmail.com</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};