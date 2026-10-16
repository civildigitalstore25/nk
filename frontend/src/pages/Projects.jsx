import React, { useState } from 'react';
import PageHero from '../components/PageHero';
import ProjectCard from '../components/ProjectCard';
import CTASection from '../components/CTASection';
import { projectsData, projectCategories } from '../data/projects';
import { Info, Filter } from 'lucide-react';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="space-y-0">
      
      {/* SECTION A: PAGE BANNER */}
      <PageHero
        label="PORTFOLIO"
        heading="Our Projects"
        subtitle="A flexible showcase for residential, renovation, design, surveying, and layout work."
        backgroundImage="/images/hero-house.jpg"
      />

      {/* SECTION B: PORTFOLIO SHOWCASE */}
      <section className="py-16 md:py-20 lg:py-24 bg-white border-b border-[#D9E5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Demonstration Notice */}
          <div className="mb-10 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-3 max-w-4xl mx-auto">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold">Demo portfolio:</span> these images and project names are illustrative and do not represent completed NK Constructions work. Replace them with verified company projects before publication.
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12" role="tablist" aria-label="Project Categories">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">
              <Filter className="w-3.5 h-3.5 text-[#2196E1]" />
              <span>Filter:</span>
            </div>

            {projectCategories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#2196E1] text-white shadow-sm'
                      : 'bg-[#F1F8FD] text-[#17243B] hover:bg-[#e2effa] border border-[#D9E5F0]'
                  }`}
                >
                  {category}
                  {category !== 'All' && (
                    <span className={`ml-1.5 text-[10px] ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                      ({projectsData.filter(p => p.category === category).length})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Project Cards Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-500 text-sm">
              No projects found in this category.
            </div>
          )}

          {/* Project Consultation Footer Note */}
          <div className="mt-16 text-center text-xs text-slate-500">
            Have a unique site in Thanjavur or nearby districts? We can customize planning and surveying scope to match your property dimensions.
          </div>

        </div>
      </section>

      {/* SECTION C: CTA */}
      <CTASection />

    </div>
  );
}
