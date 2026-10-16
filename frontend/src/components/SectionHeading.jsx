import React from 'react';

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  className = '',
  light = false
}) {
  const isCentered = align === 'center';

  return (
    <div className={`space-y-3 ${isCentered ? 'text-center mx-auto' : 'text-left'} max-w-3xl ${className}`}>
      {label && (
        <div className={`inline-flex items-center gap-2 ${isCentered ? 'justify-center' : ''}`}>
          <span className="w-4 h-[2px] bg-[#2196E1]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#2196E1]">
            {label}
          </span>
          {isCentered && <span className="w-4 h-[2px] bg-[#2196E1]" />}
        </div>
      )}

      <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
        light ? 'text-white' : 'text-[#17243B]'
      }`}>
        {title}
      </h2>

      {subtitle && (
        <p className={`text-base sm:text-lg leading-relaxed ${
          light ? 'text-slate-300' : 'text-slate-600'
        } ${isCentered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
