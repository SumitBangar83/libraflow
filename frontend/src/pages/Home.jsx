// pages/Home.js - Home page with hero section and features
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
    FiBook,
    FiClock,
    FiUsers,
    FiSearch,
    FiCheckCircle,
    FiArrowRight
} from 'react-icons/fi';

const Home = () => {
    const features = [
        {
            icon: FiBook,
            title: 'Extensive Catalog',
            description: 'Access thousands of physical books and AI-generated study materials'
        },
        {
            icon: FiClock,
            title: 'Time-Slot Attendance',
            description: 'QR-based check-in system with intelligent time slot management'
        },
        {
            icon: FiUsers,
            title: 'Student Management',
            description: 'Comprehensive tools for managing student accounts and activities'
        },
        {
            icon: FiSearch,
            title: 'AI-Powered Search',
            description: 'Find exactly what you need with our intelligent search system'
        }
    ];

    const stats = [
        { number: '10,000+', label: 'Books Available' },
        { number: '5,000+', label: 'Active Members' },
        { number: '500+', label: 'AI Study Guides' },
        { number: '99%', label: 'Satisfaction Rate' }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#84C18B] to-[#0F4C5C] text-white py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Modern Library Management
                            <span className="block text-[#F7FBF8]">Reimagined</span>
                        </h1>
                        <p className="text-xl mb-8 opacity-90">
                            Streamline your library experience with our AI-powered platform.
                            From QR check-ins to smart study aids, we've got you covered.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/catalog"
                                className="bg-white text-[#16212A] px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center"
                            >
                                Explore Catalog <FiArrowRight className="ml-2" />
                            </Link>
                            <Link
                                to="/about"
                                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-all"
                            >
                                Learn More
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-[#16212A] mb-4">Why Choose Our Library?</h2>
                        <p className="text-lg text-[#0F4C5C] max-w-2xl mx-auto">
                            Our platform combines traditional library services with cutting-edge technology
                            to provide an unparalleled experience for both students and administrators.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-[#F7FBF8] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="w-12 h-12 bg-[#84C18B] rounded-lg flex items-center justify-center mb-4">
                                        <Icon className="text-white text-xl" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#16212A] mb-2">{feature.title}</h3>
                                    <p className="text-[#0F4C5C]">{feature.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-r from-[#0F4C5C] to-[#16212A] text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                                <div className="text-[#BEC9C1]">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-4xl font-bold text-[#16212A] mb-4">Ready to Get Started?</h2>
                        <p className="text-lg text-[#0F4C5C] mb-8">
                            Join thousands of students and educators who are already using our platform
                            to enhance their library experience.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/signup"
                                className="bg-[#84C18B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6da774] transition-colors flex items-center justify-center"
                            >
                                Create Account <FiCheckCircle className="ml-2" />
                            </Link>
                            <Link
                                to="/services"
                                className="border border-[#84C18B] text-[#84C18B] px-6 py-3 rounded-lg font-semibold hover:bg-[#84C18B] hover:bg-opacity-10 transition-all"
                            >
                                View Services
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;