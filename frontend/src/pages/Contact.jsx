import React from 'react';
import PageHero from '../components/PageHero';
import ContactInfoCard from '../components/ContactInfoCard';
import ContactForm from '../components/ContactForm';
import { MapPin, Navigation } from 'lucide-react';

export default function Contact() {
  return (
    <div className="space-y-0">
      
      {/* SECTION A: PAGE BANNER */}
      <PageHero
        label="CONTACT US"
        heading="Let's Talk About Your Property"
        subtitle="Share your plans, questions, or site details. We'll help you identify a practical next step."
      />

      {/* SECTION B: TWO-COLUMN CONTACT SECTION */}
      <section className="py-16 md:py-20 lg:py-24 bg-[#F1F8FD] border-b border-[#D9E5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Local Support Information Cards & Map Placeholder */}
            <div className="lg:col-span-5 space-y-8">
              <ContactInfoCard />

              {/* Office Location Map Card */}
              <div className="bg-white rounded-xl border border-[#D9E5F0] overflow-hidden p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#2196E1]" />
                    <span className="text-xs font-bold text-[#17243B] uppercase tracking-wider">
                      Thanjavur Office Location
                    </span>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Plot+No.+41+Sakthi+Illam+4th+Cross+Maris+Nagar+M.C.+Road+Thanjavur+613004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#2196E1] hover:underline"
                  >
                    <span>Get Directions</span>
                    <Navigation className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Styled Map Embed / Location Card */}
                <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-[#D9E5F0] bg-slate-100">
                  <iframe
                    title="NK Constructions Office Location in Thanjavur"
                    src="https://maps.google.com/maps?q=Maris+Nagar+MC+Road+Thanjavur+Tamil+Nadu+India&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 filter grayscale contrast-125 opacity-90 hover:filter-none hover:opacity-100 transition-all duration-300"
                    loading="lazy"
                    aria-hidden="false"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm p-2 rounded text-[11px] text-slate-700 shadow-sm border border-slate-200 pointer-events-none">
                    <strong>Sakthi Illam</strong>, 4th Cross, Maris Nagar, M.C. Road, Thanjavur
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Project Enquiry Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
