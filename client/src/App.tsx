import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { CoursesSection } from './components/CoursesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ChatbotWidget } from './components/chatbot/ChatbotWidget';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'admin'>('home');
  const [selectedServiceOrCourse, setSelectedServiceOrCourse] = useState<string>('');

  const handleSelectService = (title: string) => {
    setSelectedServiceOrCourse(title);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCourse = (title: string) => {
    setSelectedServiceOrCourse(title);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' ? (
          <>
            <HeroSection />
            <ServicesSection onSelectService={handleSelectService} />
            <CoursesSection onSelectCourse={handleSelectCourse} />
            <ContactSection selectedServiceOrCourse={selectedServiceOrCourse} />
            <Footer onNavigateAdmin={() => setCurrentView('admin')} />
          </>
        ) : (
          <AdminDashboard />
        )}
      </main>

      {/* Persistent AI Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}

export default App;
