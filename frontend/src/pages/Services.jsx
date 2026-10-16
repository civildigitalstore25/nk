import React from 'react';
import PageHero from '../components/PageHero';
import ServiceCard from '../components/ServiceCard';
import CTASection from '../components/CTASection';
import SectionHeading from '../components/SectionHeading';
import { servicesData } from '../data/services';

export default function Services() {
  return (
    <div className="space-y-0">
      
      {/* SECTION A: PAGE BANNER */}
      <PageHero
        label="END-TO-END SUPPORT"
        heading="Services for Every Stage of Your Project"
        subtitle="From first measurements and design ideas to approvals and execution, get the right professional support at the right time."
      />

      {/* SECTION B: SERVICE GRID */}
      <section className="py-16 md:py-20 lg:py-24 bg-[#F1F8FD] border-b border-[#D9E5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-14 md:mb-16">
            <SectionHeading
              label="SPECIALIZED CIVIL CAPABILITIES"
              title="Plan Better. Build With Confidence."
              subtitle="Choose a service or speak with us about a connected solution for your project in Thanjavur."
              align="center"
            />
          </div>

          {/* 8 Service Cards in 4-column Grid with detailed 3 benefits & enquiry link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service) => (
              <ServiceCard key={service.id} service={service} mode="detailed" />
            ))}
          </div>

          {/* Consultation Advisory Box */}
          <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-white border border-[#D9E5F0] max-w-4xl mx-auto text-center space-y-3 shadow-sm">
            <h3 className="text-lg font-bold text-[#17243B]">
              Need Multiple Services Combined?
            </h3>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Most property owners require integrated solutions — such as FMB land surveying followed directly by DTCP approval drawings and elevation design. We bundle our workflows to save time and eliminate miscommunications between separate vendors.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION C: SHARED CTA */}
      <CTASection />

    </div>
  );
}
