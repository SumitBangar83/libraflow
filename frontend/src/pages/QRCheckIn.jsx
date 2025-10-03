// pages/QRCheckIn.js
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { QrReader } from 'react-qr-reader'
import { FiCamera, FiCheckCircle, FiClock, FiMapPin, FiLogIn, FiLogOut, FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { attendanceinfo } from '../features/attendance';
import { userinfo } from '../features/userinfo';
const url = import.meta.env.VITE_API_URL;

const QRCheckIn = () => {
    const [scanResult, setScanResult] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [attendanceStatus, setAttendanceStatus] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [currentTimeSlot, setCurrentTimeSlot] = useState(null);
    const [actionType, setActionType] = useState(''); // 'checkin' or 'checkout'
    const [userData, setUserData] = useState(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false); // Add processing flag
    const qrReaderRef = useRef(null);
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value)

    // Library location settings (would come from admin panel)
    const LIBRARY_LOCATION = {
        lat: 22.7634, // Example library coordinates
        lng: 75.8657,
        radius: 100 // meters
    };

    useEffect(() => {
        // Get user location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => console.log('Location access denied')
            );
        }

        // Load user data from token (mock)
        const token = localStorage.getItem('token');
        if (token) {
            // Decode token and get user data
            setUserData({
                id: user._id,
                name: user.name,
                studentId: 'STU2024001',
                email: user.email
            });
        }

        // Cleanup function to stop camera when component unmounts
        return () => {
            stopCamera();
        };
    }, []);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371000; // Earth's radius in meters
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const isWithinLibrary = () => {
        if (!userLocation) return false;
        const distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            LIBRARY_LOCATION.lat,
            LIBRARY_LOCATION.lng
        );
        return distance <= LIBRARY_LOCATION.radius;
    };

    const stopCamera = () => {
        setCameraActive(false);
        setIsScanning(false);
        setIsProcessing(false); // Reset processing flag
    };

    const handleScan = (result) => {
        console.log("Scan result:", result);

        // Prevent multiple scans and processing
        if (result && !scanResult && !isProcessing) {
            setScanResult(result.text);
            setIsProcessing(true); // Set processing flag to prevent duplicate scans
            setIsScanning(false);
            setCameraActive(false); // Turn off camera after successful scan
            processAttendance(result.text);
        }
    };

    const processAttendance = async (qrData) => {
        try {

            // Verify QR data contains library information
            const qrInfo = JSON.parse(qrData);
            console.log("Processing attendance:", qrInfo);
            if (qrInfo.name != "admin lala") {
                setAttendanceStatus({ success: false, message: 'check you are in correct library' })
                return;
            }

            if (actionType === 'checkin') {
                // Check location only for checkin
                if (!isWithinLibrary()) {
                    setAttendanceStatus({
                        success: false,
                        message: 'You must be within library premises to check in'
                    });
                    setIsProcessing(false); // Reset processing flag
                    return;
                }

                const obj = {
                    id: user,
                    studentId: user.email,
                    action: actionType,
                    timestamp: new Date().toISOString(),
                    location: userLocation,
                    qrData: qrInfo,
                    slot: 'afternoon'
                }

                // Send attendance data to backend
                const response = await axios.post(`${url}attendance/checkin`, obj, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });

                if (response.data.success) {
                    setAttendanceStatus({
                        success: true,
                        currentStatus: 'checkedin',
                        timeRemaining: 600000,
                        message: 'Successfully checked in!'
                    });
                    const result = await axios.get(`${url}attendance/live`);
                    if (result.data.success) {
                        dispatch(attendanceinfo({ data: result.data.data, user: user }));
                    }
                    // If check-in successful, set timeout for notification
                    setTimeout(() => {
                        console.log('Time slot ending soon notification');
                    }, 600000);
                }

            } else if (actionType === 'checkout') {
                const obj = {
                    id: user,
                    studentId: user.email,
                    action: actionType,
                    timestamp: new Date().toISOString(),
                    location: userLocation,
                    qrData: qrInfo,
                    slot: 'afternoon'
                }

                const response = await axios.post(`${url}attendance/checkout/${user._id}`, obj, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });

                if (response.data.success) {
                    setAttendanceStatus({
                        success: true,
                        currentStatus: 'checkout',
                        message: 'Successfully checked out!'
                    });
                    const result = await axios.get(`${url}attendance/live`);
                    if (result.data.success) {
                        dispatch(attendanceinfo({ data: result.data.data, user: user }));
                    }
                }
            }

        } catch (error) {
            console.log("Error:", error.message);
            setAttendanceStatus({
                success: false,
                message: 'Error processing attendance: ' + (error.response?.data?.message || error.message)
            });
        } finally {
            // Always reset processing flag
            setIsProcessing(false);
        }
    };

    const startScanning = (type) => {
        setActionType(type);
        setScanResult('');
        setIsScanning(true);
        setCameraActive(true);
        setAttendanceStatus(null);
        setIsProcessing(false); // Reset processing flag when starting new scan
    };

    const cancelScanning = () => {
        stopCamera();
        setScanResult('');
        setAttendanceStatus(null);
        setIsProcessing(false);
    };

    const resetScanner = () => {
        cancelScanning();
        setActionType(''); // Reset action type
    };

    return (
        <div className="min-h-screen bg-[#F7FBF8] py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-bold text-[#16212A] mb-2">Library Attendance</h1>
                    <p className="text-[#0F4C5C]">Scan QR code to check in/out of the library</p>
                </motion.div>

                {/* Action Selection */}
                <div className="flex gap-4 mb-6 justify-center">
                    <button
                        onClick={() => startScanning('checkin')}
                        disabled={isScanning || isProcessing}
                        className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${actionType === 'checkin'
                            ? 'bg-[#2EA86A] text-white'
                            : 'bg-gray-200 text-gray-700'
                            } ${(isScanning || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <FiLogIn className="mr-2" />
                        Check In
                    </button>
                    <button
                        onClick={() => startScanning('checkout')}
                        disabled={isScanning || isProcessing}
                        className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${actionType === 'checkout'
                            ? 'bg-[#E04F5F] text-white'
                            : 'bg-gray-200 text-gray-700'
                            } ${(isScanning || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <FiLogOut className="mr-2" />
                        Check Out
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Scanner Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-[#16212A]">
                                {actionType === 'checkin' ? 'Check In' : actionType === 'checkout' ? 'Check Out' : 'Select Action'}
                            </h2>
                            <div className="flex items-center gap-2">
                                {cameraActive && (
                                    <div className="flex items-center gap-1 text-green-600">
                                        <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                                        <span className="text-xs">Camera Active</span>
                                    </div>
                                )}
                                {isProcessing && (
                                    <div className="flex items-center gap-1 text-blue-600">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                                        <span className="text-xs">Processing...</span>
                                    </div>
                                )}
                                <FiCamera className={`text-2xl ${cameraActive ? 'text-[#84C18B]' : 'text-gray-400'}`} />
                            </div>
                        </div>

                        {isScanning && cameraActive ? (
                            <div className="relative">
                                <div className="relative rounded-lg overflow-hidden">
                                    <QrReader
                                        ref={qrReaderRef}
                                        constraints={{ facingMode: 'environment' }}
                                        onResult={handleScan}
                                        className="w-full"
                                        scanDelay={500} // Add delay between scans
                                    />
                                    <div className="absolute inset-0 border-2 border-[#84C18B] rounded-lg m-4 pointer-events-none"></div>
                                </div>
                                <div className="text-center mt-4">
                                    <p className="text-sm text-gray-600 mb-2">Scan library QR code</p>
                                    <button
                                        onClick={cancelScanning}
                                        disabled={isProcessing}
                                        className="flex items-center justify-center gap-2 mx-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FiX className="text-lg" />
                                        Cancel Scan
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className={`text-6xl mx-auto mb-4 ${attendanceStatus?.success ? 'text-[#2EA86A]' : attendanceStatus ? 'text-[#E04F5F]' : 'text-gray-400'}`}>
                                    {attendanceStatus?.success ? <FiCheckCircle /> : attendanceStatus ? '⚠️' : <FiCamera />}
                                </div>
                                <p className="text-[#16212A] font-medium mb-4">
                                    {attendanceStatus ? attendanceStatus.message : actionType ? 'Ready to scan' : 'Please select check in or check out'}
                                </p>
                                {isProcessing && (
                                    <div className="mt-4">
                                        <p className="text-blue-600 font-medium">Processing your request...</p>
                                    </div>
                                )}
                                {attendanceStatus && (
                                    <div className="mt-4">
                                        <button
                                            onClick={resetScanner}
                                            className="px-6 py-2 bg-[#84C18B] text-white rounded-lg font-medium hover:bg-[#76b082] transition-colors"
                                        >
                                            Scan Again
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex gap-2 mt-4">
                            {!isScanning && !attendanceStatus && actionType && (
                                <button
                                    onClick={() => startScanning(actionType)}
                                    disabled={isProcessing}
                                    className="flex-1 bg-[#84C18B] text-white py-3 rounded-lg font-medium hover:bg-[#76b082] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? 'Processing...' : 'Start Scanning'}
                                </button>
                            )}
                        </div>
                    </motion.div>

                    {/* Info Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        {/* User Info */}
                        {userData && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="font-semibold text-[#16212A] mb-2">Student Information</h3>
                                <div className="bg-[#F7FBF8] p-4 rounded-lg">
                                    <p className="font-medium">{userData.name}</p>
                                    <p className="text-sm text-gray-600">{userData.studentId}</p>
                                    <p className="text-sm text-gray-600">{userData.email}</p>
                                </div>
                            </div>
                        )}

                        {/* Location Status */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center mb-3">
                                <FiMapPin className="text-[#84C18B] mr-2" />
                                <h3 className="font-semibold text-[#16212A]">Location Status</h3>
                            </div>
                            <p className={isWithinLibrary() ? 'text-[#2EA86A]' : 'text-[#E04F5F]'}>
                                {isWithinLibrary()
                                    ? 'Within library premises ✓'
                                    : 'Outside library area. Please go to library.'}
                            </p>
                            {userLocation && (
                                <p className="text-xs text-gray-500 mt-1">
                                    Your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                                </p>
                            )}
                        </div>

                        {/* Current Status */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center mb-3">
                                <FiClock className="text-[#84C18B] mr-2" />
                                <h3 className="font-semibold text-[#16212A]">Current Status</h3>
                            </div>
                            <div className="bg-[#F7FBF8] p-4 rounded-lg">
                                <p className="font-medium">
                                    {attendanceStatus?.currentStatus || 'Not checked in'}
                                </p>
                                {attendanceStatus?.timeRemaining && (
                                    <p className="text-sm text-gray-600">
                                        Time remaining: {Math.floor(attendanceStatus.timeRemaining / 60000)} minutes
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                            <h3 className="font-semibold text-[#0F4C5C] mb-2">Instructions</h3>
                            <ul className="text-sm text-[#16212A] space-y-1">
                                <li>• Ensure you're within library premises</li>
                                <li>• Check in when entering the library</li>
                                <li>• Check out when leaving the library</li>
                                <li>• Hold steady for 2-3 seconds while scanning</li>
                                <li>• Location services must be enabled</li>
                                <li>• Camera will automatically turn off after scanning</li>
                                <li>• Use cancel button to stop scanning anytime</li>
                                <li>• Each scan will process only once</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default QRCheckIn;