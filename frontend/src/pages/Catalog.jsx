// pages/Catalog.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiBook, FiStar, FiBookOpen } from 'react-icons/fi';

const Catalog = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('title');
    const [showAIOnly, setShowAIOnly] = useState(false);

    // Mock books data
    const categories = ['All', 'Technology', 'Science', 'Literature', 'History', 'Art', 'Business'];

    useEffect(() => {
        // Simulate API call
        const mockBooks = [
            {
                id: 1,
                title: "The Complete Guide to Modern Web Development",
                author: "Sarah Johnson",
                category: "Technology",
                rating: 4.5,
                available: true,
                hasAISummary: true,
                image: null
            },
            {
                id: 2,
                title: "Advanced Machine Learning",
                author: "Dr. Michael Chen",
                category: "Science",
                rating: 4.8,
                available: true,
                hasAISummary: true,
                image: null
            },
            {
                id: 3,
                title: "Classic Literature Collection",
                author: "Various Authors",
                category: "Literature",
                rating: 4.2,
                available: false,
                hasAISummary: false,
                image: null
            },
            // Add more mock books...
        ];

        setBooks(mockBooks);
        setFilteredBooks(mockBooks);
    }, []);

    useEffect(() => {
        filterBooks();
    }, [searchTerm, selectedCategory, sortBy, showAIOnly, books]);

    const filterBooks = () => {
        let filtered = books.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
            const matchesAI = !showAIOnly || book.hasAISummary;

            return matchesSearch && matchesCategory && matchesAI;
        });

        // Sort books
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'author':
                    return a.author.localeCompare(b.author);
                case 'rating':
                    return b.rating - a.rating;
                case 'category':
                    return a.category.localeCompare(b.category);
                default:
                    return 0;
            }
        });

        setFilteredBooks(filtered);
    };

    const BookCard = ({ book }) => (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
            <Link to={`/book/${book.id}`}>
                <div className="h-48 bg-gradient-to-br from-[#84C18B] to-[#0F4C5C] flex items-center justify-center">
                    {book.image ? (
                        <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                    ) : (
                        <FiBook className="text-white text-6xl" />
                    )}
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                        <span className="bg-[#84C18B] text-white px-2 py-1 rounded text-xs font-medium">
                            {book.category}
                        </span>
                        {book.hasAISummary && (
                            <span className="bg-[#0F4C5C] text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                                <FiBookOpen className="mr-1" /> AI
                            </span>
                        )}
                    </div>

                    <h3 className="font-bold text-lg text-[#16212A] mb-2 line-clamp-2">{book.title}</h3>
                    <p className="text-[#0F4C5C] mb-3">{book.author}</p>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <FiStar className="text-yellow-400 mr-1" />
                            <span className="text-sm font-medium">{book.rating}</span>
                        </div>
                        <span className={`text-sm font-medium ${book.available ? 'text-[#2EA86A]' : 'text-[#E04F5F]'
                            }`}>
                            {book.available ? 'Available' : 'Checked Out'}
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-[#F7FBF8] py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-bold text-[#16212A] mb-2">Library Catalog</h1>
                    <p className="text-[#0F4C5C]">Discover our collection of books and AI-enhanced study materials</p>
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-6 mb-8"
                >
                    <div className="grid md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="md:col-span-2">
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search books, authors, categories..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C18B] focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C18B] focus:border-transparent"
                        >
                            {categories.map(category => (
                                <option key={category} value={category.toLowerCase()}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        {/* Sort By */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C18B] focus:border-transparent"
                        >
                            <option value="title">Sort by Title</option>
                            <option value="author">Sort by Author</option>
                            <option value="rating">Sort by Rating</option>
                            <option value="category">Sort by Category</option>
                        </select>
                    </div>

                    {/* Additional Filters */}
                    <div className="flex items-center justify-between mt-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={showAIOnly}
                                onChange={(e) => setShowAIOnly(e.target.checked)}
                                className="rounded text-[#84C18B] focus:ring-[#84C18B]"
                            />
                            <span className="text-sm text-gray-700">Show only books with AI summaries</span>
                        </label>

                        <div className="text-sm text-gray-600">
                            {filteredBooks.length} books found
                        </div>
                    </div>
                </motion.div>

                {/* Books Grid */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <AnimatePresence>
                        {filteredBooks.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredBooks.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <FiBook className="text-6xl text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found</h3>
                        <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

// AnimatePresence component
const AnimatePresence = ({ children }) => children;

export default Catalog;