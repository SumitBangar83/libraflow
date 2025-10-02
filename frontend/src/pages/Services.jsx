// pages/Services.js - Services page with amenities, features, and testimonials
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiBook,
  FiUsers,
  FiClock,
  FiDollarSign,
  FiStar,
  FiCheck,
  FiPlay,
  FiArrowRight
} from 'react-icons/fi';

const Services = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const services = [
    {
      icon: FiBook,
      title: 'Digital Catalog Access',
      description: 'Browse our extensive collection of physical and digital resources',
      features: ['100,000+ titles', 'AI-powered search', 'Personalized recommendations', '24/7 access']
    },
    {
      icon: FiUsers,
      title: 'Study Room Booking',
      description: 'Reserve private study spaces with smart time management',
      features: ['QR check-in system', 'Flexible time slots', 'Group collaboration spaces', 'Resource integration']
    },
    {
      icon: FiClock,
      title: 'AI Study Assistants',
      description: 'Get personalized learning paths and content summaries',
      features: ['Book summaries', 'Study guides', 'Progress tracking', 'Exam preparation']
    },
    {
      icon: FiDollarSign,
      title: 'Membership Plans',
      description: 'Flexible pricing options for individuals and institutions',
      features: ['Student discounts', 'Institutional plans', 'Family packages', 'Premium features']
    }
  ];

  const amenities = [
    {
      title: 'Quiet Study Zones',
      description: 'Designated areas for focused individual study',
      icon: '🤫'
    },
    {
      title: 'Collaborative Spaces',
      description: 'Modern areas for group projects and discussions',
      icon: '👥'
    },
    {
      title: 'Digital Labs',
      description: 'Access to computers, scanners, and specialized software',
      icon: '💻'
    },
    {
      title: 'Children\'s Corner',
      description: 'Engaging space for young readers and educational activities',
      icon: '🧒'
    },
    {
      title: 'Cafe Lounge',
      description: 'Comfortable seating area with refreshments available',
      icon: '☕'
    },
    {
      title: 'Accessibility Features',
      description: 'Full ADA compliance with assistive technologies',
      icon: '♿'
    }
  ];

  const testimonials = [
    {
      quote: "The AI study guides helped me improve my grades significantly. The personalized approach is amazing!",
      author: "Jessica Miller",
      role: "Medical Student",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "Our university's library efficiency increased by 40% after implementing LibraFlow's system.",
      author: "Dr. James Wilson",
      role: "University Director",
      rating: 5,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "The QR attendance system eliminated all our manual tracking headaches. Game changer!",
      author: "Maria Gonzalez",
      role: "School Principal",
      rating: 5,
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const pricingPlans = [
    {
      name: 'Basic',
      price: 'Free',
      period: 'forever',
      features: [
        'Access to physical books',
        'Basic digital resources',
        '2 study room bookings/month',
        'Community events access'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Student',
      price: '$9.99',
      period: 'per month',
      features: [
        'All Basic features',
        'Unlimited digital resources',
        '10 study room bookings/month',
        'AI study guides',
        'Priority support'
      ],
      cta: 'Choose Plan',
      popular: true
    },
    {
      name: 'Institutional',
      price: 'Custom',
      period: 'tailored pricing',
      features: [
        'All Student features',
        'Unlimited users',
        'Advanced analytics',
        'Custom AI training',
        'Dedicated account manager',
        'API access'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const features = [
    {
      title: "Smart Attendance System",
      description: "QR-based check-in with intelligent time slot management",
      image: "https://images.unsplash.com/photo-1551650976-3de3d181345a?w=500&h=300&fit=crop"
    },
    {
      title: "AI Content Generation",
      description: "Automated summaries and study materials powered by advanced AI",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop"
    },
    {
      title: "Advanced Analytics",
      description: "Comprehensive reporting and usage insights for administrators",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7FBF8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F4C5C] to-[#16212A] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl mb-8 opacity-90">
              Comprehensive library solutions designed for modern educational needs.
              From traditional book lending to AI-powered study aids.
            </p>
            <button className="bg-[#84C18B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6da774] transition-colors flex items-center">
              Explore Features <FiArrowRight className="ml-2" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#16212A] mb-4">Comprehensive Library Solutions</h2>
            <p className="text-lg text-[#0F4C5C] max-w-2xl mx-auto">
              We offer a complete suite of services to meet the evolving needs of
              students, educators, and institutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#F7FBF8] p-6 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-[#84C18B] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#16212A] mb-3">{service.title}</h3>
                  <p className="text-[#0F4C5C] mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-[#0F4C5C]">
                        <FiCheck className="text-[#84C18B] mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-16 bg-[#F7FBF8]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#16212A] mb-4">Key Features</h2>
            <p className="text-lg text-[#0F4C5C] max-w-2xl mx-auto">
              Discover the powerful tools that make LibraFlow the leading library management solution.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-xl cursor-pointer transition-all ${activeFeature === index
                    ? 'bg-white shadow-lg border-l-4 border-[#84C18B]'
                    : 'bg-transparent hover:bg-white hover:shadow-md'
                    }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-center mb-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${activeFeature === index ? 'bg-[#84C18B]' : 'bg-gray-200'
                      }`}>
                      <FiPlay className={`${activeFeature === index ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-[#16212A]">{feature.title}</h3>
                  </div>
                  <p className="text-[#0F4C5C]">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#84C18B] to-[#0F4C5C] h-80 rounded-2xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-2xl font-bold mb-2">{features[activeFeature].title}</h3>
                  <p>{features[activeFeature].description}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#16212A] mb-4">Library Amenities</h2>
            <p className="text-lg text-[#0F4C5C] max-w-2xl mx-auto">
              Our physical spaces are designed to support every type of learning and research need.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#F7FBF8] p-6 rounded-xl text-center hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{amenity.icon}</div>
                <h3 className="text-xl font-semibold text-[#16212A] mb-3">{amenity.title}</h3>
                <p className="text-[#0F4C5C]">{amenity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gradient-to-br from-[#84C18B] to-[#0F4C5C]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-white opacity-90 max-w-2xl mx-auto">
              Choose the plan that works best for your needs. All plans include core features with no hidden fees.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative rounded-xl overflow-hidden ${plan.popular ? 'scale-105' : 'scale-100'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FFD700] text-[#16212A] px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className={`p-8 ${plan.popular ? 'bg-white' : 'bg-white bg-opacity-95'
                  }`}>
                  <h3 className="text-2xl font-bold text-[#16212A] mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-[#16212A]">{plan.price}</span>
                    <span className="text-[#0F4C5C]">/{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-[#0F4C5C]">
                        <FiCheck className="text-[#84C18B] mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${plan.popular
                    ? 'bg-[#84C18B] text-white hover:bg-[#6da774]'
                    : 'bg-gray-100 text-[#16212A] hover:bg-gray-200'
                    }`}>
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#16212A] mb-4">Success Stories</h2>
            <p className="text-lg text-[#0F4C5C] max-w-2xl mx-auto">
              See how institutions and individuals are transforming their library experience with LibraFlow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#F7FBF8] p-6 rounded-xl"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-[#16212A]">{testimonial.author}</h4>
                    <p className="text-sm text-[#0F4C5C]">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-[#0F4C5C] mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex text-[#FFD700]">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#16212A] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Library Experience?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join hundreds of institutions already using LibraFlow to modernize their library services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#84C18B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#6da774] transition-colors">
                Start Free Trial
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-all">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;