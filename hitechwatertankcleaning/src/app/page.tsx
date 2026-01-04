'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm'; // Add this import

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.section-fade').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Home */}
        <section id="home" className="bg-blue-700 text-white py-24 text-center section-fade">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Professional Hi-Tech Water Tank Cleaning Services
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto">
              Safe, Efficient, and Eco-Friendly Cleaning for All Types of Water Tanks
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-700 px-8 py-4 rounded-md text-lg font-semibold hover:bg-gray-100 transition"
            >
              Get a Free Quote Now
            </button>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-gray-100 section-fade">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                'Household Water Tank Cleaning',
                'Underground Water Tank Cleaning',
                'Overhead Water Tank Cleaning',
                'Loft Water Tank Cleaning',
                'Residential Society Water Tank Cleaning',
                'Industrial Water Tank Cleaning',
              ].map((service) => (
                <div
                  key={service}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
                >
                  <div className="bg-blue-100 w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service}</h3>
                  <p className="text-gray-700">
                    Professional cleaning using advanced hi-tech equipment and safe methods.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white section-fade">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-10">About Us</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-800 leading-relaxed mb-6">
                Hi-Tech Water Tank Cleaning Services uses cutting-edge technology and eco-friendly methods to provide thorough,
                safe, and reliable water tank cleaning across residential, society, and industrial sectors.
              </p>
              <p className="text-lg text-gray-700">
                Our trained professionals ensure your water storage is free from contaminants, bacteria, and sediment —
                delivering clean and healthy water you can trust.
              </p>
              <p className="mt-8 text-lg font-medium text-blue-700">
                Trusted by hundreds of customers for quality, punctuality, and transparent pricing.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <ContactForm />
      </main>

      <Footer />

      {/* Floating WhatsApp Button - Standard Style with Pulse + Visible Tooltip */}
      <div className="fixed bottom-8 right-24 z-50 group">
        {/* Tooltip - Now visible on hover */}
        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
          Chat with us on WhatsApp
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
        </div>

        {/* Button with Pulse */}
        <a
          href="https://wa.me/919323999502?text=Hello!%20I%20need%20water%20tank%20cleaning%20service.%20Please%20share%20details%20and%20pricing."
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300"
          aria-label="Chat on WhatsApp"
        >
          {/* Pulse Rings */}
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-50 animation-delay-1000"></span>

          {/* Standard WhatsApp Chat Icon (phone in bubble) */}
          {/* Your Custom WhatsApp SVG Icon */}
          <img
            src="../assets/whatsapp.png"
            alt="WhatsApp"
            className="w-10 h-10 relative z-10"
          />
        </a>
      </div>

      {/* Scroll to Top Button (unchanged) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-700 text-white p-4 rounded-full shadow-2xl hover:bg-blue-800 hover:scale-110 transition z-50"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

    </div>
  );
}