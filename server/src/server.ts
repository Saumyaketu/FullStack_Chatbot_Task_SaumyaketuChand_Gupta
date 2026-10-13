import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { connectDB } from './config/db';
import { EnquiryService } from './services/enquiryService';
import enquiryRoutes from './routes/enquiryRoutes';
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware';

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Security Middleware: Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows flexible integration in dev
    crossOriginEmbedderPolicy: false,
  })
);

// CORS Configuration
app.use(
  cors({
    origin: [CLIENT_URL, 'http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Logging Middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Body Parser Middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Rate Limiter for Enquiry Creation & APIs
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP address, please try again after 15 minutes.',
  },
});
app.use('/api', apiLimiter);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'HEALTHY',
    service: 'DroneTV AI Support & Lead Assistant API',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
  });
});

// Primary Business Routes
app.use('/api/enquiries', enquiryRoutes);

// Error Handling Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server & Connect Database
const startServer = async () => {
  await connectDB();
  await EnquiryService.seedIfEmpty();

  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 DroneTV API Server is live on http://localhost:${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 API Base: http://localhost:${PORT}/api/enquiries`);
    console.log(`======================================================\n`);
  });
};

startServer();

export default app;
