// pages/About.js - About page with company story, team, and testimonials
import React from 'react';

import {
    FiUsers,
    FiBook,
    FiAward,
    FiTarget,
    FiStar,

} from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
const About = () => {
    const stats = [
        { icon: FiUsers, number: '15,000+', label: 'Active Members' },
        { icon: FiBook, number: '50,000+', label: 'Books in Collection' },
        { icon: FiAward, number: '25+', label: 'Years of Service' },
        { icon: FiTarget, number: '98%', label: 'Satisfaction Rate' }
    ];

    const teamMembers = [
        {
            name: 'Sarah Johnson',
            role: 'Head Librarian',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            bio: '20+ years of experience in library science and digital transformation.'
        },
        {
            name: 'Michael Chen',
            role: 'Technology Director',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            bio: 'Expert in library management systems and AI integration.'
        },
        {
            name: 'Emily Rodriguez',
            role: 'Community Manager',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            bio: 'Dedicated to creating inclusive and engaging library programs.'
        },
        {
            name: 'David Kim',
            role: 'AI Research Lead',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            bio: 'Pioneering AI applications for educational content generation.'
        }
    ];

    const testimonials = [
        {
            quote: "This library transformed how our students access resources. The AI summaries are incredibly helpful for research.",
            author: "Dr. Jennifer Martinez",
            role: "University Professor",
            rating: 5,
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face"
        },
        {
            quote: "The QR check-in system saves me hours each week. Attendance management has never been easier.",
            author: "Robert Thompson",
            role: "School Administrator",
            rating: 5,
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
        },
        {
            quote: "As a student, the AI study guides have been invaluable for my exam preparation. Highly recommended!",
            author: "Alexis Brown",
            role: "Graduate Student",
            rating: 5,
            image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=100&h=100&fit=crop&crop=face"
        }
    ];

    const values = [
        {
            title: "Innovation",
            description: "Constantly evolving with technology to enhance the library experience",
            icon: "💡"
        },
        {
            title: "Accessibility",
            description: "Ensuring equal access to knowledge for all community members",
            icon: "♿"
        },
        {
            title: "Community",
            description: "Building strong connections through educational programs and events",
            icon: "👥"
        },
        {
            title: "Excellence",
            description: "Maintaining the highest standards in service and collections",
            icon: "⭐"
        }
    ];

    return (
        <div className="min-h-screen bg-[#F7FBF8]">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#84C18B] to-[#0F4C5C] text-white py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-3xl text-center mx-auto"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">About LibraFlow</h1>
                        <p className="text-xl opacity-90">
                            Revolutionizing library management through technology, innovation,
                            and a commitment to lifelong learning.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 bg-[#84C18B] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon className="text-[#84C18B] text-2xl" />
                                    </div>
                                    <div className="text-3xl font-bold text-[#16212A] mb-2">{stat.number}</div>
                                    <div className="text-[#0F4C5C]">{stat.label}</div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 bg-[#F7FBF8]">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold text-[#16212A] mb-6">Our Story</h2>
                            <div className="space-y-4 text-[#0F4C5C]">
                                <p>
                                    Founded in 1998, LibraFlow began as a small community library with a vision to
                                    make knowledge accessible to everyone. Over the years, we've evolved into a
                                    technology-driven institution serving thousands of members.
                                </p>
                                <p>
                                    Our journey into digital transformation started in 2015, when we recognized
                                    the need to adapt to changing learning habits and technological advancements.
                                    Today, we're proud to offer a seamless blend of traditional library services
                                    with cutting-edge AI technology.
                                </p>
                                <p>
                                    Our mission remains unchanged: to empower individuals and communities through
                                    accessible knowledge, innovative tools, and personalized learning experiences.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="bg-[#84C18B] h-80 w-full rounded-2xl"></div>
                            <div className="absolute -bottom-6 -left-6 bg-[#0F4C5C] h-64 w-full rounded-2xl"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-[#16212A] mb-4">Our Values</h2>
                        <p className="text-lg text-[#0F4C5C] max-w-2xl mx-auto">
                            These core principles guide everything we do and shape the experience
                            we create for our community.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center p-6"
                            >
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-semibold text-[#16212A] mb-3">{value.title}</h3>
                                <p className="text-[#0F4C5C]">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-[#F7FBF8]">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-[#16212A] mb-4">Meet Our Team</h2>
                        <p className="text-lg text-[#0F4C5C] max-w-2xl mx-auto">
                            Passionate professionals dedicated to advancing library services through innovation and expertise.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div className="h-48 bg-gradient-to-br from-[#84C18B] to-[#0F4C5C]"></div>
                                <div className="p-6 text-center -mt-16">
                                    <div className="w-24 h-24 bg-white rounded-full border-4 border-white mx-auto mb-4 overflow-hidden">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#16212A]">{member.name}</h3>
                                    <p className="text-[#84C18B] font-medium mb-3">{member.role}</p>
                                    <p className="text-sm text-[#0F4C5C]">{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-[#16212A] mb-4">What Our Community Says</h2>
                        <p className="text-lg text-[#0F4C5C] max-w-2xl mx-auto">
                            Hear from students, educators, and administrators who have experienced
                            the LibraFlow difference.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-[#F7FBF8] p-6 rounded-xl relative"
                            >
                                <FaQuoteLeft className="text-4xl text-[#84C18B] opacity-20 absolute top-4 right-4" />
                                <div className="flex items-center mb-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.author}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-[#16212A]">{testimonial.author}</h4>
                                        <p className="text-sm text-[#0F4C5C]">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-[#0F4C5C] mb-4 italic">"{testimonial.quote}"</p>
                                <div className="flex text-[#FFD700]">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FiStar key={i} className="fill-current" />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;