// components/ClinicSelector.tsx
"use client";

interface ClinicSelectorProps {
  branches: any[];
}

export const ClinicSelector = ({ branches }: ClinicSelectorProps) => {
  const scrollToForm = () => {
    const branchSelect = document.getElementById("branch-select");
    if (branchSelect) {
      branchSelect.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {branches?.map((branch: any) => (
        <button
          key={branch.$id}
          onClick={scrollToForm}
          className="group relative p-6 rounded-2xl bg-dark-400 border border-dark-500 hover:border-green-500/60 hover:bg-dark-300 transition-all duration-300 text-left hover:shadow-[0_4px_24px_rgba(36,174,124,0.12)] hover:-translate-y-0.5"
        >
          {/* Pin icon container */}
          <div className="w-11 h-11 mb-4 rounded-xl bg-green-500/15 group-hover:bg-green-500/25 flex items-center justify-center transition-colors duration-300">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          {/* Branch name */}
          <h3 className="text-white font-bold text-sm group-hover:text-green-400 transition-colors duration-300 leading-tight">
            {branch.name}
          </h3>

          {/* Address */}
          <p className="text-white/40 text-xs mt-1.5 line-clamp-2 leading-snug">
            {branch.address}
          </p>

          {/* "Select clinic" — appears on hover */}
          <div className="mt-4 flex items-center gap-1.5 text-green-400 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Select clinic
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

          {/* Green bottom accent — visible on hover */}
          <div className="absolute bottom-0 left-4 right-4 h-px bg-green-500/0 group-hover:bg-green-500/40 transition-colors duration-300 rounded-full" />
        </button>
      ))}
    </div>
  );
};
