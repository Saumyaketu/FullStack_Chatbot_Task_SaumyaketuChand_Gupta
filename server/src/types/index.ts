export type UserType = 'Student' | 'Customer' | 'Other';
export type EnquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Closed';
export type EnquirySource = 'Chatbot' | 'Contact Form';

export interface IEnquiryData {
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  serviceOrCourse: string;
  message: string;
  status: EnquiryStatus;
  source: EnquirySource;
  adminNotes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
