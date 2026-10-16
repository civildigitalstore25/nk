import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Hammer, 
  DraftingCompass, 
  FileCheck2, 
  Building2, 
  MapPin, 
  Compass, 
  Ruler, 
  HardHat, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const iconMap = {
  Hammer,
  DraftingCompass,
  FileCheck2,
  Building2,
  MapPin,
  Compass,
  Ruler,
  HardHat,
};

export default function ServiceCard({ service, mode = 'compact' }) {
  const IconComponent = iconMap[service.iconName] || Building2;
  const isDetailed = mode === 'detailed';

  return (
    <div className="bg-white rounded-xl border border-[#D9E5F0] p-6 lg:p-7 flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-[#2196E1]/50 group relative">
      {/* Top Header Row: Icon & Number */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-lg bg-[#F1F8FD] flex items-center justify-center text-[#2196E1] group-hover:bg-[#2196E1] group-hover:text-white transition-colors duration-200">
            <IconComponent className="w-6 h-6 stroke-[1.8]" />
          </div>
          <span className="text-xs font-bold text-slate-400 group-hover:text-[#2196E1] transition-colors tracking-widest font-mono">
            {service.number}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-[#17243B] mb-2 group-hover:text-[#2196E1] transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-[#64748B] leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Subtle Divider */}
        <div className="w-full h-[1px] bg-[#D9E5F0] my-4" />

        {/* Benefits Display */}
        {isDetailed ? (
          <ul className="space-y-2 mb-6">
            {service.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2196E1] flex-shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-slate-500 font-medium mb-6 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2196E1] flex-shrink-0" />
            <span>{service.homeBenefit || service.benefits[0]}</span>
          </p>
        )}
      </div>

      {/* Enquiry Link */}
      <div className="pt-2">
        <Link
          to={`/contact?service=${service.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2196E1] group-hover:text-[#1781c4] transition-colors"
          title={`Enquire about ${service.title}`}
        >
          <span>Enquire About This Service</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
