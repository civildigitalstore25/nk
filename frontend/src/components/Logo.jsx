import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ variant = 'dark', className = '' }) {
  const isDark = variant === 'dark'; // Dark logo for white backgrounds
  
  return (
    <Link to="/" className={`inline-flex items-center gap-3 group select-none ${className}`} aria-label="NK Constructions Home">
      {/* Architectural Logo Mark */}
      <div className={`relative flex items-center justify-center w-10 h-10 rounded-lg transition-transform duration-300 group-hover:scale-105 ${
        isDark ? 'bg-[#17243B] text-white shadow-sm' : 'bg-[#2196E1] text-white'
      }`}>
        <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Gable roof outline */}
          <path 
            d="M20 6L6 17V33H34V17L20 6Z" 
            stroke={isDark ? '#2196E1' : '#FFFFFF'} 
            strokeWidth="2.5" 
            strokeLinejoin="round" 
          />
          {/* Internal foundation / column arches */}
          <path 
            d="M14 33V23H26V33" 
            stroke={isDark ? '#2196E1' : '#FFFFFF'} 
            strokeWidth="2" 
            strokeLinejoin="round" 
          />
          {/* Center apex beam */}
          <path 
            d="M13 18L20 12L27 18" 
            stroke={isDark ? '#FFFFFF' : '#17243B'} 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black text-xl tracking-tight transition-colors ${
            isDark ? 'text-[#17243B] group-hover:text-[#2196E1]' : 'text-white'
          }`}>
            NK
          </span>
          <span className={`font-bold text-sm tracking-widest uppercase ${
            isDark ? 'text-[#2196E1]' : 'text-[#2196E1]'
          }`}>
            CONSTRUCTIONS
          </span>
        </div>
        <span className={`text-[9px] font-semibold tracking-wider uppercase mt-1 ${
          isDark ? 'text-slate-500' : 'text-slate-400'
        }`}>
          CIVIL ENGINEERING & SURVEYING
        </span>
      </div>
    </Link>
  );
}
