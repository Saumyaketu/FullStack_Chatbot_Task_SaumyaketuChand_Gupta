import React, { useState } from 'react';
import { ApiService } from '../services/api';
import { UserType } from '../types';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, Mail, MapPin } from 'lucide-react';

interface ContactSectionProps {
  selectedServiceOrCourse?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  selectedServiceOrCourse,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState<UserType>('Student');
  const [serviceOrCourse, setServiceOrCourse] = useState(
    selectedServiceOrCourse || 'DGCA Remote Pilot Certification (RPC)'
  );
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  React.useEffect(() => {
    if (selectedServiceOrCourse) {
      setServiceOrCourse(selectedServiceOrCourse);
    }
  }, [selectedServiceOrCourse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Client-side validations
    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage('Full name is required and must be at least 2 characters.');
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      setErrorMessage('Please enter a valid phone number with at least 8 digits.');
      return;
    }

    if (!message.trim() || message.trim().length < 5) {
      setErrorMessage('Please write a message or enquiry description of at least 5 characters.');
      return;
    }

    try {
      setLoading(true);
      await ApiService.createEnquiry({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        userType,
        serviceOrCourse: serviceOrCourse.trim(),
        message: message.trim(),
        source: 'Contact Form',
      });

      setSuccessMessage(
        `Thank you, ${name}! Your enquiry has been received. Our team will contact you shortly at ${phone}.`
      );

      // Reset fields
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while submitting your enquiry. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact details & information */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-slate-900 border border-slate-800 px-3 py-1 rounded">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display mt-3">
                Connect with the DroneTV Team
              </h2>
              <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
                Whether you need a commercial survey estimate or wish to enroll in DGCA pilot training, our advisors are here to guide you.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Call / WhatsApp</h4>
                  <p className="text-slate-400 text-xs mt-0.5">+91 98765 43210 / +91 80 4123 9900</p>
                  <p className="text-[11px] text-cyan-400 mt-1">Mon–Sat, 9:00 AM – 7:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Official Email</h4>
                  <p className="text-slate-400 text-xs mt-0.5">contact@dronetv.in / admissions@dronetv.in</p>
                  <p className="text-[11px] text-slate-500 mt-1">Response time within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Aviation Center & Flight Grounds</h4>
                  <p className="text-slate-400 text-xs mt-0.5">
                    DroneTV Innovation Park, Aerodrome Complex, Bangalore, KA 560064
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead / Enquiry Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 relative">
            <h3 className="text-xl font-bold text-white mb-1">
              Submit an Enquiry / Lead
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Fill out your details below and our technical coordinator will follow up immediately.
            </p>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="mb-6 p-3.5 bg-rose-950 border border-rose-800 rounded-lg text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-rose-200">Submission Error</p>
                  <p className="mt-0.5">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Success Message Alert */}
            {successMessage && (
              <div className="mb-6 p-4 bg-emerald-950 border border-emerald-800 rounded-lg text-emerald-300 text-xs flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-200 text-sm">Thank You!</p>
                  <p className="mt-0.5 text-slate-300">{successMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priyanshu Das"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priyanshu@example.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Phone Number <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    I Am A <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value as UserType)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="Student">Student (Seeking Pilot Training)</option>
                    <option value="Customer">Customer (Commercial Drone Service)</option>
                    <option value="Other">Other / Business Partner</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Service or Course of Interest <span className="text-rose-400">*</span>
                </label>
                <select
                  value={serviceOrCourse}
                  onChange={(e) => setServiceOrCourse(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <optgroup label="Pilot Academy Courses">
                    <option value="DGCA Remote Pilot Certification (RPC)">DGCA Remote Pilot Certification (RPC)</option>
                    <option value="Advanced Drone Mapping & Photogrammetry">Advanced Drone Mapping & Photogrammetry</option>
                    <option value="Agricultural Drone Operations & Spraying">Agricultural Drone Operations & Spraying</option>
                    <option value="Drone Assembly, Repair & Maintenance">Drone Assembly, Repair & Maintenance</option>
                  </optgroup>
                  <optgroup label="Commercial Drone Services">
                    <option value="Aerial Surveying & 3D Mapping">Aerial Surveying & 3D Mapping</option>
                    <option value="Industrial Asset & Thermal Inspection">Industrial Asset & Thermal Inspection</option>
                    <option value="Precision Agriculture Spraying">Precision Agriculture Spraying</option>
                    <option value="High-Resolution Aerial Cinematography">High-Resolution Aerial Cinematography</option>
                  </optgroup>
                  <optgroup label="Other Inquiries">
                    <option value="Custom Enterprise Solution">Custom Enterprise Solution</option>
                    <option value="General Consultation">General Consultation</option>
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Message / Project Details <span className="text-rose-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your project requirements, location, acreage, or questions about training schedules..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 px-6 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Enquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Enquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
