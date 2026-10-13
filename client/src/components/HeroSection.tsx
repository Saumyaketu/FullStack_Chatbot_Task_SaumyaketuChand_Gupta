import React from 'react';
import { ArrowRight, Plane, Award, Sparkles, CheckCircle, Compass, Users } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 text-cyan-400 px-3.5 py-1.5 rounded-full text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI-Driven Drone Operations & DGCA Flight Certification</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-display leading-tight sm:leading-none">
            Empowering the Skies with{' '}
            <span className="text-cyan-400">
              Precision Drones & Pilot Training
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            DroneTV delivers industry-grade aerial mapping, agricultural spraying, and cinema filming, alongside India’s premier DGCA certified remote pilot license courses.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#courses"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <span>Explore Pilot Courses</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#services"
              className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 px-6 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <span>Commercial Drone Services</span>
            </a>

            <a
              href="#contact"
              className="bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/60 hover:border-cyan-400 px-5 py-3 rounded-lg text-sm font-medium transition-colors"
            >
              Request Custom Quote
            </a>
          </div>

          {/* Highlights Checklist */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span>Government DGCA Approved</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span>Certified Flight Simulators</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span>100% Placement Support</span>
            </div>
          </div>
        </div>

        {/* Metric Cards Grid - Solid Clean Surface */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 border border-slate-700">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-display">2,800+</p>
            <p className="text-xs text-slate-400 mt-1">Pilots Certified & Trained</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 border border-slate-700">
              <Compass className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-display">180,000+</p>
            <p className="text-xs text-slate-400 mt-1">Acres Surveyed & Mapped</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 border border-slate-700">
              <Award className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-display">99.4%</p>
            <p className="text-xs text-slate-400 mt-1">DGCA Exam Pass Rate</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-slate-800 flex items-center justify-center text-purple-400 border border-slate-700">
              <Plane className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-display">120+</p>
            <p className="text-xs text-slate-400 mt-1">Enterprise Fleet Contracts</p>
          </div>
        </div>
      </div>
    </section>
  );
};
