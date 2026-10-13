import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: `Resource not found at endpoint: ${req.method} ${req.originalUrl}`,
  });
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const isDev = process.env.NODE_ENV === 'development';

  // Log error internally on server
  console.error(`[Server Error] [${req.method} ${req.url}]:`, err);

  // Friendly, sanitized message for client
  const clientResponse: any = {
    success: false,
    message:
      statusCode === 500
        ? 'An unexpected internal server error occurred. Our team has been notified.'
        : err.message || 'Operation failed.',
  };

  if (isDev && statusCode !== 500) {
    clientResponse.details = err.message;
  }

  res.status(statusCode).json(clientResponse);
};
