import React from 'react';
import { Clock, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';

interface CoursesSectionProps {
  onSelectCourse?: (courseTitle: string) => void;
}

const COURSES = [
  {
    id: 'rpc',
    title: 'DGCA Remote Pilot Certification (RPC)',
    category: 'Flagship License',
    duration: '5 Days (30 Hours)',
    batch: 'Every Monday & Weekend Batches',
    eligibility: '10th Pass, 18–65 Years, Valid Passport',
    highlights: [
      'DGCA approved flight simulator training (5 hrs)',
      'Dual-controlled live flight field practice (4.5 hrs)',
      'Solo flight assessment & logbook endorsement',
      'Air traffic regulations, meteorology & emergency protocols',
    ],
    popular: true,
  },
  {
    id: 'mapping',
    title: 'Advanced Drone Mapping & Photogrammetry',
    category: 'GIS & Survey Specialization',
    duration: '10 Days (45 Hours)',
    batch: '1st & 15th of Every Month',
    eligibility: 'Engineers, Surveyors, GIS Analysts',
    highlights: [
      'Ground Control Point (GCP) placement using DGPS',
      'Pix4D, DJI Terra, and Agisoft Metashape workflows',
      'Point cloud classification & contour generation',
      'LiDAR point density and thermal orthomosaic analysis',
    ],
    popular: false,
  },
  {
    id: 'agri',
    title: 'Agricultural Drone Operations & Spraying',
    category: 'Agritech Vocational Program',
    duration: '7 Days (35 Hours)',
    batch: 'Alternate Wednesdays',
    eligibility: 'Farmers, Agronomists, Rural Entrepreneurs',
    highlights: [
      'Safe chemical handling & nozzle calibration',
      'Automated mission flight planning with RTK bases',
      'Multispectral camera payload data interpretation',
      'Subsidies and government drone incentive paperwork guidance',
    ],
    popular: false,
  },
  {
    id: 'repair',
    title: 'Drone Assembly, Repair & Maintenance',
    category: 'Avionics & Hardware Lab',
    duration: '6 Days (36 Hours)',
    batch: 'Weekend Intensive',
    eligibility: 'Electronics / Mechanical enthusiasts',
    highlights: [
      'Brushless motor, ESC, and flight controller wiring',
      'PX4 & ArduPilot open-source firmware flashing',
      'Telemetry, receiver failsafes, and PID tuning',
      'Battery management system (LiPo) safety protocols',
    ],
    popular: false,
  },
];

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onSelectCourse }) => {
  return (
    <section id="courses" className="py-20 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-slate-950 border border-slate-800 px-3 py-1 rounded">
            DGCA Drone Academy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display mt-3">
            Government Certified Pilot Training Programs
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Gain an official DGCA Remote Pilot Certificate and launch your high-growth career in aviation, survey engineering, and agritech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className={`relative bg-slate-950 border rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-colors ${
                course.popular
                  ? 'border-cyan-500'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {course.popular && (
                <div className="absolute -top-3 right-6 bg-cyan-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded">
                  Most Enrolled
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-cyan-400 font-mono">
                    {course.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {course.title}
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{course.batch}</span>
                  </div>
                  <div className="col-span-2 text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    <strong className="text-slate-300">Eligibility:</strong> {course.eligibility}
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  <p className="text-xs font-medium text-slate-400">Curriculum Highlights:</p>
                  {course.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Placement Support</span>
                  <span className="text-xs font-semibold text-emerald-400">100% Industry Linked</span>
                </div>

                <a
                  href="#contact"
                  onClick={() => onSelectCourse?.(course.title)}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1 transition-colors"
                >
                  <span>Enroll / Enquire</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
