import React, { useState } from 'react';
import { MapPin, ArrowUpRight, X } from 'lucide-react';

export default function ProjectCard({ project }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setModalOpen(true)}
        className="group relative bg-white rounded-xl overflow-hidden border border-[#D9E5F0] hover:border-[#2196E1]/50 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
      >
        {/* Project Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#17243B]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Category Badge */}
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="inline-block px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase text-white bg-[#17243B]/80 backdrop-blur-sm rounded border border-white/20">
              {project.category}
            </span>
          </div>

          {/* Quick Expand Icon */}
          <div className="absolute bottom-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-white/90 text-[#17243B] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Project Info */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#2196E1]" />
              <span>{project.location}</span>
            </div>
            <h3 className="text-base font-bold text-[#17243B] group-hover:text-[#2196E1] transition-colors mb-2">
              {project.title}
            </h3>
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-[#D9E5F0] flex items-center justify-between text-xs font-semibold text-[#2196E1]">
            <span>View Project Scope</span>
            <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
        </div>
      </div>

      {/* Accessible Detail Modal */}
      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${project.id}`}
          >
            {/* Modal Header Image */}
            <div className="relative aspect-[16/9] w-full bg-slate-900">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-[#2196E1] text-white rounded">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#2196E1]" />
                  <span>{project.location}</span>
                </div>
                <h3 id={`modal-title-${project.id}`} className="text-xl sm:text-2xl font-bold text-[#17243B]">
                  {project.title}
                </h3>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {project.details || project.shortDescription}
              </p>

              {project.specs && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-[#F1F8FD] rounded-xl border border-[#D9E5F0] text-xs">
                  {Object.entries(project.specs).map(([key, val]) => (
                    <div key={key}>
                      <div className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </div>
                      <div className="text-[#17243B] font-bold mt-0.5">{val}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 text-[11px] text-slate-400 italic">
                * Note: Demonstration portfolio item showcasing engineering scope & capabilities.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
