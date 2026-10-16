import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, Clock } from 'lucide-react';

export default function ContactInfoCard() {
  const officeAddress = `Plot No. 41, "Sakthi Illam", 4th Cross, Maris Nagar, M.C. Road, Thanjavur – 613 004, Tamil Nadu, India.`;
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Plot No. 41, Sakthi Illam, 4th Cross, Maris Nagar, M.C. Road, Thanjavur 613004')}`;

  const contactItems = [
    {
      icon: Phone,
      title: 'Phone Consultation',
      value: '+91 97878 39067',
      subtext: 'Direct phone & WhatsApp support',
      href: 'tel:+919787839067',
      actionLabel: 'Call Now',
    },
    {
      icon: Mail,
      title: 'Email Enquiry',
      value: 'contact@nkconstructions.com',
      subtext: 'Send architectural briefs or survey queries',
      href: 'mailto:contact@nkconstructions.com',
      actionLabel: 'Send Email',
    },
    {
      icon: MapPin,
      title: 'Office Location',
      value: 'Plot No. 41, "Sakthi Illam", 4th Cross, Maris Nagar, M.C. Road',
      subtext: 'Thanjavur – 613 004, Tamil Nadu, India.',
      href: mapSearchUrl,
      actionLabel: 'View on Google Maps',
      external: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="section-label mb-2">LOCAL SUPPORT IN THANJAVUR</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17243B] tracking-tight">
          Let’s Discuss Your Site & Project
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          Connect with NK Constructions for planning, design, surveying, renovation, or construction enquiries. Visit our office in Thanjavur or reach out directly by phone.
        </p>
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        {contactItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-[#D9E5F0] p-5 hover:border-[#2196E1]/50 hover:shadow-sm transition-all duration-200 flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-lg bg-[#F1F8FD] flex items-center justify-center text-[#2196E1] flex-shrink-0 mt-0.5">
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  {item.title}
                </h3>
                <div className="text-sm sm:text-base font-bold text-[#17243B] break-words">
                  {item.value}
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  {item.subtext}
                </p>

                <div className="mt-3">
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2196E1] hover:text-[#1881c2] transition-colors"
                  >
                    <span>{item.actionLabel}</span>
                    {item.external ? (
                      <ExternalLink className="w-3.5 h-3.5" />
                    ) : (
                      <span className="text-sm">→</span>
                    )}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Working Hours Box */}
      <div className="bg-[#F1F8FD] rounded-xl border border-[#D9E5F0] p-4 flex items-center gap-3 text-xs text-slate-700">
        <Clock className="w-4 h-4 text-[#2196E1] flex-shrink-0" />
        <div>
          <span className="font-bold text-[#17243B]">Office Hours: </span>
          <span>Monday – Saturday: 9:00 AM to 7:00 PM (IST). Sunday site visits by prior appointment.</span>
        </div>
      </div>
    </div>
  );
}
