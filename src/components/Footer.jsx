import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const serviceLinks = [
    { name: 'Renovation', path: '/services#renovation' },
    { name: 'Building Plan & Design', path: '/services#building-plan-design' },
    { name: 'Building Approval Plans', path: '/services#building-approval-plans' },
    { name: 'Elevation Design', path: '/services#elevation-design' },
    { name: 'FMB Marking', path: '/services#fmb-marking' },
    { name: 'Construction Survey', path: '/services#construction-survey' },
    { name: 'Layout Marking', path: '/services#layout-marking' },
    { name: 'Construction Execution', path: '/services#construction-execution' },
  ];

  return (
    <footer className="bg-[#0F1B2D] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Brand & Description (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Logo variant="light" />
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Professional planning, design, construction consulting, and land surveying services in Thanjavur. Delivering structural clarity from initial concept to on-site execution.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#17243B] text-[#2196E1] border border-slate-700/60">
                <Compass className="w-3.5 h-3.5" /> Licensed Land Surveying
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#17243B] text-slate-300 border border-slate-700/60">
                <ShieldCheck className="w-3.5 h-3.5" /> DTCP Approvals
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-[#2196E1] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#2196E1] transition-colors" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Our Services
            </h4>
            <ul className="grid grid-cols-1 gap-2 text-sm">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-slate-400 hover:text-[#2196E1] transition-colors text-xs flex items-center gap-1.5 py-0.5"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
                    <span className="truncate">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact Us
            </h4>

            <div className="space-y-3.5 text-xs text-slate-400">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#2196E1] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Direct Line</div>
                  <a
                    href="tel:+919787839067"
                    className="text-white hover:text-[#2196E1] font-medium transition-colors"
                  >
                    +91 97878 39067
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#2196E1] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Enquiry Email</div>
                  <a
                    href="mailto:contact@nkconstructions.com"
                    className="text-white hover:text-[#2196E1] transition-colors"
                  >
                    contact@nkconstructions.com
                  </a>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#2196E1] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Office Address</div>
                  <p className="text-slate-300 leading-relaxed">
                    Plot No. 41, "Sakthi Illam",<br />
                    4th Cross, Maris Nagar,<br />
                    M.C. Road, Thanjavur – 613 004,<br />
                    Tamil Nadu, India.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Verification Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} NK Constructions. All rights reserved. Thanjavur, Tamil Nadu.</p>
          <div className="flex items-center gap-6">
            <span>Civil Engineering</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span>Building Design</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span>Land Surveying</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
