import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, Calendar } from 'lucide-react';

export default function CTASection({
  heading = 'Planning to Build Your Dream Home?',
  description = 'Talk to our team about building plans, approvals, surveying, renovation, and construction services.',
  className = ''
}) {
  const phoneNumber = '+91 97878 39067';
  const phoneHref = 'tel:+919787839067';

  return (
    <section className={`relative bg-[#0F1B2D] text-white overflow-hidden py-16 md:py-20 lg:py-24 border-t border-b border-slate-800 ${className}`}>
      {/* Background Construction Plan Blueprint with Dark Navy Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/blueprint-background.jpg"
          alt="Technical architectural blueprint construction plan"
          className="w-full h-full object-cover object-center opacity-20 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1B2D] via-[#17243B]/95 to-[#0F1B2D]" />
        <div className="absolute inset-0 bg-pattern-grid opacity-10" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#2196E1] text-xs font-bold tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-[#2196E1] animate-pulse" />
          <span>START WITH CONFIDENCE</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          {heading}
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
          {/* Call Now Button with tel: */}
          <a
            href={phoneHref}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg text-sm font-bold text-white bg-[#2196E1] hover:bg-[#1881c2] shadow-lg shadow-[#2196E1]/20 transition-all duration-200 active:scale-95 group"
          >
            <Phone className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span>Call Now: {phoneNumber}</span>
          </a>

          {/* Request Consultation */}
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200 active:scale-95 group"
          >
            <Calendar className="w-4 h-4 text-[#2196E1]" />
            <span>Request a Consultation</span>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
