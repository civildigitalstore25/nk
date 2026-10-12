import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[#F1F8FD] px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#D9E5F0] p-8 text-center shadow-sm space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#F1F8FD] text-[#2196E1] font-black text-2xl flex items-center justify-center mx-auto border border-[#D9E5F0]">
          404
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-[#17243B] tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            The page or document you are looking for doesn’t exist or has moved. Return to the home page to explore our civil engineering services.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#2196E1] hover:bg-[#1881c2] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-[#17243B] bg-[#F1F8FD] hover:bg-slate-200 border border-[#D9E5F0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </section>
  );
}
