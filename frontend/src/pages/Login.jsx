// pages/Login.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiBook, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userinfo } from '../features/userinfo';
const url = import.meta.env.VITE_API_URL;

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/dashboard';

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            // Basic validation
            if (!formData.email || !formData.password) {
                setError('Please fill in all fields');
                setIsLoading(false);
                return;
            }

            const result = await axios.post(`${url}auth/login`, formData);

            if (result.data.success) {
                alert(result.data.message);
                dispatch(userinfo(result.data.data));
                localStorage.setItem('token', result.data.data.token)
                navigate(from, { replace: true });
            } else {
                setError(result.error)
            }
            setIsLoading(false);
        } catch (err) {
            alert(err.response.data.message)
        }
    };



    return (
        <div className="min-h-screen bg-[#F7FBF8] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <div className="mx-auto h-20 w-20 bg-[#84C18B] rounded-2xl flex items-center justify-center mb-4">
                        <FiBook className="text-white text-3xl" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#16212A]">Welcome Back</h2>
                    <p className="mt-2 text-[#0F4C5C]">Sign in to your library account</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white py-8 px-6 shadow-lg rounded-2xl"
                >
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#16212A] mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C18B] focus:border-transparent transition-colors"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#16212A] mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C18B] focus:border-transparent transition-colors"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-[#84C18B] focus:ring-[#84C18B]"
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>

                            <button type="button" className="text-sm text-[#84C18B] hover:text-[#76b082]">
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#84C18B] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#76b082] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#84C18B] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Signing in...
                                </div>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </form>

                    {/* Demo Login Buttons */}
                    <div className="mt-6 space-y-3">
                        <p className="text-center text-sm text-gray-600">Demo Accounts</p>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => demoLogin('user')}
                                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <FiUser className="mr-2" />
                                User Demo
                            </button>
                            <button
                                onClick={() => demoLogin('admin')}
                                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <FiUser className="mr-2" />
                                Admin Demo
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className="font-medium text-[#84C18B] hover:text-[#76b082] transition-colors"
                            >
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;