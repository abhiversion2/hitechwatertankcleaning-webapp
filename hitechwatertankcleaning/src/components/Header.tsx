'use client';

import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Timer ref to delay closing
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const services = [
    'Household Water Tank Cleaning',
    'Underground Water Tank Cleaning',
    'Overhead Water Tank Cleaning',
    'Loft Water Tank Cleaning',
    'Residential Society Water Tank Cleaning',
    'Industrial Water Tank Cleaning',
  ];

  useEffect(() => {
    const sections = ['home', 'services', 'about', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let current = 'home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleServicesClick = () => {
    scrollToSection('services');
  };

  const isActive = (section: string) => activeSection === section;

  // Open dropdown
  const openDropdown = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  // Close dropdown with delay
  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150); // 150ms delay — enough time to move cursor to dropdown
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => scrollToSection('home')}
            className="text-2xl font-bold text-blue-700 hover:text-blue-800 transition"
          >
            Hi-Tech Water Tank Cleaning
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className={`font-medium transition ${
                isActive('home') ? 'text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-700'
              }`}
            >
              Home
            </button>

            {/* Services Dropdown - Fixed Hover Behavior */}
            <div
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <button
                onClick={handleServicesClick}
                className={`font-medium flex items-center transition ${
                  isActive('services') ? 'text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-700'
                }`}
              >
                Services
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-xl py-2 z-20 border border-gray-100"
                  onMouseEnter={openDropdown}   // Keep open when hovering dropdown
                  onMouseLeave={closeDropdown}  // Close only when fully leaving
                >
                  {services.map((service) => (
                    <button
                      key={service}
                      onClick={() => {
                        scrollToSection('services');
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
                    >
                      {service}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection('about')}
              className={`font-medium transition ${
                isActive('about') ? 'text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-700'
              }`}
            >
              About
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className={`font-medium transition ${
                isActive('contact') ? 'text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-700'
              }`}
            >
              Contact
            </button>

            <a
              href="tel:+919323999502"
              className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 font-medium transition shadow-md"
            >
              Contact Now
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-4 space-y-1">
              <button
                onClick={() => scrollToSection('home')}
                className={`block w-full text-left px-3 py-2 rounded-md transition ${
                  isActive('home')
                    ? 'bg-blue-100 text-blue-700 font-bold'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                Home
              </button>

              {/* Mobile Services - Word clicks to scroll, Arrow toggles dropdown */}
              <div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleServicesClick} // Tap "Services" text → scroll to section
                    className={`flex-1 text-left px-3 py-2 rounded-md transition ${
                      isActive('services')
                        ? 'bg-blue-100 text-blue-700 font-bold'
                        : 'text-gray-700 hover:bg-blue-50'
                    }`}
                  >
                    Services
                  </button>

                  {/* Arrow button - ONLY toggles dropdown */}
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md transition"
                    aria-label="Toggle services menu"
                  >
                    <svg
                      className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Dropdown List */}
                {isDropdownOpen && (
                  <div className="pl-6 space-y-1 mt-1 bg-gray-50 rounded-md">
                    {services.map((service) => (
                      <button
                        key={service}
                        onClick={() => {
                          scrollToSection('services');
                          setIsMobileMenuOpen(false); // Close entire mobile menu
                        }}
                        className="block w-full text-left px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md transition"
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => scrollToSection('about')}
                className={`block w-full text-left px-3 py-2 rounded-md transition ${
                  isActive('about')
                    ? 'bg-blue-100 text-blue-700 font-bold'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                About
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className={`block w-full text-left px-3 py-2 rounded-md transition ${
                  isActive('contact')
                    ? 'bg-blue-100 text-blue-700 font-bold'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                Contact
              </button>

              <a
                href="tel:+919876543210"
                className="block w-full px-3 py-3 bg-blue-700 text-white rounded-md mx-3 text-center font-medium hover:bg-blue-800 transition"
              >
                Contact Now
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}