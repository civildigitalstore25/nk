import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, CheckCircle2, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';

export default function About() {
  const expertisePoints = [
    {
      title: "Planning and design support",
      desc: "Creating realistic, structurally sound 2D & 3D plans tailored to site geography and statutory bylaws."
    },
    {
      title: "Site measurement and surveying",
      desc: "Precision electronic total station measurements, contouring, and official FMB boundary verification."
    },
    {
      title: "Layout and marking coordination",
      desc: "Direct field setting-out of foundation lines, column grids, and setback boundaries to prevent deviations."
    },
    {
      title: "Construction guidance",
      desc: "Practical structural consulting, estimation checkpoints, and material quality assurance from start to finish."
    }
  ];

  return (
    <div className="space-y-0">
      
      {/* SECTION A: PAGE BANNER */}
      <PageHero
        label="OUR COMPANY"
        heading="About NK Constructions"
        subtitle="Professional thinking for well-planned, accurately measured, and confidently executed spaces."
      />

      {/* SECTION B: COMPANY INTRODUCTION */}
      <section className="py-16 md:py-20 lg:py-24 bg-white border-b border-[#D9E5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Who We Are */}
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

              <div className="p-4 rounded-xl bg-[#F1F8FD] border border-[#D9E5F0] text-sm text-slate-700">
                <span className="font-bold text-[#17243B]">Thanjavur Regional Grounding:</span> We understand local soil behavior, municipal DTCP regulations, and local climate patterns, ensuring buildings endure for generations.
              </div>
            </div>

            {/* Right Column: Architectural Building Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-[#D9E5F0] shadow-md aspect-[4/3] bg-slate-100">
                <img
                  src="/images/about-house.jpg"
                  alt="Modern residential building by NK Constructions"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION C: MISSION AND VISION */}
      <section className="py-16 md:py-20 lg:py-24 bg-[#F1F8FD] border-b border-[#D9E5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label mb-2">OUR GUIDING PRINCIPLES</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17243B] tracking-tight">
              Mission & Vision
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              The foundational values guiding our civil engineering practice and client partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Mission Card */}
            <div className="bg-white rounded-xl border border-[#D9E5F0] border-l-4 border-l-[#2196E1] p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[#F1F8FD] flex items-center justify-center text-[#2196E1] mb-5">
                <Target className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                OUR MISSION
              </div>
              <h3 className="text-xl font-bold text-[#17243B] mb-3">
                Make building decisions clearer.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To guide clients through planning, surveying, and construction with practical advice, careful work, and open communication.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-xl border border-[#D9E5F0] border-l-4 border-l-[#2196E1] p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[#F1F8FD] flex items-center justify-center text-[#2196E1] mb-5">
                <Eye className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                OUR VISION
              </div>
              <h3 className="text-xl font-bold text-[#17243B] mb-3">
                Create places with lasting value.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To support well-considered homes and properties shaped by sound engineering and responsible execution.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION D: EXPERTISE */}
      <section className="py-16 md:py-20 lg:py-24 bg-white border-b border-[#D9E5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Land Surveying Photograph */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden border border-[#D9E5F0] shadow-md aspect-[4/3] bg-slate-100">
                <img
                  src="/images/surveying-engineer.jpg"
                  alt="Civil engineer with total station surveying equipment on site"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#17243B]/90 backdrop-blur-sm text-white p-3.5 rounded-xl border border-slate-700 text-xs">
                  <div className="font-bold text-[#2196E1] uppercase tracking-wider text-[10px]">ON-SITE ACCURACY</div>
                  <div>Direct bridging between blueprint dimensions and ground reality.</div>
                </div>
              </div>
            </div>

            {/* Right Column: Expertise Content */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <span className="section-label">OUR EXPERTISE</span>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17243B] tracking-tight">
                Engineering Insight Meets Field Accuracy
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Our connected capabilities help reduce uncertainty between drawings and the site. Planning is informed by real conditions, while execution benefits from clear dimensions, alignment, and coordination.
              </p>

              {/* Compact Expertise Points */}
              <div className="space-y-4 pt-2">
                {expertisePoints.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#2196E1] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-[#17243B]">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Consultation CTA */}
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold text-white bg-[#2196E1] hover:bg-[#1881c2] shadow-sm transition-all"
                >
                  <span>Request an On-Site Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION E: SHARED CTA */}
      <CTASection />

    </div>
  );
}
