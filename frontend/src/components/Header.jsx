// components/Header.js - Enhanced with proper spacing and responsive design
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
    FiHome,
    FiUser,
    FiBook,
    FiSettings,
    FiLogOut,
    FiMenu,
    FiX,
    FiBell,
    FiCreditCard,
    FiGrid,
    FiChevronDown,
    FiUserCheck,
    FiBarChart2,
    FiUsers,
    FiClock,
    FiPieChart
} from 'react-icons/fi';
import { FaQrcode } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { userinfo } from '../features/userinfo';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const user = useSelector((state) => state.user.value);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.user-dropdown') && !event.target.closest('.user-dropdown-trigger')) {
                setIsUserDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Main navigation items - visible to all users
    const navItems = [
        { path: '/', label: 'Home', icon: FiHome },
        { path: '/about', label: 'About', icon: FiUser },
        { path: '/services', label: 'Services', icon: FiSettings },
        { path: '/catalog', label: 'Catalog', icon: FiBook },
    ];

    // Admin-specific navigation items
    const getAdminNavItems = () => {
        return [
            { path: '/admin', label: 'Dashboard', icon: FiGrid, description: 'Admin control panel' },

            { path: '/admin/settings', label: 'Settings', icon: FiSettings, description: 'System configuration' },
        ];
    };

    // User-specific navigation items
    const getUserNavItems = () => {
        if (!user || user.role === 'admin') return [];

        const baseItems = [
            { path: '/dashboard', label: 'Dashboard', icon: FiGrid, description: 'Your personal dashboard' },
            { path: '/qr-checkin', label: 'QR Check-in', icon: FaQrcode, description: 'Quick check-in system' },
            { path: '/payments', label: 'Payments', icon: FiCreditCard, description: 'Manage your payments' },
        ];

        if (user.role === 'librarian') {
            baseItems.push(
                { path: '/librarian/checkins', label: 'Check-in Manager', icon: FiUserCheck, description: 'Manage user check-ins' }
            );
        }

        return baseItems;
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsUserDropdownOpen(false);
    };

    const toggleUserDropdown = (e) => {
        e.stopPropagation();
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(userinfo(''));
        setIsMenuOpen(false);
        setIsUserDropdownOpen(false);
        navigate('/');
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const isActivePath = (path) => {
        if (path === '/admin' || path === '/dashboard') {
            return location.pathname.startsWith('/admin') ||
                location.pathname.startsWith('/dashboard') ||
                location.pathname.startsWith('/librarian');
        }
        return location.pathname === path || location.pathname.startsWith(path);
    };

    const adminNavItems = user?.role === 'admin' ? getAdminNavItems() : [];
    const userNavItems = getUserNavItems();

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Header Container */}
                <div className="flex justify-between items-center h-16 lg:h-20">
                    {/* Logo Section */}
                    <Link
                        to="/"
                        className="flex items-center space-x-3 flex-shrink-0 hover:opacity-90 transition-opacity mr-6"
                    >
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#84C18B] rounded-xl flex items-center justify-center shadow-md">
                            <FiBook className="text-white text-lg lg:text-xl" />
                        </div>
                        <span className="text-2xl lg:text-3xl font-bold text-[#16212A] tracking-tight">
                            LibraFlow
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                        {/* Main Navigation */}
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = isActivePath(item.path);

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-2 py-2.5 px-4 rounded-xl transition-all duration-200 font-medium text-sm xl:text-base ${isActive
                                        ? 'bg-[#84C18B] text-white shadow-lg shadow-[#84C18B]/25'
                                        : 'text-[#16212A] hover:bg-[#F7FBF8] hover:text-[#84C18B] active:scale-95'
                                        }`}
                                >
                                    <Icon className="text-lg flex-shrink-0" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}

                        {/* Admin Navigation */}
                        {user?.role === 'admin' && adminNavItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = isActivePath(item.path);

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-2 py-2.5 px-4 rounded-xl transition-all duration-200 font-medium text-sm xl:text-base ${isActive
                                        ? 'bg-[#84C18B] text-white shadow-lg shadow-[#84C18B]/25'
                                        : 'text-[#16212A] hover:bg-[#F7FBF8] hover:text-[#84C18B] active:scale-95'
                                        }`}
                                    title={item.description}
                                >
                                    <Icon className="text-lg flex-shrink-0" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}

                        {/* User Navigation */}
                        {user?.role !== 'admin' && userNavItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = isActivePath(item.path);

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-2 py-2.5 px-4 rounded-xl transition-all duration-200 font-medium text-sm xl:text-base ${isActive
                                        ? 'bg-[#84C18B] text-white shadow-lg shadow-[#84C18B]/25'
                                        : 'text-[#16212A] hover:bg-[#F7FBF8] hover:text-[#84C18B] active:scale-95'
                                        }`}
                                    title={item.description}
                                >
                                    <Icon className="text-lg flex-shrink-0" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Actions Section */}
                    <div className="flex items-center space-x-3 lg:space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-3 lg:space-x-4">
                                {/* Notifications - Admin Only */}
                                {user.role === 'admin' && (
                                    <button
                                        className="relative p-2.5 text-[#16212A] hover:text-[#84C18B] transition-colors duration-200 rounded-lg hover:bg-[#F7FBF8] active:scale-95"
                                        aria-label="Notifications"
                                    >
                                        <FiBell className="text-xl lg:text-2xl" />
                                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E04F5F] rounded-full text-xs text-white flex items-center justify-center font-medium shadow-sm">
                                            3
                                        </span>
                                    </button>
                                )}

                                {/* User Dropdown */}
                                <div className="relative user-dropdown">
                                    <button
                                        onClick={toggleUserDropdown}
                                        className="user-dropdown-trigger flex items-center space-x-2 lg:space-x-3 p-2 lg:p-2.5 rounded-xl hover:bg-[#F7FBF8] transition-all duration-200 active:scale-95 border border-transparent hover:border-gray-200"
                                    >
                                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-[#84C18B] to-[#76b082] rounded-full flex items-center justify-center text-white font-semibold text-sm lg:text-base shadow-md">
                                            {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                                        </div>
                                        <div className="hidden xl:block text-left">
                                            <p className="text-[#16212A] font-semibold text-sm leading-tight">
                                                {user.name}
                                            </p>
                                            <p className="text-[#64748B] text-xs capitalize">
                                                {user.role} Account
                                            </p>
                                        </div>
                                        <FiChevronDown
                                            className={`text-[#64748B] transition-transform duration-200 flex-shrink-0 ${isUserDropdownOpen ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>

                                    {/* User Dropdown Menu */}
                                    <AnimatePresence>
                                        {isUserDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-2 w-72 lg:w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
                                            >
                                                {/* User Info Header */}
                                                <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-[#F7FBF8] to-white">
                                                    <p className="font-bold text-[#16212A] text-sm lg:text-base">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-[#64748B] text-xs lg:text-sm capitalize mt-0.5">
                                                        {user.role} Account
                                                    </p>
                                                </div>

                                                {/* Quick Links */}
                                                <div className="py-2 max-h-64 overflow-y-auto">
                                                    {(user.role === 'admin' ? adminNavItems : userNavItems)
                                                        .slice(0, 4)
                                                        .map((item) => {
                                                            const Icon = item.icon;
                                                            return (
                                                                <button
                                                                    key={item.path}
                                                                    onClick={() => handleNavigation(item.path)}
                                                                    className="flex items-center space-x-3 w-full px-4 py-3 text-left text-[#16212A] hover:bg-[#F7FBF8] transition-colors duration-150 group"
                                                                >
                                                                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg group-hover:bg-[#84C18B] group-hover:text-white transition-colors duration-200">
                                                                        <Icon className="text-lg" />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="font-semibold text-sm text-gray-900 group-hover:text-[#84C18B] transition-colors">
                                                                            {item.label}
                                                                        </p>
                                                                        <p className="text-xs text-gray-500 truncate">
                                                                            {item.description}
                                                                        </p>
                                                                    </div>
                                                                </button>
                                                            );
                                                        })}
                                                </div>

                                                {/* Logout */}
                                                <div className="border-t border-gray-100 pt-2">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center space-x-3 w-full px-4 py-3 text-left text-[#E04F5F] hover:bg-red-50 transition-colors duration-150 group rounded-lg mx-2 mb-1"
                                                    >
                                                        <div className="flex items-center justify-center w-8 h-8 bg-red-50 rounded-lg group-hover:bg-[#E04F5F] transition-colors duration-200">
                                                            <FiLogOut className="text-lg text-[#E04F5F] group-hover:text-white transition-colors" />
                                                        </div>
                                                        <span className="font-semibold text-sm">Logout</span>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ) : (
                            // Login/Signup Buttons
                            <div className="flex items-center space-x-3">
                                <Link
                                    to="/login"
                                    className="text-[#16212A] hover:text-[#84C18B] transition-colors duration-200 font-semibold text-sm lg:text-base px-3 py-2 rounded-lg hover:bg-[#F7FBF8] active:scale-95"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-[#84C18B] text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-xl hover:bg-[#76b082] transition-all duration-200 font-semibold text-sm lg:text-base shadow-lg hover:shadow-xl shadow-[#84C18B]/25 hover:shadow-[#84C18B]/35 active:scale-95"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2.5 text-[#16212A] hover:text-[#84C18B] hover:bg-[#F7FBF8] transition-all duration-200 rounded-lg active:scale-95"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <FiX className="text-2xl" />
                            ) : (
                                <FiMenu className="text-2xl" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden overflow-hidden border-t border-gray-100 bg-white"
                        >
                            <nav className="py-4 space-y-1">
                                {/* Main Navigation */}
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = isActivePath(item.path);

                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={`flex items-center space-x-3 py-3 px-4 rounded-xl mx-2 transition-all duration-200 ${isActive
                                                ? 'bg-[#84C18B] text-white shadow-md'
                                                : 'text-[#16212A] hover:bg-[#F7FBF8]'
                                                }`}
                                        >
                                            <Icon className="text-xl flex-shrink-0" />
                                            <span className="font-semibold text-base">{item.label}</span>
                                        </Link>
                                    );
                                })}

                                {/* Admin Navigation Section */}
                                {user?.role === 'admin' && (
                                    <>
                                        <div className="border-t border-gray-200 mt-4 pt-4 mx-4">
                                            <p className="px-4 py-2 text-sm font-bold text-gray-500 uppercase tracking-wide">
                                                Admin Panel
                                            </p>
                                        </div>
                                        {adminNavItems.map((item) => {
                                            const Icon = item.icon;
                                            const isActive = isActivePath(item.path);

                                            return (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    className={`flex items-center space-x-3 py-3 px-4 rounded-xl mx-2 transition-all duration-200 ${isActive
                                                        ? 'bg-[#84C18B] text-white shadow-md'
                                                        : 'text-[#16212A] hover:bg-[#F7FBF8]'
                                                        }`}
                                                >
                                                    <Icon className="text-xl flex-shrink-0" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-base">{item.label}</p>
                                                        <p className="text-gray-500 text-sm mt-0.5">{item.description}</p>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </>
                                )}

                                {/* User Navigation Section */}
                                {user && user.role !== 'admin' && (
                                    <>
                                        <div className="border-t border-gray-200 mt-4 pt-4 mx-4">
                                            <p className="px-4 py-2 text-sm font-bold text-gray-500 uppercase tracking-wide">
                                                My Account
                                            </p>
                                        </div>
                                        {userNavItems.map((item) => {
                                            const Icon = item.icon;
                                            const isActive = isActivePath(item.path);

                                            return (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    className={`flex items-center space-x-3 py-3 px-4 rounded-xl mx-2 transition-all duration-200 ${isActive
                                                        ? 'bg-[#84C18B] text-white shadow-md'
                                                        : 'text-[#16212A] hover:bg-[#F7FBF8]'
                                                        }`}
                                                >
                                                    <Icon className="text-xl flex-shrink-0" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-base">{item.label}</p>
                                                        <p className="text-gray-500 text-sm mt-0.5">{item.description}</p>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </>
                                )}

                                {/* User Info & Logout in Mobile */}
                                {user && (
                                    <div className="border-t border-gray-200 mt-4 pt-4 mx-4">
                                        <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-[#84C18B] to-[#76b082] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                                                    {user.name ? user.name.charAt(0).toUpperCase() : user.role === 'admin' ? 'A' : 'U'}
                                                </div>
                                                <div>
                                                    <p className="text-[#16212A] font-bold text-base">{user.name}</p>
                                                    <p className="text-gray-500 text-sm capitalize">{user.role} Account</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="p-3 text-[#E04F5F] hover:bg-red-50 transition-colors duration-200 rounded-lg active:scale-95"
                                            >
                                                <FiLogOut className="text-xl" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Header;