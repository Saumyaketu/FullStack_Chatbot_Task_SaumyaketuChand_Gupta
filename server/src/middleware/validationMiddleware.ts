import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const createEnquirySchema = z.object({
  name: z
    .string({ required_error: 'Full name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  email: z
    .string({ required_error: 'Email address is required' })
    .trim()
    .email('Please provide a valid email address'),
  phone: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/,
      'Please provide a valid phone number (8 to 15 digits)'
    ),
  userType: z.enum(['Student', 'Customer', 'Other'], {
    errorMap: () => ({ message: 'User type must be Student, Customer, or Other' }),
  }),
  serviceOrCourse: z
    .string({ required_error: 'Service or course of interest is required' })
    .trim()
    .min(2, 'Please specify the service or course of interest'),
  message: z
    .string({ required_error: 'Message is required' })
    .trim()
    .min(2, 'Message must be at least 2 characters')
    .max(2000, 'Message cannot exceed 2000 characters'),
  source: z.enum(['Chatbot', 'Contact Form']).optional().default('Contact Form'),
  adminNotes: z.string().optional(),
});

export const updateEnquirySchema = z.object({
  status: z
    .enum(['New', 'Contacted', 'In Progress', 'Closed'], {
      errorMap: () => ({ message: 'Status must be New, Contacted, In Progress, or Closed' }),
    })
    .optional(),
  adminNotes: z.string().max(1000).optional(),
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(8).max(20).optional(),
  serviceOrCourse: z.string().min(2).optional(),
  message: z.string().min(2).max(2000).optional(),
});

export const validateCreateEnquiry = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = createEnquirySchema.safeParse(req.body);
  if (!result.success) {
    const errorDetails = result.error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please verify the submitted information.',
      errors: errorDetails,
    });
  }

  req.body = result.data;
  next();
};

export const validateUpdateEnquiry = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = updateEnquirySchema.safeParse(req.body);
  if (!result.success) {
    const errorDetails = result.error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please check your update values.',
      errors: errorDetails,
    });
  }

  req.body = result.data;
  next();
};
