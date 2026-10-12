import React from 'react';

export default function PageHero({
  label,
  heading,
  subtitle,
  backgroundImage = '/images/blueprint-background.jpg'
}) {
  return (
    <section className="relative bg-[#17243B] text-white overflow-hidden py-16 md:py-20 lg:py-24 border-b border-slate-800">
      {/* Background Blueprint Image with Dark Navy Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Technical architectural blueprint background"
          className="w-full h-full object-cover object-center opacity-25 filter brightness-75 contrast-125"
        />
        {/* Navy gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1B2D]/95 via-[#17243B]/90 to-[#17243B]/80" />
        <div className="absolute inset-0 bg-pattern-grid opacity-10" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {label && (
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[2px] bg-[#2196E1]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#2196E1]">
                {label}
              </span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {heading}
          </h1>

          {subtitle && (
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
