import mongoose, { Schema, Document, Model } from 'mongoose';
import { UserType, EnquiryStatus, EnquirySource } from '../types';

export interface IEnquiryDocument extends Document {
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  serviceOrCourse: string;
  message: string;
  status: EnquiryStatus;
  source: EnquirySource;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema: Schema<IEnquiryDocument> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address',
      ],
      index: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/,
        'Please enter a valid phone number (at least 8-15 digits)',
      ],
    },
    userType: {
      type: String,
      required: [true, 'User type is required'],
      enum: {
        values: ['Student', 'Customer', 'Other'],
        message: '{VALUE} is not a supported user type',
      },
      index: true,
    },
    serviceOrCourse: {
      type: String,
      required: [true, 'Service or course of interest is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ['New', 'Contacted', 'In Progress', 'Closed'],
        message: '{VALUE} is not a valid status',
      },
      default: 'New',
      index: true,
    },
    source: {
      type: String,
      required: true,
      enum: ['Chatbot', 'Contact Form'],
      default: 'Contact Form',
    },
    adminNotes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Text index for search queries
EnquirySchema.index({
  name: 'text',
  email: 'text',
  serviceOrCourse: 'text',
  message: 'text',
});

export const Enquiry: Model<IEnquiryDocument> = mongoose.model<IEnquiryDocument>(
  'Enquiry',
  EnquirySchema
);
