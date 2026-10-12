import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const phoneNumber = '+91 97878 39067';
  const phoneHref = 'tel:+919787839067';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#D9E5F0] transition-shadow duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Logo variant="dark" />
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative py-2 text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'text-[#2196E1] font-semibold'
                      : 'text-[#17243B] hover:text-[#2196E1]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2196E1] rounded-full animate-in fade-in duration-200" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right: Phone & Consultation CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href={phoneHref}
              className="flex items-center gap-2.5 text-sm font-semibold text-[#17243B] hover:text-[#2196E1] transition-colors group"
              title="Call NK Constructions"
            >
              <div className="w-8 h-8 rounded-full bg-[#F1F8FD] flex items-center justify-center text-[#2196E1] group-hover:bg-[#2196E1] group-hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <span className="tracking-tight">{phoneNumber}</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#2196E1] hover:bg-[#1881c2] shadow-sm hover:shadow transition-all duration-200 active:scale-95"
            >
              Get a Free Consultation
            </Link>
          </div>

          {/* Mobile: Hamburger Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#17243B] hover:text-[#2196E1] hover:bg-[#F1F8FD] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2196E1]"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-white/95 backdrop-blur-xl border-b border-[#D9E5F0] z-40 overflow-y-auto animate-in slide-in-from-top-4 duration-200">
          <div className="px-6 py-6 space-y-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#F1F8FD] text-[#2196E1] font-semibold'
                        : 'text-[#17243B] hover:bg-slate-50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      {isActive ? (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2196E1]" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="pt-4 border-t border-[#D9E5F0] space-y-4">
              <a
                href={phoneHref}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#F1F8FD] text-[#17243B] hover:text-[#2196E1] transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-[#2196E1] text-white flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Have questions? Call directly</div>
                  <div className="text-sm font-bold">{phoneNumber}</div>
                </div>
              </a>

              <Link
                to="/contact"
                className="w-full flex items-center justify-center px-5 py-3 rounded-lg text-sm font-semibold text-white bg-[#2196E1] hover:bg-[#1881c2] shadow-sm transition-all text-center"
              >
                Get a Free Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
