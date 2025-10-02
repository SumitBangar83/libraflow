// pages/Payments.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCreditCard, FiDollarSign, FiCalendar, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const Payments = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Mock data
  const paymentHistory = [
    { id: 1, date: '2024-01-15', description: 'Monthly Membership', amount: 25.00, status: 'completed' },
    { id: 2, date: '2024-01-10', description: 'Late Fee - Book Return', amount: 5.00, status: 'completed' },
    { id: 3, date: '2024-01-05', description: 'Printing Services', amount: 3.50, status: 'pending' },
  ];

  const pendingPayments = [
    { id: 1, description: 'Printing Services', amount: 3.50, dueDate: '2024-01-20' },
  ];

  const membershipPlans = [
    { name: 'Basic', price: 25, features: ['5 Books/month', 'Standard Access', 'Basic Support'] },
    { name: 'Premium', price: 50, features: ['15 Books/month', '24/7 Access', 'Priority Support', 'AI Resources'] },
    { name: 'Student', price: 15, features: ['10 Books/month', 'Extended Hours', 'Study Rooms Access'] },
  ];

  const handlePayment = (amount, description) => {
    // Implement payment processing
    alert(`Processing payment of $${amount} for ${description}`);
  };

  return (
    <div className="min-h-screen bg-[#F7FBF8] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#16212A] mb-2">Payments & Membership</h1>
          <p className="text-[#0F4C5C]">Manage your payments, memberships, and view transaction history</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg">
              <div className="flex border-b">
                {['overview', 'history', 'membership'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-4 font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? 'text-[#84C18B] border-b-2 border-[#84C18B]'
                        : 'text-gray-600 hover:text-[#84C18B]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* Pending Payments */}
                    <div>
                      <h3 className="text-xl font-semibold text-[#16212A] mb-4">Pending Payments</h3>
                      {pendingPayments.map((payment) => (
                        <div key={payment.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-[#16212A]">{payment.description}</p>
                              <p className="text-sm text-gray-600">Due: {payment.dueDate}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-[#E04F5F]">${payment.amount}</p>
                              <button
                                onClick={() => handlePayment(payment.amount, payment.description)}
                                className="bg-[#84C18B] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#76b082]"
                              >
                                Pay Now
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Pay */}
                    <div className="bg-[#F7FBF8] rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-[#16212A] mb-4">Quick Payment</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                          <div className="relative">
                            <FiDollarSign className="absolute left-3 top-3 text-gray-400" />
                            <input
                              type="number"
                              placeholder="0.00"
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C18B] focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <input
                            type="text"
                            placeholder="Payment description"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C18B] focus:border-transparent"
                          />
                        </div>
                        <button className="w-full bg-[#84C18B] text-white py-3 rounded-lg font-medium hover:bg-[#76b082] transition-colors">
                          Process Payment
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h3 className="text-xl font-semibold text-[#16212A] mb-4">Payment History</h3>
                    <div className="space-y-3">
                      {paymentHistory.map((payment) => (
                        <div key={payment.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                          <div>
                            <p className="font-medium text-[#16212A]">{payment.description}</p>
                            <p className="text-sm text-gray-600">{payment.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-[#16212A]">${payment.amount}</p>
                            <span className={`inline-flex items-center text-sm ${
                              payment.status === 'completed' ? 'text-[#2EA86A]' : 'text-yellow-600'
                            }`}>
                              {payment.status === 'completed' ? <FiCheckCircle className="mr-1" /> : <FiAlertCircle className="mr-1" />}
                              {payment.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Membership Tab */}
                {activeTab === 'membership' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h3 className="text-xl font-semibold text-[#16212A] mb-4">Membership Plans</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {membershipPlans.map((plan, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6 text-center">
                          <h4 className="text-lg font-bold text-[#16212A] mb-2">{plan.name}</h4>
                          <p className="text-3xl font-bold text-[#84C18B] mb-4">${plan.price}<span className="text-sm font-normal text-gray-600">/month</span></p>
                          <ul className="space-y-2 mb-6">
                            {plan.features.map((feature, idx) => (
                              <li key={idx} className="text-gray-600">{feature}</li>
                            ))}
                          </ul>
                          <button className="w-full bg-[#0F4C5C] text-white py-2 rounded-lg font-medium hover:bg-[#0d4150] transition-colors">
                            Select Plan
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Methods */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-[#16212A] mb-4">Payment Methods</h3>
              <div className="space-y-3">
                {['card', 'paypal', 'bank'].map((method) => (
                  <label key={method} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="capitalize">{method}</span>
                  </label>
                ))}
              </div>
              <button className="w-full mt-4 border-2 border-dashed border-gray-300 text-gray-600 py-3 rounded-lg font-medium hover:border-[#84C18B] hover:text-[#84C18B] transition-colors">
                Add New Method
              </button>
            </div>

            {/* Account Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-[#16212A] mb-4">Account Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Balance:</span>
                  <span className="font-semibold text-[#2EA86A]">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending Payments:</span>
                  <span className="font-semibold text-[#E04F5F]">$3.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Membership Status:</span>
                  <span className="font-semibold text-[#84C18B]">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;