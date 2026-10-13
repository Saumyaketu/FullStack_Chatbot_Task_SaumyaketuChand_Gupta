import { DashboardStats, Enquiry, EnquiryInput, EnquiryStatus } from '../types';

const API_BASE = '/api';

export class ApiService {
  /**
   * Fetch enquiries with search and filters
   */
  static async getEnquiries(params?: {
    search?: string;
    userType?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Enquiry[]; total: number; count: number }> {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.userType && params.userType !== 'All') query.append('userType', params.userType);
    if (params?.status && params.status !== 'All') query.append('status', params.status);
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());

    const res = await fetch(`${API_BASE}/enquiries?${query.toString()}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to fetch enquiries (HTTP ${res.status})`);
    }
    const json = await res.json();
    return json;
  }

  /**
   * Fetch single enquiry by ID
   */
  static async getEnquiryById(id: string): Promise<Enquiry> {
    const res = await fetch(`${API_BASE}/enquiries/${id}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Enquiry not found');
    }
    const json = await res.json();
    return json.data;
  }

  /**
   * Submit new enquiry (Lead Form or Chatbot)
   */
  static async createEnquiry(payload: EnquiryInput): Promise<{ message: string; data: Enquiry }> {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      if (json.errors && Array.isArray(json.errors)) {
        const fieldIssues = json.errors.map((e: any) => `${e.field}: ${e.message}`).join(', ');
        throw new Error(fieldIssues || json.message || 'Validation failed');
      }
      throw new Error(json.message || 'Failed to submit enquiry');
    }

    return json;
  }

  /**
   * Update enquiry status or admin notes
   */
  static async updateEnquiry(
    id: string,
    payload: { status?: EnquiryStatus; adminNotes?: string }
  ): Promise<Enquiry> {
    const res = await fetch(`${API_BASE}/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(json.message || 'Failed to update enquiry');
    }
    return json.data;
  }

  /**
   * Delete an enquiry
   */
  static async deleteEnquiry(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/enquiries/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.message || 'Failed to delete enquiry');
    }
  }

  /**
   * Fetch aggregate statistics
   */
  static async getStats(): Promise<DashboardStats> {
    const res = await fetch(`${API_BASE}/enquiries/stats`);
    if (!res.ok) {
      throw new Error('Failed to load dashboard statistics');
    }
    const json = await res.json();
    return json.data;
  }
}
