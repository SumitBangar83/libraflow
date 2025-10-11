// pages/QRCheckIn.js
import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Html5Qrcode } from 'html5-qrcode';
import { FiCamera, FiCheckCircle, FiClock, FiMapPin, FiLogIn, FiLogOut, FiX, FiRefreshCw, FiVideo } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { attendanceinfo } from '../features/attendance';

const url = import.meta.env.VITE_API_URL;

const qrConfig = { fps: 10, qrbox: { width: 250, height: 250 } };
const qrReaderId = "qr-code-reader";

const QRCheckIn = () => {
    const [scanResult, setScanResult] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [attendanceStatus, setAttendanceStatus] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [actionType, setActionType] = useState('');
    const [userData, setUserData] = useState(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [availableCameras, setAvailableCameras] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState(null);

    const qrScannerRef = useRef(null);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const LIBRARY_LOCATION = {
        lat: 22.756996,
        lng: 75.869701,
        radius: 100
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => console.log('Location access denied:', error)
            );
        }

        const token = localStorage.getItem('token');
        if (token && user) {
            setUserData({
                id: user._id,
                name: user.name,
                studentId: 'STU2024001',
                email: user.email
            });
        }
    }, [user]);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371000;
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
        return calculateDistance(userLocation.lat, userLocation.lng, LIBRARY_LOCATION.lat, LIBRARY_LOCATION.lng) <= LIBRARY_LOCATION.radius;
    };

    useLayoutEffect(() => {
        if (isScanning && selectedCamera) {
            const scanner = new Html5Qrcode(qrReaderId);
            qrScannerRef.current = scanner;

            scanner.start(
                selectedCamera,
                qrConfig,
                (decodedText) => {
                    handleScan(decodedText);
                },
                (errorMessage) => { /* Ignore */ }
            ).then(() => {
                setCameraActive(true);
            }).catch((err) => {
                console.error("Unable to start scanning.", err);
                setAttendanceStatus({ success: false, message: 'Could not start the camera.' });
                setIsScanning(false);
                setCameraActive(false);
            });
        }

        return () => {
            if (qrScannerRef.current && qrScannerRef.current.isScanning) {
                qrScannerRef.current.stop().then(() => {
                    setCameraActive(false);
                }).catch(err => console.error("Failed to stop scanner.", err));
            }
        };
    }, [isScanning, selectedCamera]);

    const handleScan = useCallback((resultText) => {
        if (resultText && !isProcessing) {
            setIsScanning(false);
            setIsProcessing(true);
            setScanResult(resultText);
            processAttendance(resultText);
        }
    }, [isProcessing, userLocation, actionType]);

    const processAttendance = async (qrData) => {
        try {
            const qrInfo = JSON.parse(qrData);

            if (actionType === 'checkin') {
                if (!isWithinLibrary()) {
                    setAttendanceStatus({ success: false, message: 'You must be inside the library premises to check in.' });
                    setIsProcessing(false);
                    return;
                }
                const obj = { id: user._id, studentId: user.email, action: actionType, timestamp: new Date().toISOString(), location: userLocation, qrData: qrInfo, slot: 'afternoon' };
                const response = await axios.post(`${url}attendance/checkin`, obj, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` } });

                if (response.data.success) {
                    setAttendanceStatus({ success: true, currentStatus: 'checkedin', message: 'Check-in successful!' });
                    const result = await axios.get(`${url}attendance/live`);
                    if (result.data.success) {
                        dispatch(attendanceinfo(result.data.data));
                    }
                }
            } else if (actionType === 'checkout') {
                const obj = { id: user._id, studentId: user.email, action: actionType, timestamp: new Date().toISOString(), location: userLocation, qrData: qrInfo, slot: 'afternoon' };
                const response = await axios.post(`${url}attendance/checkout/${user._id}`, obj, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` } });

                if (response.data.success) {
                    setAttendanceStatus({ success: true, currentStatus: 'checkedout', message: 'Check-out successful!' });
                    const result = await axios.get(`${url}attendance/live`);
                    if (result.data.success) {
                        dispatch(attendanceinfo({ data: result.data.data, user: user }));
                    }
                }
            }
        } catch (error) {
            console.error("Error processing attendance:", error);
            setAttendanceStatus({ success: false, message: 'Error processing attendance: ' + (error.response?.data?.message || error.message) });
        } finally {
            setIsProcessing(false);
        }
    };

    const startScanning = async (type) => {
        setActionType(type);
        setScanResult('');
        setAttendanceStatus(null);
        setIsProcessing(false);

        try {
            const devices = await Html5Qrcode.getCameras();
            if (devices && devices.length) {
                setAvailableCameras(devices);
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                let preferredCamera = devices.find(device => device.label.toLowerCase().includes('back')) || devices[0];
                if (!isMobile) {
                    preferredCamera = devices.find(device => device.label.toLowerCase().includes('front')) || devices[0];
                }
                setSelectedCamera(preferredCamera.id);
                setIsScanning(true);
            } else {
                setAttendanceStatus({ success: false, message: 'No cameras found.' });
            }
        } catch (err) {
            console.error("Camera permission error:", err);
            setAttendanceStatus({ success: false, message: 'Camera permission is required.' });
        }
    };

    const cancelScanning = () => {
        setIsScanning(false);
        setScanResult('');
        setAttendanceStatus(null);
    };

    const resetScanner = () => {
        cancelScanning();
        setActionType('');
    };

    const switchCamera = () => {
        if (availableCameras.length > 1) {
            const currentIndex = availableCameras.findIndex(cam => cam.id === selectedCamera);
            const nextIndex = (currentIndex + 1) % availableCameras.length;
            setSelectedCamera(availableCameras[nextIndex].id);
        }
    };

    return (
        <div className="min-h-screen bg-[#F7FBF8] py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#16212A] mb-2">Library Attendance</h1>
                    <p className="text-[#0F4C5C] text-lg">Scan QR code to check in/out of the library</p>
                </motion.div>

                <div className="flex gap-4 mb-8 justify-center flex-wrap">
                    <button onClick={() => startScanning('checkin')} disabled={isScanning || isProcessing} className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${actionType === 'checkin' ? 'bg-[#2EA86A] text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} ${(isScanning || isProcessing) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}>
                        <FiLogIn className="mr-2 text-lg" /> Check In
                    </button>
                    <button onClick={() => startScanning('checkout')} disabled={isScanning || isProcessing} className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${actionType === 'checkout' ? 'bg-[#E04F5F] text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} ${(isScanning || isProcessing) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}>
                        <FiLogOut className="mr-2 text-lg" /> Check Out
                    </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-[#16212A] capitalize">{actionType ? `${actionType}` : 'Select Action'}</h2>
                            {isScanning && <div className="flex items-center gap-3">
                                {cameraActive && <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full"><div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div><span className="text-sm font-medium">Camera Active</span></div>}
                            </div>}
                        </div>

                        {/* === CHANGE IS HERE === */}
                        {isScanning && (
                            <div className="space-y-4">
                                <div className="relative bg-black rounded-2xl overflow-hidden aspect-square">
                                    <div id={qrReaderId} style={{ width: '100%', height: '100%' }} />
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-64 h-64 border-2 border-[#84C18B] rounded-xl relative">
                                            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-[#84C18B] rounded-tl"></div>
                                            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-[#84C18B] rounded-tr"></div>
                                            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-[#84C18B] rounded-bl"></div>
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-[#84C18B] rounded-br"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center gap-4">
                                    {availableCameras.length > 1 && (<button onClick={switchCamera} className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"><FiRefreshCw className="text-lg" /> Switch Camera</button>)}
                                    <button onClick={cancelScanning} disabled={isProcessing} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"><FiX className="text-lg" /> Cancel Scan</button>
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-600 mb-2">Point the camera at the QR code</p>
                                    <p className="text-sm text-gray-500">{availableCameras.length > 0 && `Using: ${availableCameras.find(cam => cam.id === selectedCamera)?.label || 'Default Camera'}`}</p>
                                </div>
                            </div>
                        )}

                        {!isScanning && (
                            <div className="text-center py-12">
                                <div className={`text-8xl mx-auto mb-6 ${attendanceStatus?.success ? 'text-[#2EA86A]' : attendanceStatus ? 'text-[#E04F5F]' : 'text-gray-400'}`}>
                                    {attendanceStatus?.success ? <FiCheckCircle /> : attendanceStatus ? '⚠️' : <FiCamera />}
                                </div>
                                <p className="text-xl font-semibold text-[#16212A] mb-4">{attendanceStatus ? attendanceStatus.message : actionType ? 'Ready to scan' : 'Please select Check In or Check Out'}</p>
                                {isProcessing && <div className="mt-4"><div className="flex items-center justify-center gap-2 text-blue-600"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div><p className="font-medium">Processing your request...</p></div></div>}
                                {attendanceStatus && !isProcessing && <div className="mt-6"><button onClick={resetScanner} className="px-8 py-3 bg-[#84C18B] text-white rounded-xl font-semibold hover:bg-[#76b082] transition-colors hover:scale-105 duration-200">Scan Again</button></div>}
                                {!attendanceStatus && actionType && !isProcessing && (
                                    <div className="mt-6">
                                        <button onClick={() => startScanning(actionType)} className="w-full bg-[#84C18B] text-white py-4 rounded-xl font-semibold hover:bg-[#76b082] transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 duration-200">
                                            <div className="flex items-center justify-center gap-2"><FiVideo className="text-lg" /> Start Camera Scanner</div>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        {userData && (
                            <div className="bg-white rounded-2xl shadow-xl p-6">
                                <h3 className="font-bold text-[#16212A] mb-4 text-lg">Student Information</h3>
                                <div className="bg-[#F7FBF8] p-5 rounded-xl border border-[#84C18B]/20">
                                    <p className="font-semibold text-lg mb-1">{userData.name}</p>
                                    <p className="text-gray-600 mb-1">{userData.studentId}</p>
                                    <p className="text-gray-600">{userData.email}</p>
                                </div>
                            </div>
                        )}
                        <div className="bg-white rounded-2xl shadow-xl p-6">
                            <div className="flex items-center mb-4"><FiMapPin className="text-[#84C18B] mr-3 text-xl" /><h3 className="font-bold text-[#16212A] text-lg">Location Status</h3></div>
                            <p className={`text-lg font-medium ${isWithinLibrary() ? 'text-[#2EA86A]' : 'text-[#E04F5F]'}`}>{userLocation ? (isWithinLibrary() ? '✓ Inside library premises' : '✗ Outside library area') : 'Fetching location...'}</p>
                            {userLocation && <p className="text-sm text-gray-500 mt-2">Your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</p>}
                        </div>
                        <div className="bg-white rounded-2xl shadow-xl p-6">
                            <div className="flex items-center mb-4"><FiClock className="text-[#84C18B] mr-3 text-xl" /><h3 className="font-bold text-[#16212A] text-lg">Current Status</h3></div>
                            <div className="bg-[#F7FBF8] p-5 rounded-xl border border-[#84C18B]/20"><p className="font-semibold text-lg capitalize">{attendanceStatus?.currentStatus || 'Not checked in'}</p></div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                            <h3 className="font-bold text-[#0F4C5C] mb-4 text-lg">Instructions</h3>
                            <ul className="text-[#16212A] space-y-3">
                                <li className="flex items-start gap-2"><span className="text-[#84C18B] font-bold">•</span><span>Ensure you're within library premises for check-in.</span></li>
                                <li className="flex items-start gap-2"><span className="text-[#84C18B] font-bold">•</span><span>Select 'Check In' when entering the library.</span></li>
                                <li className="flex items-start gap-2"><span className="text-[#84C18B] font-bold">•</span><span>Select 'Check Out' when leaving the library.</span></li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default QRCheckIn;