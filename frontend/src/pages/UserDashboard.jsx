// pages/UserDashboard.js - User dashboard for managing account
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FiUser,
    FiBook,
    FiClock,
    FiDollarSign,
    FiCalendar,
    FiBarChart2
} from 'react-icons/fi';
import { useSelector } from 'react-redux';

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const user = useSelector((state) => state.user.value)

    // Mock data
    const userData = {
        name: user.name,
        membership: 'Premium',
        joinDate: '2023-01-15',
        booksBorrowed: 24,
        currentLoans: 3,
        lateFees: 0,
        nextPayment: '2023-11-01'
    };

    const recentActivity = [
        { id: 1, action: 'Book Checkout', item: 'The Design of Everyday Things', date: '2023-10-15', status: 'Completed' },
        { id: 2, action: 'QR Check-in', item: 'Study Room A', date: '2023-10-14', status: 'Completed' },
        { id: 3, action: 'Book Return', item: 'Deep Work', date: '2023-10-12', status: 'Completed' },
        { id: 4, action: 'Payment', item: 'Monthly Membership', date: '2023-10-01', status: 'Completed' }
    ];

    const currentLoans = [
        { id: 1, title: 'Atomic Habits', dueDate: '2023-10-25', renewals: 1 },
        { id: 2, title: 'The Pragmatic Programmer', dueDate: '2023-10-28', renewals: 0 },
        { id: 3, title: 'Thinking, Fast and Slow', dueDate: '2023-11-05', renewals: 2 }
    ];

    const tabs = [
        { id: 'overview', label: 'Overview', icon: FiBarChart2 },
        { id: 'books', label: 'My Books', icon: FiBook },
        { id: 'attendance', label: 'Attendance', icon: FiClock },
        { id: 'payments', label: 'Payments', icon: FiDollarSign },
        { id: 'profile', label: 'Profile', icon: FiUser }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[#0F4C5C]">Current Loans</p>
                                        <p className="text-3xl font-bold text-[#16212A]">{userData.currentLoans}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-[#84C18B] bg-opacity-20 rounded-full flex items-center justify-center">
                                        <FiBook className="text-[#84C18B] text-xl" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[#0F4C5C]">Late Fees</p>
                                        <p className="text-3xl font-bold text-[#16212A]">${userData.lateFees}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-[#E04F5F] bg-opacity-20 rounded-full flex items-center justify-center">
                                        <FiDollarSign className="text-[#E04F5F] text-xl" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[#0F4C5C]">Total Borrowed</p>
                                        <p className="text-3xl font-bold text-[#16212A]">{userData.booksBorrowed}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-[#0F4C5C] bg-opacity-20 rounded-full flex items-center justify-center">
                                        <FiUser className="text-[#0F4C5C] text-xl" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-xl font-semibold text-[#16212A] mb-4">Recent Activity</h3>
                                <div className="space-y-4">
                                    {recentActivity.map(activity => (
                                        <div key={activity.id} className="flex items-center justify-between py-2 border-b border-[#F0F7F1]">
                                            <div>
                                                <p className="font-medium text-[#16212A]">{activity.action}</p>
                                                <p className="text-sm text-[#0F4C5C]">{activity.item}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-[#0F4C5C]">{activity.date}</p>
                                                <span className="inline-block px-2 py-1 bg-[#2EA86A] bg-opacity-20 text-[#2EA86A] text-xs rounded-full">
                                                    {activity.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-xl font-semibold text-[#16212A] mb-4">Current Loans</h3>
                                <div className="space-y-4">
                                    {currentLoans.map(loan => (
                                        <div key={loan.id} className="flex items-center justify-between py-2 border-b border-[#F0F7F1]">
                                            <div>
                                                <p className="font-medium text-[#16212A]">{loan.title}</p>
                                                <p className="text-sm text-[#0F4C5C]">Due: {loan.dueDate}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="inline-block px-2 py-1 bg-[#84C18B] bg-opacity-20 text-[#84C18B] text-xs rounded-full">
                                                    {loan.renewals} renewals
                                                </span>
                                                <button className="block mt-1 text-sm text-[#0F4C5C] hover:text-[#84C18B]">
                                                    Renew
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'books':
                return <div className="bg-white p-6 rounded-xl shadow-sm">My Books Content</div>;

            case 'attendance':
                return <div className="bg-white p-6 rounded-xl shadow-sm">Attendance Content</div>;

            case 'payments':
                return <div className="bg-white p-6 rounded-xl shadow-sm">Payments Content</div>;

            case 'profile':
                return <div className="bg-white p-6 rounded-xl shadow-sm">Profile Content</div>;

            default:
                return <div className="bg-white p-6 rounded-xl shadow-sm">Overview Content</div>;
        }
    };

    return (
        <div className="min-h-screen bg-[#F7FBF8] py-8">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-[#16212A]">Dashboard</h1>
                        <p className="text-[#0F4C5C]">Welcome back, {userData.name}</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <div className="lg:w-1/4">
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-[#F0F7F1]">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-[#84C18B] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                            {userData.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-[#16212A]">{userData.name}</h3>
                                            <p className="text-sm text-[#0F4C5C]">{userData.membership} Member</p>
                                        </div>
                                    </div>
                                </div>

                                <nav className="p-4">
                                    {tabs.map(tab => {
                                        const Icon = tab.icon;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${activeTab === tab.id
                                                    ? 'bg-[#84C18B] text-white'
                                                    : 'text-[#16212A] hover:bg-[#F0F7F1]'
                                                    }`}
                                            >
                                                <Icon className="text-lg" />
                                                <span>{tab.label}</span>
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:w-3/4">
                            {renderTabContent()}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default UserDashboard;