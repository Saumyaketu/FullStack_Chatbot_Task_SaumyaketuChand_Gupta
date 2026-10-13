import React, { useState, useEffect } from 'react';
import { ApiService } from '../../services/api';
import { DashboardStats, Enquiry, EnquiryStatus } from '../../types';
import {
  Search,
  Filter,
  Trash2,
  Eye,
  RefreshCw,
  Download,
  AlertTriangle,
  X,
  FileText,
  MessageSquare,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserType, setSelectedUserType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Modal states
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [enquiryToDelete, setEnquiryToDelete] = useState<Enquiry | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [adminNotesDraft, setAdminNotesDraft] = useState('');

  // Fetch data
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [enquiriesRes, statsRes] = await Promise.all([
        ApiService.getEnquiries({
          search: searchTerm,
          userType: selectedUserType,
          status: selectedStatus,
        }),
        ApiService.getStats(),
      ]);

      setEnquiries(enquiriesRes.data);
      setStats(statsRes);
    } catch (err: any) {
      setError(err.message || 'Failed to load enquiries from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedUserType, selectedStatus]);

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      loadData();
    }, 350);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Handle status update
  const handleStatusChange = async (enquiryId: string, newStatus: EnquiryStatus) => {
    try {
      setUpdatingId(enquiryId);
      await ApiService.updateEnquiry(enquiryId, { status: newStatus });

      setEnquiries((prev) =>
        prev.map((item) =>
          item._id === enquiryId || item.id === enquiryId ? { ...item, status: newStatus } : item
        )
      );

      if (selectedEnquiry && (selectedEnquiry._id === enquiryId || selectedEnquiry.id === enquiryId)) {
        setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }

      // Refresh stats
      const newStats = await ApiService.getStats();
      setStats(newStats);
    } catch (err: any) {
      alert(`Error updating status: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Handle save admin notes in modal
  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    const targetId = selectedEnquiry._id || selectedEnquiry.id || '';
    try {
      setUpdatingId(targetId);
      await ApiService.updateEnquiry(targetId, {
        adminNotes: adminNotesDraft,
      });

      setEnquiries((prev) =>
        prev.map((item) =>
          item._id === targetId || item.id === targetId
            ? { ...item, adminNotes: adminNotesDraft }
            : item
        )
      );
      setSelectedEnquiry((prev) => (prev ? { ...prev, adminNotes: adminNotesDraft } : null));
      alert('Admin notes updated successfully.');
    } catch (err: any) {
      alert(`Failed to save notes: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Handle Delete
  const confirmDelete = async () => {
    if (!enquiryToDelete) return;
    const targetId = enquiryToDelete._id || enquiryToDelete.id || '';

    try {
      setIsDeleting(true);
      await ApiService.deleteEnquiry(targetId);

      setEnquiries((prev) => prev.filter((i) => i._id !== targetId && i.id !== targetId));
      if (selectedEnquiry && (selectedEnquiry._id === targetId || selectedEnquiry.id === targetId)) {
        setSelectedEnquiry(null);
      }

      // Refresh stats
      const newStats = await ApiService.getStats();
      setStats(newStats);
      setEnquiryToDelete(null);
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (enquiries.length === 0) {
      alert('No enquiries to export.');
      return;
    }

    const headers = [
      'ID',
      'Name',
      'Email',
      'Phone',
      'User Type',
      'Service/Course',
      'Status',
      'Source',
      'Message',
      'Created At',
    ];

    const rows = enquiries.map((e) => [
      e._id || e.id || '',
      `"${e.name.replace(/"/g, '""')}"`,
      e.email,
      e.phone,
      e.userType,
      `"${e.serviceOrCourse.replace(/"/g, '""')}"`,
      e.status,
      e.source,
      `"${e.message.replace(/"/g, '""')}"`,
      new Date(e.createdAt).toISOString(),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DroneTV_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper for Status Badge styling (Solid Opaque Badges)
  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'New':
        return 'bg-slate-950 text-amber-400 border-amber-600';
      case 'Contacted':
        return 'bg-slate-950 text-blue-400 border-blue-600';
      case 'In Progress':
        return 'bg-slate-950 text-purple-400 border-purple-600';
      case 'Closed':
        return 'bg-slate-950 text-emerald-400 border-emerald-600';
      default:
        return 'bg-slate-950 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                DroneTV Enquiries & Lead Portal
              </h1>
              <span className="text-xs bg-slate-900 text-cyan-400 border border-slate-700 px-2 py-0.5 rounded font-mono">
                Admin v1.0
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Live management dashboard for customer enquiries, DGCA admissions, and status updates.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={loadData}
              disabled={loading}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Metric Cards Overview - Solid Surface */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <span className="text-xs text-slate-400 block font-medium">Total Enquiries</span>
              <p className="text-2xl font-bold text-white mt-1 font-display">{stats.total}</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <span className="text-xs text-amber-400 block font-medium">New Leads</span>
              <p className="text-2xl font-bold text-amber-400 mt-1 font-display">{stats.new}</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <span className="text-xs text-blue-400 block font-medium">Contacted</span>
              <p className="text-2xl font-bold text-blue-400 mt-1 font-display">{stats.contacted}</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <span className="text-xs text-purple-400 block font-medium">In Progress</span>
              <p className="text-2xl font-bold text-purple-400 mt-1 font-display">{stats.inProgress}</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <span className="text-xs text-emerald-400 block font-medium">Closed / Won</span>
              <p className="text-2xl font-bold text-emerald-400 mt-1 font-display">{stats.closed}</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <span className="text-xs text-cyan-400 block font-medium">Students / Clients</span>
              <p className="text-lg font-bold text-white mt-1">
                <span className="text-cyan-400">{stats.students}</span> /{' '}
                <span className="text-blue-400">{stats.customers}</span>
              </p>
            </div>
          </div>
        )}

        {/* Toolbar: Search & Filters - Solid Surface */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, service..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <span>Filters:</span>
            </div>

            {/* Filter by User Type */}
            <select
              value={selectedUserType}
              onChange={(e) => setSelectedUserType(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All User Types</option>
              <option value="Student">Students Only</option>
              <option value="Customer">Commercial Customers</option>
              <option value="Other">Other</option>
            </select>

            {/* Filter by Status */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Statuses</option>
              <option value="New">Status: New</option>
              <option value="Contacted">Status: Contacted</option>
              <option value="In Progress">Status: In Progress</option>
              <option value="Closed">Status: Closed</option>
            </select>
          </div>
        </div>

        {/* Enquiries Table - Solid Surface */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Lead Contact</th>
                  <th className="py-3.5 px-4 font-semibold">Type</th>
                  <th className="py-3.5 px-4 font-semibold">Interest & Service</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Source / Date</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {loading && enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400 text-xs">
                      <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-cyan-400" />
                      Loading enquiries from database...
                    </td>
                  </tr>
                ) : enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400 text-xs">
                      No enquiries matched your filter or search query.
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enquiry) => {
                    const id = enquiry._id || enquiry.id || '';
                    return (
                      <tr
                        key={id}
                        className="hover:bg-slate-800 transition-colors"
                      >
                        {/* Contact info */}
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-white">
                            {enquiry.name}
                          </p>
                          <div className="flex items-center gap-2 text-slate-400 text-xs mt-0.5">
                            <span>{enquiry.email}</span>
                            <span>•</span>
                            <span className="font-mono text-cyan-400">{enquiry.phone}</span>
                          </div>
                        </td>

                        {/* User Type Badge */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded text-xs font-medium border ${
                              enquiry.userType === 'Student'
                                ? 'bg-slate-950 text-cyan-400 border-cyan-800'
                                : enquiry.userType === 'Customer'
                                ? 'bg-slate-950 text-indigo-400 border-indigo-800'
                                : 'bg-slate-950 text-slate-300 border-slate-700'
                            }`}
                          >
                            {enquiry.userType}
                          </span>
                        </td>

                        {/* Service / Course */}
                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="font-medium text-slate-200 truncate">
                            {enquiry.serviceOrCourse}
                          </p>
                          <p className="text-slate-400 text-xs line-clamp-1 mt-0.5">
                            {enquiry.message}
                          </p>
                        </td>

                        {/* Status change dropdown */}
                        <td className="py-3.5 px-4">
                          <select
                            value={enquiry.status}
                            disabled={updatingId === id}
                            onChange={(e) =>
                              handleStatusChange(id, e.target.value as EnquiryStatus)
                            }
                            className={`px-2.5 py-1 rounded text-xs font-semibold border cursor-pointer focus:outline-none transition-colors ${getStatusBadge(
                              enquiry.status
                            )}`}
                          >
                            <option value="New" className="bg-slate-900 text-amber-400">
                              New
                            </option>
                            <option value="Contacted" className="bg-slate-900 text-blue-400">
                              Contacted
                            </option>
                            <option value="In Progress" className="bg-slate-900 text-purple-400">
                              In Progress
                            </option>
                            <option value="Closed" className="bg-slate-900 text-emerald-400">
                              Closed
                            </option>
                          </select>
                        </td>

                        {/* Source / Date */}
                        <td className="py-3.5 px-4 text-xs text-slate-400">
                          <div className="flex items-center gap-1.5">
                            {enquiry.source === 'Chatbot' ? (
                              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                            ) : (
                              <FileText className="w-3.5 h-3.5 text-blue-400" />
                            )}
                            <span className="font-medium text-slate-300">{enquiry.source}</span>
                          </div>
                          <span className="text-[11px] text-slate-500 mt-0.5 block">
                            {new Date(enquiry.createdAt).toLocaleDateString([], {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </td>

                        {/* Action buttons */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedEnquiry(enquiry);
                                setAdminNotesDraft(enquiry.adminNotes || '');
                              }}
                              title="View Full Details"
                              className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEnquiryToDelete(enquiry)}
                              title="Delete Enquiry"
                              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: View Full Enquiry Details - Solid Overlay (No Blur) */}
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
            <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-xl p-6 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Enquiry Dossier</h3>
                    <p className="text-[11px] text-slate-400 font-mono">
                      ID: {selectedEnquiry._id || selectedEnquiry.id}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3.5 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Candidate / Company</span>
                    <span className="font-bold text-white text-sm">{selectedEnquiry.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">User Classification</span>
                    <span className="font-semibold text-cyan-400">{selectedEnquiry.userType}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Email</span>
                    <span className="text-slate-300">{selectedEnquiry.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Phone</span>
                    <span className="text-slate-300 font-mono">{selectedEnquiry.phone}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 text-xs font-semibold block mb-1">
                    Interest / Programme:
                  </span>
                  <p className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 font-medium">
                    {selectedEnquiry.serviceOrCourse}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 text-xs font-semibold block mb-1">
                    Full Enquiry Message:
                  </span>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed text-xs">
                    {selectedEnquiry.message}
                  </div>
                </div>

                {/* Status Switcher inside Modal */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 text-xs font-semibold block mb-1">
                      Current Status:
                    </span>
                    <select
                      value={selectedEnquiry.status}
                      onChange={(e) =>
                        handleStatusChange(
                          selectedEnquiry._id || selectedEnquiry.id || '',
                          e.target.value as EnquiryStatus
                        )
                      }
                      className={`w-full px-3 py-2 rounded-lg text-xs font-semibold border ${getStatusBadge(
                        selectedEnquiry.status
                      )}`}
                    >
                      <option value="New" className="bg-slate-900 text-amber-400">
                        New
                      </option>
                      <option value="Contacted" className="bg-slate-900 text-blue-400">
                        Contacted
                      </option>
                      <option value="In Progress" className="bg-slate-900 text-purple-400">
                        In Progress
                      </option>
                      <option value="Closed" className="bg-slate-900 text-emerald-400">
                        Closed
                      </option>
                    </select>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs font-semibold block mb-1">
                      Origin Channel:
                    </span>
                    <div className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs">
                      {selectedEnquiry.source} (Logged at {new Date(selectedEnquiry.createdAt).toLocaleTimeString()})
                    </div>
                  </div>
                </div>

                {/* Admin Internal Notes Editor */}
                <div>
                  <span className="text-slate-400 text-xs font-semibold block mb-1">
                    Internal Follow-up Notes:
                  </span>
                  <textarea
                    rows={2}
                    value={adminNotesDraft}
                    onChange={(e) => setAdminNotesDraft(e.target.value)}
                    placeholder="e.g. Called candidate; confirmed for next Saturday batch..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleSaveNotes}
                      className="bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 px-3 py-1.5 rounded text-xs font-semibold transition-colors"
                    >
                      Save Internal Notes
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Confirm Delete - Solid Overlay (No Blur) */}
        {enquiryToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
            <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-rose-400 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Confirm Record Deletion</h3>
                  <p className="text-xs text-slate-400">This action cannot be undone.</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Are you sure you want to permanently remove the enquiry from{' '}
                <strong className="text-white">{enquiryToDelete.name}</strong> (
                {enquiryToDelete.email})?
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setEnquiryToDelete(null)}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition-colors flex items-center gap-1.5"
                >
                  {isDeleting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Permanently Delete</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
