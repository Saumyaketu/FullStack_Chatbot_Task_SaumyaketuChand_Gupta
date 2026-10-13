import React, { useState } from 'react';
import { ApiService } from '../../services/api';
import { UserType } from '../../types';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ChatLeadFormProps {
  defaultUserType?: UserType;
  defaultService?: string;
  onSuccessSubmitted: (name: string) => void;
}

export const ChatLeadForm: React.FC<ChatLeadFormProps> = ({
  defaultUserType = 'Student',
  defaultService = 'DGCA Remote Pilot Certification (RPC)',
  onSuccessSubmitted,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState<UserType>(defaultUserType);
  const [serviceOrCourse, setServiceOrCourse] = useState(defaultService);
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!name.trim()) {
      setError('Please provide your full name');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide a valid email address');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      setError('Please enter a valid phone number with at least 8 digits');
      return;
    }
    if (!serviceOrCourse.trim()) {
      setError('Please select or specify a service or course');
      return;
    }

    try {
      setLoading(true);
      await ApiService.createEnquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        userType,
        serviceOrCourse: serviceOrCourse.trim(),
        message: message.trim() || `Submitted via Chatbot quick inquiry for ${serviceOrCourse}`,
        source: 'Chatbot',
      });

      setSubmitted(true);
      onSuccessSubmitted(name.trim());
    } catch (err: any) {
      setError(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-950 border border-emerald-800 rounded-lg p-3.5 text-emerald-300 text-xs flex items-start gap-2.5 my-2">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-emerald-200 text-sm">Enquiry Received!</p>
          <p className="mt-0.5">Thank you, {name}! Our team will contact you at {phone} within 2 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-3.5 my-2 text-slate-200">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
          Quick Lead & Callback Form
        </span>
        <span className="text-[10px] bg-slate-950 text-cyan-300 px-1.5 py-0.5 rounded border border-slate-800">
          Fast Track
        </span>
      </div>

      {error && (
        <div className="bg-rose-950 border border-rose-800 text-rose-300 text-xs p-2 rounded mb-2 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2 text-xs">
        <div>
          <label className="block text-slate-400 mb-1">Full Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rahul Sharma"
            className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-slate-400 mb-1">Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rahul@domain.com"
              className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Phone *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-slate-400 mb-1">I Am A *</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value as UserType)}
              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-slate-100 focus:outline-none focus:border-cyan-500"
            >
              <option value="Student">Student / Aspirant</option>
              <option value="Customer">Commercial Client</option>
              <option value="Other">Other / Partner</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Interest *</label>
            <select
              value={serviceOrCourse}
              onChange={(e) => setServiceOrCourse(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-slate-100 focus:outline-none focus:border-cyan-500 text-[11px]"
            >
              <option value="DGCA Remote Pilot Certification (RPC)">DGCA Pilot Certification</option>
              <option value="Aerial Surveying & 3D Mapping">Aerial Surveying & Mapping</option>
              <option value="Precision Agriculture Spraying">Agriculture Spraying</option>
              <option value="Industrial Asset Inspection">Thermal / Asset Inspection</option>
              <option value="High-Resolution Aerial Cinematography">Aerial Cinematography</option>
              <option value="Advanced Photogrammetry Training">Mapping Training</option>
              <option value="General Consultation">Other Inquiry</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Note / Requirements (Optional)</label>
          <textarea
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your project or preferred batch dates..."
            className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 rounded flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Submitting Enquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Submit & Request Callback</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
