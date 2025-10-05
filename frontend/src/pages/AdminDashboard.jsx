// pages/AdminDashboard.js - Enhanced Admin Dashboard
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiBarChart2,
    FiUsers,
    FiClock,
    FiBook,
    FiFileText,
    FiDollarSign,
    FiPieChart,
    FiSettings,
    FiSearch,
    FiPlus,
    FiBell,
    FiCheckCircle,
    FiXCircle,
    FiMapPin,
    FiCalendar,
    FiDownload,
    FiFilter
} from 'react-icons/fi';
import { FaQrcode } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import io from 'socket.io-client'
// Enhanced Sub-pages with real functionality
const socket = io("https://libraflow-2ji3.onrender.com", {
    transports: ["websocket"], // ✅ Force websocket
});
const DashboardHome = () => {

    const [dashboardStats, setDashboardStats] = useState({
        totalStudents: 0,
        activeCheckins: 0,
        todayAttendance: 0,
        pendingPayments: 0
    });

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        // Mock API call
        const stats = await new Promise(resolve => setTimeout(() => resolve({
            totalStudents: 1247,
            activeCheckins: 87,
            todayAttendance: 324,
            pendingPayments: 1240
        }), 500));

        setDashboardStats(stats);
    };

    const stats = [
        {
            title: 'Total Students',
            value: dashboardStats.totalStudents.toLocaleString(),
            change: '+12%',
            icon: FiUsers,
            color: 'bg-blue-500'
        },
        {
            title: 'Active Check-ins',
            value: dashboardStats.activeCheckins,
            change: '+5%',
            icon: FiCheckCircle,
            color: 'bg-green-500'
        },
        {
            title: "Today's Attendance",
            value: dashboardStats.todayAttendance,
            change: '+8%',
            icon: FiClock,
            color: 'bg-purple-500'
        },
        {
            title: 'Pending Payments',
            value: `$${dashboardStats.pendingPayments}`,
            change: '-3%',
            icon: FiDollarSign,
            color: 'bg-yellow-500'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                        {stat.change} from yesterday
                                    </p>
                                </div>
                                <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                                    <Icon className={`text-xl ${stat.color.replace('bg-', 'text-')}`} />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4">Recent Check-ins</h3>
                    <RecentCheckinsList />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                            <FaQrcode className="mr-2" />
                            Generate Library QR Code
                        </button>
                        <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                            <FiClock className="mr-2" />
                            Manage Time Slots
                        </button>
                        <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                            <FiDownload className="mr-2" />
                            Export Attendance Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RecentCheckinsList = () => {
    const [recentCheckins, setRecentCheckins] = useState([]);

    useEffect(() => {
        // Mock data
        setRecentCheckins([
            { id: 1, studentName: 'John Doe', studentId: 'STU001', time: '10:30 AM', status: 'checked-in', location: 'Library Entrance' },
            { id: 2, studentName: 'Jane Smith', studentId: 'STU002', time: '10:25 AM', status: 'checked-out', location: 'Main Gate' },
            { id: 3, studentName: 'Mike Johnson', studentId: 'STU003', time: '10:15 AM', status: 'checked-in', location: 'Reading Room' }
        ]);
    }, []);

    return (
        <div className="space-y-3">
            {recentCheckins.map(checkin => (
                <div key={checkin.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                    <div>
                        <p className="font-medium">{checkin.studentName}</p>
                        <p className="text-sm text-gray-600">{checkin.studentId} • {checkin.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${checkin.status === 'checked-in'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                        }`}>
                        {checkin.status}
                    </span>
                </div>
            ))}
        </div>
    );
};

// Enhanced Students Management with Check-in/Checkout Tabs
const Students = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        // Mock data
        const mockStudents = [
            { id: 1, name: 'John Doe', studentId: 'STU001', email: 'john@edu.com', status: 'active', lastCheckin: '2024-01-15 10:30', currentStatus: 'checked-in' },
            { id: 2, name: 'Jane Smith', studentId: 'STU002', email: 'jane@edu.com', status: 'active', lastCheckin: '2024-01-15 09:45', currentStatus: 'checked-out' },
            { id: 3, name: 'Mike Johnson', studentId: 'STU003', email: 'mike@edu.com', status: 'inactive', lastCheckin: '2024-01-14 15:20', currentStatus: 'checked-out' }
        ];
        setStudents(mockStudents);
    };

    const tabs = [
        { id: 'all', label: 'All Students', count: students.length },
        { id: 'checked-in', label: 'Currently Checked-in', count: students.filter(s => s.currentStatus === 'checked-in').length },
        { id: 'active', label: 'Active', count: students.filter(s => s.status === 'active').length },
        { id: 'inactive', label: 'Inactive', count: students.filter(s => s.status === 'inactive').length }
    ];

    const filteredStudents = students.filter(student =>
        activeTab === 'all' ? true :
            activeTab === 'checked-in' ? student.currentStatus === 'checked-in' :
                student.status === activeTab
    );

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Students Management</h2>
                    <button className="bg-[#84C18B] text-white px-4 py-2 rounded-lg flex items-center">
                        <FiPlus className="mr-2" />
                        Add Student
                    </button>
                </div>

                <div className="flex space-x-1 mt-4 bg-gray-100 p-1 rounded-lg">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id
                                ? 'bg-white text-[#84C18B] shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {tab.label} ({tab.count})
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4">Student</th>
                                <th className="text-left py-3 px-4">Student ID</th>
                                <th className="text-left py-3 px-4">Status</th>
                                <th className="text-left py-3 px-4">Last Activity</th>
                                <th className="text-left py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map(student => (
                                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div>
                                            <p className="font-medium">{student.name}</p>
                                            <p className="text-sm text-gray-600">{student.email}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">{student.studentId}</td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${student.currentStatus === 'checked-in'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {student.currentStatus === 'checked-in' ? 'Checked-in' : 'Checked-out'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{student.lastCheckin}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                                            <button className="text-green-600 hover:text-green-800 text-sm">Check-in</button>
                                            <button className="text-red-600 hover:text-red-800 text-sm">Check-out</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Enhanced Attendance Tracking
const Attendance = () => {
    const attendance = useSelector((state) => state.attendance.value);
    const [dateRange, setDateRange] = useState('today');
    const [attendanceRecords, setAttendanceRecords] = useState(attendance);
    const [isConnected, setIsConnected] = useState(socket.connected);

    // 'useEffect' ka use socket connection aur events manage karne ke liye karein
    useEffect(() => {
        // Connection status ke liye listeners
        socket.on('connect', () => setIsConnected(true));
        socket.on('disconnect', () => setIsConnected(false));
        console.log(isConnected)

        // Server se 'attendance_updated' event ko sunein
        socket.on('attendance_updated', (newRecord) => {
            console.log('New attendance update received:', newRecord);
            // State ko update karein (naye record ko list mein sabse upar add karein)
            setAttendanceRecords(newRecord);
        });

        // ✅ IMPORTANT: Cleanup function
        // Jab component unmount ho, to listeners ko hata dein taki memory leak na ho
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('attendance_updated');
        };
    }, []); // Empty arra
    useEffect(() => {
        console.log("Connection status:", isConnected);
    }, [isConnected]);


    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Attendance Tracking</h2>
                    <div className="flex space-x-3">
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2"
                        >
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="custom">Custom Range</option>
                        </select>
                        <button className="border border-gray-300 rounded-lg px-4 py-2 flex items-center">
                            <FiDownload className="mr-2" />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4">Student</th>
                                <th className="text-left py-3 px-4">Check-in</th>
                                <th className="text-left py-3 px-4">Check-out</th>
                                <th className="text-left py-3 px-4">Duration</th>
                                <th className="text-left py-3 px-4">Location</th>
                                <th className="text-left py-3 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceRecords ? attendanceRecords.map(record => (
                                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div>
                                            <p className="font-medium">{record.student.email}</p>
                                            <p className="text-sm text-gray-600">{record.studentId}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">{`${new Date(record.checkInTime).getHours()}:${new Date(record.checkInTime).getMinutes()}, Date:${new Date(record.checkInTime).getDate()}/${new Date(record.checkInTime).getMonth()}/${new Date(record.checkInTime).getFullYear()}`}</td>
                                    <td className="py-3 px-4">{record.checkOutTime ? `${new Date(record.checkOutTime).getHours()}:${new Date(record.checkOutTime).getMinutes()}, Date:${new Date(record.checkOutTime).getDate()}/${new Date(record.checkOutTime).getMonth()}/${new Date(record.checkOutTime).getFullYear()}` : ''}</td>
                                    <td className="py-3 px-4">{record.duration}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            <FiMapPin className="text-gray-400 mr-1" size={14} />
                                            {record.location.lat}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${record.checkout === '--'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {record.checkOutTime === null ? 'Currently in Library' : 'Completed'}
                                        </span>
                                    </td>
                                </tr>
                            )) : ''}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Enhanced Time Slots Management with QR Generation
const Slots = () => {
    const [timeSlots, setTimeSlots] = useState([]);
    const [showQRModal, setShowQRModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        fetchTimeSlots();
    }, []);

    const fetchTimeSlots = async () => {
        // Mock data
        const slots = await new Promise(resolve => setTimeout(() => resolve([
            { id: 1, name: 'Morning Session', start: '09:00', end: '11:00', maxStudents: 50, current: 32, active: true },
            { id: 2, name: 'Late Morning', start: '11:00', end: '13:00', maxStudents: 50, current: 28, active: true },
            { id: 3, name: 'Afternoon Session', start: '14:00', end: '16:00', maxStudents: 50, current: 45, active: true },
            { id: 4, name: 'Evening Session', start: '16:00', end: '18:00', maxStudents: 50, current: 18, active: false }
        ]), 500));

        setTimeSlots(slots);
    };

    const generateQRCode = (slot) => {
        setSelectedSlot(slot);
        setShowQRModal(true);
    };

    const QRModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">QR Code for {selectedSlot?.name}</h3>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <pre className="text-xs overflow-auto">
                        {JSON.stringify({
                            type: 'library_qr',
                            slotId: selectedSlot?.id,
                            slotName: selectedSlot?.name,
                            validFrom: selectedSlot?.start,
                            validTo: selectedSlot?.end,
                            timestamp: new Date().toISOString()
                        }, null, 2)}
                    </pre>
                </div>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={() => setShowQRModal(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                    >
                        Close
                    </button>
                    <button className="px-4 py-2 bg-[#84C18B] text-white rounded-lg">
                        Download QR
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Time Slots Management</h2>
                    <button className="bg-[#84C18B] text-white px-4 py-2 rounded-lg flex items-center">
                        <FiPlus className="mr-2" />
                        Add Time Slot
                    </button>
                </div>
            </div>

            <div className="p-6">
                <div className="grid gap-4">
                    {timeSlots.map(slot => (
                        <div key={slot.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-semibold">{slot.name}</h4>
                                    <p className="text-gray-600">{slot.start} - {slot.end}</p>
                                    <div className="flex items-center mt-2">
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-green-500 h-2 rounded-full"
                                                style={{ width: `${(slot.current / slot.maxStudents) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-gray-600 ml-2">
                                            {slot.current}/{slot.maxStudents} students
                                        </span>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => generateQRCode(slot)}
                                        className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    >
                                        <FaQrcode className="mr-1" />
                                        Generate QR
                                    </button>
                                    <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm">
                                        Edit
                                    </button>
                                    <button className={`px-3 py-2 rounded-lg text-sm ${slot.active
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                        }`}>
                                        {slot.active ? 'Active' : 'Inactive'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showQRModal && <QRModal />}
        </div>
    );
};

// Other components remain similar but enhanced...
const Catalog = () => <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">Catalog Management</div>;
const Content = () => <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">AI Content Management</div>;
const Payments = () => <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">Payments Overview</div>;
const Reports = () => <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">Reports & Analytics</div>;
const Settings = () => <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">System Settings</div>;

const AdminDashboard = () => {
    const user = useSelector((state) => state.user.value);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [location, setLocation] = useState({ lat: 22.7196, lon: 75.8577 });
    const GenerateQrCode = async () => {
        console.log("hello")
        try {
            // 1. Prepare info
            const qrData = {
                name: user.name,
                role: user.role,
                location: { lat: location.lat, lon: location.lon },
            };

            const jsonString = JSON.stringify(qrData);

            // 2. Generate QR as PNG Data URL
            const url = await QRCode.toDataURL(jsonString, {
                width: 250,
                margin: 2,
            });

            // 🔹 OPTION A: Auto-download as PNG
            const link = document.createElement("a");
            link.href = url;
            link.download = "user-qr.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // 🔹 OPTION B: Auto-download as PDF
            const pdf = new jsPDF();
            pdf.setFontSize(14);
            pdf.text("User QR Code", 10, 10);
            pdf.text(`Name: ${user.name}`, 10, 20);
            pdf.text(`Role: ${user.role}`, 10, 30);
            pdf.text(`Lat: ${location.lat}`, 10, 40);
            pdf.text(`Lon: ${location.lon}`, 10, 50);

            // Add QR image
            pdf.addImage(url, "PNG", 10, 60, 100, 100);
            pdf.save("user-qr.pdf");
        } catch (err) {
            console.error(err);
            alert("Error generating QR");
        }
    };



    const menuItems = [
        { path: '/admin', label: 'Dashboard', icon: FiBarChart2 },
        { path: '/admin/students', label: 'Students', icon: FiUsers },
        { path: '/admin/attendance', label: 'Attendance', icon: FiClock },
        { path: '/admin/slots', label: 'Time Slots', icon: FiClock },
        { path: '/admin/catalog', label: 'Catalog', icon: FiBook },
        { path: '/admin/content', label: 'Content', icon: FiFileText },
        { path: '/admin/payments', label: 'Payments', icon: FiDollarSign },
        { path: '/admin/reports', label: 'Reports', icon: FiPieChart },
        { path: '/admin/settings', label: 'Settings', icon: FiSettings }
    ];








    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200`}>
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-900">Library Admin</h1>
                    <p className="text-sm text-gray-600">Attendance System</p>
                </div>

                <nav className="p-4">
                    {menuItems.map(item => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${isActive
                                    ? 'bg-[#84C18B] text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <Icon className="text-lg" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:ml-0">
                {/* Top Bar */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                            <button
                                className="lg:hidden p-2 mr-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search students, attendance..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84C18B] focus:border-transparent w-64"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
                                <FiBell className="text-xl" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">3</span>
                            </button>

                            <button className="bg-[#84C18B] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#76b082] transition-colors" onClick={GenerateQrCode}>
                                <FaQrcode className="text-lg" />
                                <span>Generate QR</span>
                            </button>

                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-[#84C18B] rounded-full flex items-center justify-center text-white font-semibold">
                                    A
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Admin User</p>
                                    <p className="text-xs text-gray-600">Library Manager</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    <Routes>
                        <Route path="/" element={<DashboardHome />} />
                        <Route path="/students" element={<Students />} />
                        <Route path="/attendance" element={<Attendance />} />
                        <Route path="/slots" element={<Slots />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/content" element={<Content />} />
                        <Route path="/payments" element={<Payments />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminDashboard;