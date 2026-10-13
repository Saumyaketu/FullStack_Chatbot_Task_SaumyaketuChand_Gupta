import React from 'react';
import { Camera, Map, Sprout, ShieldAlert, Check, ArrowUpRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService?: (serviceTitle: string) => void;
}

const SERVICES = [
  {
    id: 'mapping',
    title: 'Aerial Surveying & 3D Mapping',
    icon: Map,
    badge: 'Infrastructure & GIS',
    desc: 'High-precision photogrammetry, contour generation, and LiDAR point clouds for highways, mining, smart cities, and real estate.',
    specs: ['Sub-centimeter RTK accuracy', 'Orthomosaic & DEM generation', 'Volume calculation for earthworks', 'CAD & GIS format delivery'],
    border: 'hover:border-slate-600',
    color: 'text-cyan-400',
  },
  {
    id: 'inspection',
    title: 'Industrial Asset & Thermal Inspection',
    icon: ShieldAlert,
    badge: 'Renewables & Power',
    desc: 'Automated thermal, radiometric, and high-zoom visual inspections of photovoltaic solar panels, wind turbine blades, flare stacks, and transmission lines.',
    specs: ['Thermal hotspot anomaly detection', 'AI defect classification report', 'Zero facility shutdown required', 'Radiometric analysis'],
    border: 'hover:border-slate-600',
    color: 'text-amber-400',
  },
  {
    id: 'agriculture',
    title: 'Precision Agriculture Spraying',
    icon: Sprout,
    badge: 'Agritech & Yield',
    desc: 'Autonomous pesticide, fungicide, and liquid bio-fertilizer spraying with centimeter accuracy. Multispectral NDVI sensors identify stressed crop clusters.',
    specs: ['Up to 30 acres sprayed per day', '35% chemical runoff reduction', 'Multispectral NDVI health maps', 'Automated obstacle bypass'],
    border: 'hover:border-slate-600',
    color: 'text-emerald-400',
  },
  {
    id: 'cinematography',
    title: 'High-Resolution Aerial Cinematography',
    icon: Camera,
    badge: 'Media & Tourism',
    desc: '6K/8K cinema-grade aerial perspectives, high-dynamic-range chase sequences, and manual high-velocity acrobatic FPV camera piloting for feature films.',
    specs: ['Dual-pilot master control gimbal', 'ProRes & RAW cinema capture', 'Acrobatic FPV chase capabilities', 'DGCA night flight clearance'],
    border: 'hover:border-slate-600',
    color: 'text-purple-400',
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-slate-900 border border-slate-800 px-3 py-1 rounded">
            Commercial Drone Fleet
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display mt-3">
            Specialized Aerial Solutions for Enterprise
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            From precision mapping corridors to agricultural yield preservation, DroneTV deploys DGCA-compliant commercial UAV operations across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 transition-colors hover:border-slate-700 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-slate-950 flex items-center justify-center ${srv.color} border border-slate-800`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold bg-slate-950 text-slate-300 px-3 py-1 rounded border border-slate-800">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    {srv.desc}
                  </p>

                  <div className="mt-5 space-y-2 border-t border-slate-800 pt-4">
                    {srv.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <a
                    href="#contact"
                    onClick={() => onSelectService?.(srv.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Request Quotation</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <span className="text-[11px] text-slate-500 font-mono">
                    SLA-backed Guarantee
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
