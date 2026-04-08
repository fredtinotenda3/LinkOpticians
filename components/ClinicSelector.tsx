"use client";

import { Branch } from "@/types";

interface ClinicSelectorProps {
  branches: Branch[];
}

export const ClinicSelector = ({ branches }: ClinicSelectorProps) => {
  const scrollToForm = () => {
    const branchSelect = document.getElementById("branch-select");
    if (branchSelect) {
      branchSelect.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {branches?.map((branch: any) => (
        <button
          key={branch.$id}
          onClick={scrollToForm}
          className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/40 hover:bg-white/[0.04] transition-all duration-500 text-left hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_20px_rgba(59,130,246,0.1)] hover:-translate-y-1.5"
        >
          {/* Pin icon container */}
          <div className="w-12 h-12 mb-6 rounded-2xl bg-blue-500/10 group-hover:bg-blue-500/20 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          {/* Branch name */}
          <h3 className="text-white font-bold text-base group-hover:text-blue-400 transition-colors duration-500 tracking-tight leading-tight">
            {branch.name}
          </h3>

          {/* Address */}
          <p className="text-white/30 text-[11px] mt-2 line-clamp-2 leading-relaxed font-light italic">
            {branch.address}
          </p>

          {/* "Select clinic" — appears on hover */}
          <div className="mt-6 flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            Select Clinic
            <svg className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

          {/* Blue bottom accent line — animated glow */}
          <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500/0 to-transparent group-hover:via-blue-500/50 transition-all duration-700" />
        </button>
      ))}
    </div>
  );
};