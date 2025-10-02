// pages/BookDetail.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { FiBook, FiUser, FiCalendar, FiTag, FiDownload, FiStar, FiBookOpen } from 'react-icons/fi';

const BookDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('description');

  // Mock book data
  const book = {
    id: id,
    title: "The Complete Guide to Modern Web Development",
    author: "Sarah Johnson",
    isbn: "978-3-16-148410-0",
    publishedYear: 2023,
    category: "Technology",
    pages: 384,
    language: "English",
    availableCopies: 3,
    totalCopies: 5,
    rating: 4.5,
    description: "A comprehensive guide covering modern web development technologies including React, Node.js, and cloud deployment strategies.",
    aiSummary: "This book provides an in-depth look at contemporary web development practices, focusing on component-based architecture and scalable solutions.",
    studyPath: [
      "Frontend Fundamentals (Weeks 1-2)",
      "React Deep Dive (Weeks 3-4)",
      "Backend Integration (Weeks 5-6)",
      "Deployment Strategies (Week 7)"
    ]
  };

  const handleBorrow = () => {
    // Implement borrow logic
    alert('Borrow request submitted!');
  };

  const handleDownloadAI = () => {
    // Implement download logic
    alert('AI summary downloaded!');
  };

  return (
    <div className="min-h-screen bg-[#F7FBF8] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Book Header */}
          <div className="md:flex p-8">
            <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
              <div className="w-64 h-80 bg-gradient-to-br from-[#84C18B] to-[#0F4C5C] rounded-lg shadow-2xl flex items-center justify-center">
                <FiBook className="text-white text-8xl" />
              </div>
            </div>
            
            <div className="md:w-2/3 md:pl-8">
              <div className="flex items-center mb-2">
                <span className="bg-[#84C18B] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {book.category}
                </span>
                <span className="ml-2 bg-[#0F4C5C] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <FiStar className="mr-1" /> {book.rating}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-[#16212A] mb-4">{book.title}</h1>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-[#0F4C5C]">
                  <FiUser className="mr-2" />
                  <span className="font-medium">Author:</span>
                  <span className="ml-2">{book.author}</span>
                </div>
                <div className="flex items-center text-[#0F4C5C]">
                  <FiCalendar className="mr-2" />
                  <span className="font-medium">Published:</span>
                  <span className="ml-2">{book.publishedYear}</span>
                </div>
                <div className="flex items-center text-[#0F4C5C]">
                  <FiTag className="mr-2" />
                  <span className="font-medium">ISBN:</span>
                  <span className="ml-2">{book.isbn}</span>
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-[#16212A]">Availability:</span>
                  <span className={`font-bold ${book.availableCopies > 0 ? 'text-[#2EA86A]' : 'text-[#E04F5F]'}`}>
                    {book.availableCopies} of {book.totalCopies} copies available
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#84C18B] h-2 rounded-full" 
                    style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleBorrow}
                  disabled={book.availableCopies === 0}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                    book.availableCopies > 0 
                      ? 'bg-[#84C18B] text-white hover:bg-[#76b082]' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {book.availableCopies > 0 ? 'Borrow Book' : 'Not Available'}
                </button>
                <button className="bg-[#0F4C5C] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#0d4150] transition-colors">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t">
            <div className="flex border-b">
              {['description', 'ai-summary', 'study-path'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-[#84C18B] border-b-2 border-[#84C18B]'
                      : 'text-gray-600 hover:text-[#84C18B]'
                  }`}
                >
                  {tab.replace('-', ' ')}
                </button>
              ))}
            </div>

            <div className="p-8">
              {activeTab === 'description' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="prose max-w-none"
                >
                  <h3 className="text-2xl font-bold text-[#16212A] mb-4">Book Description</h3>
                  <p className="text-gray-700 leading-relaxed">{book.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-[#F7FBF8] p-4 rounded-lg">
                      <h4 className="font-semibold text-[#0F4C5C] mb-2">Details</h4>
                      <p><strong>Pages:</strong> {book.pages}</p>
                      <p><strong>Language:</strong> {book.language}</p>
                      <p><strong>Category:</strong> {book.category}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'ai-summary' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-[#16212A]">AI Summary</h3>
                    <span className="bg-[#84C18B] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <FiBookOpen className="mr-1" /> AI Generated
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">{book.aiSummary}</p>
                  <button
                    onClick={handleDownloadAI}
                    className="bg-[#0F4C5C] text-white py-2 px-6 rounded-lg font-medium hover:bg-[#0d4150] transition-colors flex items-center"
                  >
                    <FiDownload className="mr-2" /> Download Summary
                  </button>
                </motion.div>
              )}

              {activeTab === 'study-path' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="text-2xl font-bold text-[#16212A] mb-4">AI Suggested Study Path</h3>
                  <div className="space-y-4">
                    {book.studyPath.map((step, index) => (
                      <div key={index} className="flex items-start bg-[#F7FBF8] p-4 rounded-lg">
                        <div className="bg-[#84C18B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookDetail;