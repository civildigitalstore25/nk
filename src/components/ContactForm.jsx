import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const SERVICE_OPTIONS = [
  'Renovation',
  'Building Plan & Design',
  'Building Approval Plans',
  'Elevation Design',
  'FMB Marking',
  'Construction Survey',
  'Layout Marking',
  'Construction Execution',
  'General Enquiry'
];

export default function ContactForm({ preselectedService }) {
  const [searchParams] = useSearchParams();
  const queryService = searchParams.get('service');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceRequired: 'General Enquiry',
    projectLocation: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'demo_success' | 'error' | null

  // Map slug or prop to service dropdown value
  useEffect(() => {
    const slug = preselectedService || queryService;
    if (slug) {
      const match = SERVICE_OPTIONS.find(opt => 
        opt.toLowerCase().replace(/[^a-z0-9]/g, '-') === slug.toLowerCase().replace(/[^a-z0-9]/g, '-') ||
        opt.toLowerCase().includes(slug.toLowerCase())
      );
      if (match) {
        setFormData(prev => ({ ...prev, serviceRequired: match }));
      }
    }
  }, [preselectedService, queryService]);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else {
      // Basic Indian / international phone regex
      const phoneDigits = formData.phone.replace(/[^0-9]/g, '');
      if (phoneDigits.length < 10) {
        newErrors.phone = 'Please enter a valid 10-digit mobile number.';
      }
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.projectLocation.trim()) {
      newErrors.projectLocation = 'Please provide the project or plot location (e.g. Thanjavur).';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide brief details about your requirement.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionStatus(null);

    // Simulate clean form handling without pretending fake backend email delivery
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Future integration hook:
      // await fetch('/api/enquiry', { method: 'POST', body: JSON.stringify(formData) });
      
      setIsSubmitting(false);
      setSubmissionStatus('demo_success');
    } catch {
      setIsSubmitting(false);
      setSubmissionStatus('error');
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      serviceRequired: 'General Enquiry',
      projectLocation: '',
      message: ''
    });
    setErrors({});
    setSubmissionStatus(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#D9E5F0] p-6 sm:p-8 lg:p-9 shadow-sm relative">
      <div className="mb-6">
        <span className="section-label mb-2">PROJECT ENQUIRY</span>
        <h3 className="text-2xl font-extrabold text-[#17243B] tracking-tight">
          How can we help?
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Fill out this brief form and our civil engineering team will respond within 24 hours.
        </p>
      </div>

      {submissionStatus === 'demo_success' ? (
        <div className="p-6 bg-[#F1F8FD] rounded-xl border border-[#2196E1]/30 text-center space-y-4 animate-in fade-in duration-300">
          <div className="w-12 h-12 rounded-full bg-[#2196E1] text-white flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-[#17243B]">
              Enquiry Details Received (Demo Mode)
            </h4>
            <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
              Thank you, <strong className="text-[#17243B]">{formData.fullName}</strong>. We have logged your request for <strong className="text-[#17243B]">{formData.serviceRequired}</strong> at <strong className="text-[#17243B]">{formData.projectLocation}</strong>.
            </p>
          </div>

          <div className="p-3 bg-white rounded-lg border border-[#D9E5F0] text-[11px] text-slate-500 text-left max-w-sm mx-auto">
            <div className="font-semibold text-slate-700 mb-1">Developer Notice:</div>
            This form is currently in demonstration mode. No emails have been transmitted. Connect your backend endpoint (e.g. Node.js, Nodemailer, or Formspree) in <code className="text-[#2196E1]">ContactForm.jsx</code> for production deployment.
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#2196E1] hover:bg-[#1881c2] transition-colors"
          >
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          
          {submissionStatus === 'error' && (
            <div className="p-3.5 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>An unexpected error occurred. Please call us directly at +91 97878 39067.</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. R. Subramanian"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm text-[#17243B] bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2196E1] transition-all ${
                errors.fullName ? 'border-red-400 focus:ring-red-400' : 'border-[#D9E5F0]'
              }`}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.fullName}</p>
            )}
          </div>

          {/* Phone & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm text-[#17243B] bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2196E1] transition-all ${
                  errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-[#D9E5F0]'
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm text-[#17243B] bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2196E1] transition-all ${
                  errors.email ? 'border-red-400 focus:ring-red-400' : 'border-[#D9E5F0]'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Service Dropdown & Location Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Service */}
            <div>
              <label htmlFor="serviceRequired" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Service Required <span className="text-red-500">*</span>
              </label>
              <select
                id="serviceRequired"
                name="serviceRequired"
                value={formData.serviceRequired}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-[#D9E5F0] text-sm text-[#17243B] bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2196E1] transition-all"
              >
                {SERVICE_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="projectLocation" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Project Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="projectLocation"
                name="projectLocation"
                value={formData.projectLocation}
                onChange={handleChange}
                placeholder="e.g. Maris Nagar, Thanjavur"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm text-[#17243B] bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2196E1] transition-all ${
                  errors.projectLocation ? 'border-red-400 focus:ring-red-400' : 'border-[#D9E5F0]'
                }`}
              />
              {errors.projectLocation && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.projectLocation}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Project Details & Requirements <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your plot size, building type, required timeline, or specific surveying questions..."
              className={`w-full px-4 py-2.5 rounded-lg border text-sm text-[#17243B] bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2196E1] transition-all ${
                errors.message ? 'border-red-400 focus:ring-red-400' : 'border-[#D9E5F0]'
              }`}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold text-white bg-[#2196E1] hover:bg-[#1881c2] shadow-sm disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Validating & Processing...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Enquiry</span>
                </>
              )}
            </button>
          </div>

          <div className="text-[11px] text-slate-400 text-center pt-1">
            🔒 Your contact information is kept strictly confidential for engineering consultation only.
          </div>
        </form>
      )}
    </div>
  );
}
