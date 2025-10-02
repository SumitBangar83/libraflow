// components/Footer.js - Footer component
import React from 'react';
import { Link } from 'react-router-dom';
import { FiBook, FiFacebook, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="bg-[#16212A] text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-[#84C18B] rounded-lg flex items-center justify-center">
                                <FiBook className="text-white text-xl" />
                            </div>
                            <span className="text-2xl font-bold">LibraFlow</span>
                        </Link>
                        <p className="text-[#BEC9C1] mb-6">
                            Modern library management system with AI-powered features for students and administrators.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-[#BEC9C1] hover:text-white transition-colors">
                                <FiFacebook className="text-xl" />
                            </a>
                            <a href="#" className="text-[#BEC9C1] hover:text-white transition-colors">
                                <FiTwitter className="text-xl" />
                            </a>
                            <a href="#" className="text-[#BEC9C1] hover:text-white transition-colors">
                                <FiInstagram className="text-xl" />
                            </a>
                            <a href="#" className="text-[#BEC9C1] hover:text-white transition-colors">
                                <FiMail className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-[#BEC9C1] hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/about" className="text-[#BEC9C1] hover:text-white transition-colors">About</Link></li>
                            <li><Link to="/services" className="text-[#BEC9C1] hover:text-white transition-colors">Services</Link></li>
                            <li><Link to="/catalog" className="text-[#BEC9C1] hover:text-white transition-colors">Catalog</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-[#BEC9C1] hover:text-white transition-colors">Book Rental</a></li>
                            <li><a href="#" className="text-[#BEC9C1] hover:text-white transition-colors">Study Rooms</a></li>
                            <li><a href="#" className="text-[#BEC9C1] hover:text-white transition-colors">AI Study Aids</a></li>
                            <li><a href="#" className="text-[#BEC9C1] hover:text-white transition-colors">Research Help</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <address className="text-[#BEC9C1] not-italic">
                            <p>123 Library Lane</p>
                            <p>Knowledge City, KC 12345</p>
                            <p className="mt-2">Phone: (123) 456-7890</p>
                            <p>Email: info@libraflow.com</p>
                        </address>
                    </div>
                </div>

                <div className="border-t border-[#0F4C5C] mt-8 pt-8 text-center text-[#BEC9C1]">
                    <p>&copy; 2023 LibraFlow. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;