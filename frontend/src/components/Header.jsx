// components/Header.js - Modified for Admin-specific navigation
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
    FiSearch,
    FiBell,
    FiCreditCard,
    FiGrid,
    FiChevronDown,
    FiUserCheck,
    FiShield,
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
        const handleClickOutside = () => {
            setIsUserDropdownOpen(false);
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Main navigation items - visible to all users
    const navItems = [
        { path: '/', label: 'Home', icon: FiHome },
        { path: '/about', label: 'About', icon: FiUser },
        { path: '/services', label: 'Services', icon: FiSettings },
        { path: '/catalog', label: 'Catalog', icon: FiBook },
    ];

    // Admin-specific navigation items - only visible to admin users
    const getAdminNavItems = () => {
        return [
            { path: '/admin', label: 'Admin Dashboard', icon: FiGrid, description: 'Admin control panel' },
            { path: '/admin/students', label: 'Students', icon: FiUsers, description: 'Manage students' },
            { path: '/admin/attendance', label: 'Attendance', icon: FiClock, description: 'View attendance records' },
            { path: '/admin/analytics', label: 'Analytics', icon: FiPieChart, description: 'System analytics' },
            { path: '/admin/settings', label: 'Settings', icon: FiSettings, description: 'System configuration' },
        ];
    };

    // User-specific navigation items - only visible to regular users (non-admin)
    const getUserNavItems = () => {
        if (!user || user.role === 'admin') return []; // Hide user items for admin

        const baseItems = [
            { path: '/dashboard', label: 'Dashboard', icon: FiGrid, description: 'Your personal dashboard' },
            { path: '/qr-checkin', label: 'QR Check-in', icon: FaQrcode, description: 'Quick check-in system' },
            { path: '/payments', label: 'Payments', icon: FiCreditCard, description: 'Manage your payments' },
        ];

        // Librarian-specific items
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
        setIsMenuOpen(false);
        setIsUserDropdownOpen(false);
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
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-[#84C18B] rounded-lg flex items-center justify-center">
                            <FiBook className="text-white text-xl" />
                        </div>
                        <span className="text-2xl font-bold text-[#16212A]">LibraFlow</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-2">
                        {/* Always show main navigation */}
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = isActivePath(item.path);

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-1 py-2 px-4 rounded-lg transition-colors ${isActive
                                        ? 'bg-[#84C18B] text-white shadow-md'
                                        : 'text-[#16212A] hover:bg-[#F0F7F1] hover:text-[#84C18B]'
                                        }`}
                                >
                                    <Icon className="text-lg" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}

                        {/* Show admin navigation for admin users */}
                        {user?.role === 'admin' && adminNavItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = isActivePath(item.path);

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-1 py-2 px-4 rounded-lg transition-colors ${isActive
                                        ? 'bg-[#84C18B] text-white shadow-md'
                                        : 'text-[#16212A] hover:bg-[#F0F7F1] hover:text-[#84C18B]'
                                        }`}
                                    title={item.description}
                                >
                                    <Icon className="text-lg" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}

                        {/* Show user navigation for non-admin users */}
                        {user?.role !== 'admin' && userNavItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = isActivePath(item.path);

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-1 py-2 px-4 rounded-lg transition-colors ${isActive
                                        ? 'bg-[#84C18B] text-white shadow-md'
                                        : 'text-[#16212A] hover:bg-[#F0F7F1] hover:text-[#84C18B]'
                                        }`}
                                    title={item.description}
                                >
                                    <Icon className="text-lg" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Actions */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-4 relative">
                                {/* Notifications - Only show for admin if needed */}
                                {user.role === 'admin' && (
                                    <button className="p-2 text-[#16212A] hover:text-[#84C18B] transition-colors relative">
                                        <FiBell className="text-xl" />
                                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#E04F5F] rounded-full text-xs text-white flex items-center justify-center">
                                            3
                                        </span>
                                    </button>
                                )}

                                {/* User Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={toggleUserDropdown}
                                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#F0F7F1] transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-[#84C18B] rounded-full flex items-center justify-center text-white font-semibold">
                                            {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                                        </div>
                                        <span className="text-[#16212A] font-medium hidden lg:block">
                                            {user.name} ({user.role})
                                        </span>
                                        <FiChevronDown className={`transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* User Dropdown Menu */}
                                    <AnimatePresence>
                                        {isUserDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-[#E2E8F0] py-2 z-50"
                                            >
                                                {/* User Info */}
                                                <div className="px-4 py-3 border-b border-[#E2E8F0]">
                                                    <p className="font-semibold text-[#16212A]">{user.name}</p>
                                                    <p className="text-sm text-[#64748B] capitalize">{user.role} Account</p>
                                                </div>

                                                {/* Quick Links - Different for admin vs regular users */}
                                                <div className="py-2">
                                                    {user.role === 'admin' ? (
                                                        // Admin quick links
                                                        <>
                                                            {adminNavItems.slice(0, 3).map((item) => {
                                                                const Icon = item.icon;
                                                                return (
                                                                    <button
                                                                        key={item.path}
                                                                        onClick={() => handleNavigation(item.path)}
                                                                        className="flex items-center space-x-3 w-full px-4 py-2 text-left text-[#16212A] hover:bg-[#F0F7F1] transition-colors"
                                                                    >
                                                                        <Icon className="text-lg" />
                                                                        <div>
                                                                            <p className="font-medium">{item.label}</p>
                                                                            <p className="text-xs text-[#64748B]">{item.description}</p>
                                                                        </div>
                                                                    </button>
                                                                );
                                                            })}
                                                        </>
                                                    ) : (
                                                        // Regular user quick links
                                                        <>
                                                            {userNavItems.slice(0, 3).map((item) => {
                                                                const Icon = item.icon;
                                                                return (
                                                                    <button
                                                                        key={item.path}
                                                                        onClick={() => handleNavigation(item.path)}
                                                                        className="flex items-center space-x-3 w-full px-4 py-2 text-left text-[#16212A] hover:bg-[#F0F7F1] transition-colors"
                                                                    >
                                                                        <Icon className="text-lg" />
                                                                        <div>
                                                                            <p className="font-medium">{item.label}</p>
                                                                            <p className="text-xs text-[#64748B]">{item.description}</p>
                                                                        </div>
                                                                    </button>
                                                                );
                                                            })}
                                                        </>
                                                    )}
                                                </div>

                                                {/* Logout */}
                                                <div className="border-t border-[#E2E8F0] pt-2">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center space-x-3 w-full px-4 py-2 text-left text-[#E04F5F] hover:bg-red-50 transition-colors"
                                                    >
                                                        <FiLogOut className="text-lg" />
                                                        <span>Logout</span>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="text-[#16212A] hover:text-[#84C18B] transition-colors font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-[#84C18B] text-white px-6 py-2 rounded-lg hover:bg-[#76b082] transition-colors font-medium shadow-md"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-[#16212A] hover:text-[#84C18B] transition-colors"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden mt-4 overflow-hidden"
                        >
                            <nav className="flex flex-col space-y-1 pb-4">
                                {/* Main Navigation */}
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = isActivePath(item.path);

                                    return (
                                        <button
                                            key={item.path}
                                            onClick={() => handleNavigation(item.path)}
                                            className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors text-left w-full ${isActive
                                                ? 'bg-[#84C18B] text-white'
                                                : 'text-[#16212A] hover:bg-[#F0F7F1]'
                                                }`}
                                        >
                                            <Icon className="text-lg" />
                                            <span className="font-medium">{item.label}</span>
                                        </button>
                                    );
                                })}

                                {/* Admin Navigation for Admin Users */}
                                {user?.role === 'admin' && (
                                    <>
                                        <div className="border-t border-[#BEC9C1] my-2 pt-2">
                                            <p className="px-4 py-2 text-sm font-semibold text-[#64748B]">Admin Panel</p>
                                        </div>

                                        {adminNavItems.map((item) => {
                                            const Icon = item.icon;
                                            const isActive = isActivePath(item.path);

                                            return (
                                                <button
                                                    key={item.path}
                                                    onClick={() => handleNavigation(item.path)}
                                                    className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors text-left w-full ${isActive
                                                        ? 'bg-[#84C18B] text-white'
                                                        : 'text-[#16212A] hover:bg-[#F0F7F1]'
                                                        }`}
                                                >
                                                    <Icon className="text-lg" />
                                                    <div className="text-left">
                                                        <p className="font-medium">{item.label}</p>
                                                        <p className="text-xs text-[#64748B]">{item.description}</p>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </>
                                )}

                                {/* User Navigation for Non-Admin Users */}
                                {user && user.role !== 'admin' && (
                                    <>
                                        <div className="border-t border-[#BEC9C1] my-2 pt-2">
                                            <p className="px-4 py-2 text-sm font-semibold text-[#64748B]">My Account</p>
                                        </div>

                                        {userNavItems.map((item) => {
                                            const Icon = item.icon;
                                            const isActive = isActivePath(item.path);

                                            return (
                                                <button
                                                    key={item.path}
                                                    onClick={() => handleNavigation(item.path)}
                                                    className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors text-left w-full ${isActive
                                                        ? 'bg-[#84C18B] text-white'
                                                        : 'text-[#16212A] hover:bg-[#F0F7F1]'
                                                        }`}
                                                >
                                                    <Icon className="text-lg" />
                                                    <div className="text-left">
                                                        <p className="font-medium">{item.label}</p>
                                                        <p className="text-xs text-[#64748B]">{item.description}</p>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </>
                                )}

                                {/* User Info & Logout */}
                                {user && (
                                    <div className="border-t border-[#BEC9C1] my-2 pt-2">
                                        <div className="flex items-center justify-between py-3 px-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-[#84C18B] rounded-full flex items-center justify-center text-white font-semibold">
                                                    {user.name ? user.name.charAt(0).toUpperCase() : user.role === 'admin' ? 'A' : 'U'}
                                                </div>
                                                <div>
                                                    <p className="text-[#16212A] font-medium">{user.name}</p>
                                                    <p className="text-sm text-[#64748B] capitalize">{user.role} Account</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="text-[#16212A] hover:text-[#E04F5F] transition-colors p-2"
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