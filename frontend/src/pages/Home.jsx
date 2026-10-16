import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  Calculator, 
  Layers, 
} from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';
import CTASection from '../components/CTASection';
import SectionHeading from '../components/SectionHeading';
import { BlogPreviewCard } from '../components/BlogPreviewCard';
import { fetchPublishedBlogs } from '../services/blogApi';
import { servicesData } from '../data/services';
import { projectsData } from '../data/projects';

export default function Home() {
  const featuredProjects = projectsData.filter(p => p.featuredOnHome);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchPublishedBlogs()
      .then((posts) => setBlogs(posts.slice(0, 4)))
      .catch(() => setBlogs([]));
  }, []);

  const whyChooseUsPoints = [
    {
      icon: ShieldCheck,
      title: "Professional Engineering Guidance",
      description: "Qualified civil engineering oversight to ensure structural stability, statutory compliance, and optimal space utility."
    },
    {
      icon: Compass,
      title: "Accurate Surveying & Marking",
      description: "Advanced total station equipment and FMB correlation to pinpoint exact site boundaries, levels, and column grids."
    },
    {
      icon: Calculator,
      title: "Practical Planning & Cost Estimation",
      description: "Realistic material estimation, clear project roadmaps, and budget transparency from initial drawing to roof slab."
    },
    {
      icon: Layers,
      title: "Reliable Project Coordination",
      description: "Hands-on site visits, proactive quality checkpoints, and timely contractor coordination at every construction milestone."
    }
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Consultation",
      description: "Share your site, goals, priorities, and questions."
    },
    {
      step: "02",
      title: "Site Visit & Survey",
      description: "We study the property and gather essential measurements."
    },
    {
      step: "03",
      title: "Planning & Estimation",
      description: "We shape a practical plan and define the project scope."
    },
    {
      step: "04",
      title: "Execution & Delivery",
      description: "Work is coordinated with clarity through completion."
    }
  ];

  return (
    <div className="space-y-0">
      
      {/* SECTION A: HERO */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20 border-b border-[#D9E5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline, Description & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Uppercase Label */}
              <div className="inline-flex items-center gap-2">
                <span className="w-5 h-[2px] bg-[#2196E1]" />
                <span className="section-label">CIVIL ENGINEERING & SURVEYING</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#17243B] tracking-tight leading-[1.15]">
                Building Your Vision, <span className="text-[#2196E1]">From Plan to Reality.</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Expert guidance for building design, construction, approvals, and land surveying. We help turn your property plans into reality with professional engineering services in Thanjavur and surrounding regions.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-sm font-bold text-white bg-[#2196E1] hover:bg-[#1881c2] shadow-sm hover:shadow transition-all duration-200 active:scale-95 text-center"
                >
                  Get a Free Consultation
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-sm font-bold text-[#17243B] bg-[#F1F8FD] hover:bg-[#e4f1fb] border border-[#D9E5F0] transition-all duration-200 text-center group"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 text-[#2196E1] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Divider & 3 Trust Indicators */}
              <div className="pt-4 border-t border-[#D9E5F0] mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#2196E1] flex-shrink-0" />
                    <span>Building Planning & Design</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#2196E1] flex-shrink-0" />
                    <span>Licensed Land Surveying</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#2196E1] flex-shrink-0" />
                    <span>Construction Consulting</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Architectural Photograph */}
            <div className="lg:col-span-5 relative">
              {/* Decorative Pale Blue Background Shape */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-[#F1F8FD] rounded-3xl -z-10 transform rotate-3" />
              <div className="absolute -bottom-4 -left-4 w-60 h-60 bg-[#D9E5F0]/60 rounded-3xl -z-10" />

              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-100 aspect-[4/3] lg:aspect-[4/3] w-full bg-slate-100">
                <img
                  src="/images/hero-house.jpg"
                  alt="Modern contemporary residential villa engineered by NK Constructions"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />

                {/* Overlapping Dark Navy Information Card */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 bg-[#17243B]/95 backdrop-blur-md rounded-xl p-4 sm:p-5 border border-slate-700/80 text-white shadow-xl">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#2196E1] mb-1">
                    DESIGNED WITH PURPOSE
                  </div>
                  <div className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Practical. Precise. Personal.
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    Field-verified accuracy & structural reliability.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION B: SERVICES OVERVIEW */}
      <section className="py-16 md:py-20 lg:py-24 bg-[#F1F8FD] border-b border-[#D9E5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 md:mb-16">
            <SectionHeading
              label="OUR PROFESSIONAL SERVICES"
              title="Our Professional Services"
              subtitle="Complete engineering and surveying solutions for your property in Thanjavur."
              align="center"
            />
          </div>

          {/* 8 Services in Responsive Grid (4 cols desktop, 2 cols tablet, 1-2 cols mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service) => (
              <ServiceCard key={service.id} service={service} mode="compact" />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#2196E1] hover:text-[#1881c2] transition-colors"
            >
              <span>View Full Service Specifications & Benefits</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION C: ABOUT PREVIEW */}
      <section className="py-16 md:py-20 lg:py-24 bg-white border-b border-[#D9E5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side text */}
            <div className="lg:col-span-6 space-y-6">
              <span className="section-label">WHO WE ARE</span>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17243B] tracking-tight">
                A Practical Partner for Your Property Journey
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Based in Thanjavur, <strong>NK Constructions</strong> brings planning, design, construction consulting, and land surveying together under one professional approach. We listen closely, study the site, and help clients move forward with clarity.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Whether you are planning a new home, improving an existing property, or establishing accurate site references, our focus stays on thoughtful solutions and dependable coordination.
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white bg-[#2196E1] hover:bg-[#1881c2] shadow-sm transition-all"
                >
                  <span>Know More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right side image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-[#D9E5F0] shadow-md aspect-[4/3] bg-slate-100">
                <img
                  src="/images/about-house.jpg"
                  alt="Modern architectural residence engineered with precision"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17243B]/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-semibold px-3 py-2 bg-black/40 backdrop-blur-sm rounded-lg">
                  Structural Design • Approvals • Field Surveying Coordination
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION D: WHY CHOOSE US */}
      <section className="py-16 md:py-20 lg:py-24 bg-[#F1F8FD] border-b border-[#D9E5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 md:mb-16">
            <SectionHeading
              label="OUR COMMITMENT"
              title="Why Choose NK Constructions"
              subtitle="Practical civil engineering practices focused on measurable accuracy, durability, and open communication."
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUsPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-[#D9E5F0] p-6 sm:p-7 flex flex-col justify-start hover:border-[#2196E1]/50 hover:shadow-sm transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#F1F8FD] flex items-center justify-center text-[#2196E1] mb-5">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="text-base font-bold text-[#17243B] mb-2">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION E: HOW WE WORK (4-step process) */}
      <section className="py-16 md:py-20 lg:py-24 bg-white border-b border-[#D9E5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-14 md:mb-20">
            <SectionHeading
              label="OUR PROCESS"
              title="How We Work"
              subtitle="A structured, transparent pathway ensuring seamless transitions from preliminary concepts to final execution."
              align="center"
            />
          </div>

          {/* Workflow Steps: Connecting line on desktop */}
          <div className="relative">
            {/* Desktop Connecting Line */}
            <div className="hidden lg:block absolute top-7 left-1/8 right-1/8 h-[2px] bg-[#D9E5F0] -z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {workflowSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  {/* Step Circular Indicator */}
                  <div className="w-14 h-14 rounded-full bg-[#F1F8FD] border-2 border-[#2196E1] flex items-center justify-center text-[#17243B] font-extrabold text-sm mb-5 shadow-sm group-hover:bg-[#2196E1] group-hover:text-white transition-all duration-200">
                    {step.step}
                  </div>

                  <h3 className="text-lg font-bold text-[#17243B] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION F: FEATURED PROJECTS */}
      <section className="py-16 md:py-20 lg:py-24 bg-[#F1F8FD] border-b border-[#D9E5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="section-label mb-2">PORTFOLIO HIGHLIGHTS</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17243B] tracking-tight">
                Featured Projects
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
                A showcase of residential design, surveying verification, and elevation projects.
              </p>
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2196E1] hover:text-[#1881c2] transition-colors flex-shrink-0"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Demonstration Notice */}
          <div className="mb-8 p-3 rounded-lg bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-800 flex items-center gap-2">
            <span className="font-bold">Portfolio Notice:</span>
            <span>These project images and scopes are illustrative demonstration concepts representing our engineering capabilities.</span>
          </div>

          {/* Grid of 4 Featured Projects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

        </div>
      </section>

      {/* SECTION G: LATEST BLOGS */}
      {blogs.length > 0 && (
        <section className="py-16 md:py-20 lg:py-24 bg-white border-b border-[#D9E5F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="section-label mb-2">INSIGHTS & GUIDES</span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17243B] tracking-tight">
                  Latest from the Blog
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
                  Practical notes on planning, surveying, approvals, and construction.
                </p>
              </div>

              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2196E1] hover:text-[#1881c2] transition-colors flex-shrink-0"
              >
                <span>View All Blogs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {blogs.map((post) => (
                <BlogPreviewCard key={post._id || post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION H: FINAL CTA */}
      <CTASection />

    </div>
  );
}
