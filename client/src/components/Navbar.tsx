import React, { useState } from 'react';
import { Plane, LayoutDashboard, Home, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'admin';
  onNavigate: (view: 'home' | 'admin') => void;
  onOpenChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center text-slate-950 transition-colors group-hover:bg-cyan-400">
              <Plane className="w-5 h-5 -rotate-45 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold font-display tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  Drone<span className="text-cyan-400">TV</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded">
                  <ShieldCheck className="w-3 h-3 text-cyan-400" /> DGCA Certified
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-mono hidden sm:block">
                Aviation & AI Lead System
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {currentView === 'home' ? (
              <>
                <a
                  href="#services"
                  className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  Commercial Services
                </a>
                <a
                  href="#courses"
                  className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  Pilot Courses
                </a>
                <a
                  href="#contact"
                  className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  Enquiry Form
                </a>
              </>
            ) : (
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Back to Main Website</span>
              </button>
            )}

            {/* Admin Dashboard Switcher Button */}
            {currentView === 'home' ? (
              <button
                onClick={() => onNavigate('admin')}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                <span>Admin Portal</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>View Public Site</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => onNavigate(currentView === 'home' ? 'admin' : 'home')}
              className="text-xs bg-slate-900 text-cyan-400 border border-slate-800 px-2.5 py-1.5 rounded-lg flex items-center gap-1"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{currentView === 'home' ? 'Admin' : 'Home'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-slate-900 border-b border-slate-800 text-sm">
          {currentView === 'home' && (
            <>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-slate-300 hover:text-cyan-400"
              >
                Commercial Services
              </a>
              <a
                href="#courses"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-slate-300 hover:text-cyan-400"
              >
                Pilot Courses & Training
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-slate-300 hover:text-cyan-400"
              >
                Contact & Enquiry Form
              </a>
            </>
          )}
          <button
            onClick={() => {
              onNavigate(currentView === 'home' ? 'admin' : 'home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-cyan-400 font-semibold flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{currentView === 'home' ? 'Switch to Admin Portal' : 'Return to Public Site'}</span>
          </button>
        </div>
      )}
    </nav>
  );
};
