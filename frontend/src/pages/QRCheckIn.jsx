// pages/QRCheckIn.js
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { QrReader } from 'react-qr-reader'
import { FiCamera, FiCheckCircle, FiClock, FiMapPin, FiLogIn, FiLogOut } from 'react-icons/fi';

const QRCheckIn = () => {
    const [scanResult, setScanResult] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [attendanceStatus, setAttendanceStatus] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [currentTimeSlot, setCurrentTimeSlot] = useState(null);
    const [actionType, setActionType] = useState('checkin'); // 'checkin' or 'checkout'
    const [userData, setUserData] = useState(null);
    const [libraryLocation, setLibraryLocation] = useState({
        lat: 28.6129, // Example library coordinates
        lng: 77.2295
    });

    // Library location settings (would come from admin panel)
    const LIBRARY_LOCATION = {
        lat: 28.6129,
        lng: 77.2295,
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
                id: '123',
                name: 'John Doe',
                studentId: 'STU2024001',
                email: 'john@student.com'
            });
        }
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

    const handleScan = (result) => {
        if (result && !scanResult) {
            setScanResult(result.text);
            setIsScanning(false);
            processAttendance(result.text);
        }
    };

    const processAttendance = async (qrData) => {
        try {
            // Verify QR data contains library information
            const qrInfo = JSON.parse(qrData);
            console.log(qrInfo)

            if (qrInfo.type !== 'library_qr') {
                throw new Error('Invalid QR code');
            }

            // Check location
            if (!isWithinLibrary()) {
                setAttendanceStatus({
                    success: false,
                    message: 'You must be within library premises to check in/out'
                });
                return;
            }

            // Send attendance data to backend
            const response = await fetch('/api/attendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    studentId: userData.studentId,
                    action: actionType,
                    timestamp: new Date().toISOString(),
                    location: userLocation,
                    qrData: qrInfo
                })
            });

            const result = await response.json();

            setAttendanceStatus(result);

            // If check-in successful, set timeout for notification
            if (result.success && actionType === 'checkin') {
                setTimeout(() => {
                    // Send notification (this would be handled by backend)
                    console.log('Time slot ending soon notification');
                }, result.timeRemaining);
            }

        } catch (error) {
            setAttendanceStatus({
                success: false,
                message: 'Error processing attendance: ' + error.message
            });
        }
    };

    const startScanning = (type) => {
        setActionType(type);
        setScanResult('');
        setIsScanning(true);
        setAttendanceStatus(null);
    };

    const resetScanner = () => {
        setIsScanning(false);
        setScanResult('');
        setAttendanceStatus(null);
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
                        className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${actionType === 'checkin'
                            ? 'bg-[#2EA86A] text-white'
                            : 'bg-gray-200 text-gray-700'
                            }`}
                    >
                        <FiLogIn className="mr-2" />
                        Check In
                    </button>
                    <button
                        onClick={() => startScanning('checkout')}
                        className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${actionType === 'checkout'
                            ? 'bg-[#E04F5F] text-white'
                            : 'bg-gray-200 text-gray-700'
                            }`}
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
                                {actionType === 'checkin' ? 'Check In' : 'Check Out'}
                            </h2>
                            <FiCamera className="text-[#84C18B] text-2xl" />
                        </div>

                        {isScanning ? (
                            <div className="relative">
                                <QrReader
                                    constraints={{ facingMode: 'environment' }}
                                    onResult={handleScan}
                                    className="rounded-lg overflow-hidden"
                                />
                                <div className="absolute inset-0 border-2 border-[#84C18B] rounded-lg m-4 pointer-events-none"></div>
                                <div className="text-center mt-2">
                                    <p className="text-sm text-gray-600">Scan library QR code</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className={`text-6xl mx-auto mb-4 ${attendanceStatus?.success ? 'text-[#2EA86A]' : 'text-[#E04F5F]'
                                    }`}>
                                    {attendanceStatus?.success ? <FiCheckCircle /> : '⚠️'}
                                </div>
                                <p className="text-[#16212A] font-medium">
                                    {attendanceStatus ? attendanceStatus.message : 'Ready to scan'}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-2 mt-4">
                            {!isScanning && !attendanceStatus && (
                                <button
                                    onClick={() => startScanning(actionType)}
                                    className="flex-1 bg-[#84C18B] text-white py-3 rounded-lg font-medium hover:bg-[#76b082] transition-colors"
                                >
                                    Start Scanning
                                </button>
                            )}
                            {(isScanning || attendanceStatus) && (
                                <button
                                    onClick={resetScanner}
                                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                                >
                                    {attendanceStatus ? 'Scan Again' : 'Cancel'}
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
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default QRCheckIn;