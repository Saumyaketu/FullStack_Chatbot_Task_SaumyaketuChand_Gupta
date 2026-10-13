import React from 'react';
import { Plane } from 'lucide-react';

interface FooterProps {
  onNavigateAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateAdmin }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-900">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-cyan-500 flex items-center justify-center text-slate-950 font-bold">
                <Plane className="w-4 h-4 -rotate-45" />
              </div>
              <span className="text-lg font-bold font-display text-white">
                Drone<span className="text-cyan-400">TV</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              India's premier drone ecosystem delivering enterprise aerial mapping, agriculture solutions, and DGCA certified remote pilot education.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Commercial UAV
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Aerial Survey & 3D Mapping</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Industrial Asset Inspection</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Precision Agriculture Spraying</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Cinema & Media Filming</a></li>
            </ul>
          </div>

          {/* Academy */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Pilot Academy
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#courses" className="hover:text-cyan-400 transition-colors">DGCA Remote Pilot License</a></li>
              <li><a href="#courses" className="hover:text-cyan-400 transition-colors">Advanced GIS & Photogrammetry</a></li>
              <li><a href="#courses" className="hover:text-cyan-400 transition-colors">Agricultural Pilot Training</a></li>
              <li><a href="#courses" className="hover:text-cyan-400 transition-colors">Flight Simulators & Ground School</a></li>
            </ul>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Administration & Portal
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Access the live enquiries management dashboard to review submissions.
            </p>
            <button
              onClick={onNavigateAdmin}
              className="bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 px-3 py-1.5 rounded text-xs font-semibold transition-colors"
            >
              Open Admin Portal
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} DroneTV. Practical Technical Assignment for IPAGE Group.</p>
          <div className="flex items-center gap-1">
            <span>Built with React, TypeScript, Express, and MongoDB</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
