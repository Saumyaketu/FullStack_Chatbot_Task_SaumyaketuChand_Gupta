export type UserType = 'Student' | 'Customer' | 'Other';
export type EnquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Closed';
export type EnquirySource = 'Chatbot' | 'Contact Form';

export interface Enquiry {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  serviceOrCourse: string;
  message: string;
  status: EnquiryStatus;
  source: EnquirySource;
  adminNotes?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface EnquiryInput {
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  serviceOrCourse: string;
  message: string;
  source?: EnquirySource;
}

export interface DashboardStats {
  total: number;
  new: number;
  contacted: number;
  inProgress: number;
  closed: number;
  students: number;
  customers: number;
  others: number;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  showLeadForm?: boolean;
  preselectedUserType?: UserType;
  preselectedService?: string;
}
