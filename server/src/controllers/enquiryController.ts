import { Request, Response, NextFunction } from 'express';
import { EnquiryService } from '../services/enquiryService';

export class EnquiryController {
  /**
   * GET /api/enquiries
   * Retrieve all enquiries with query filtering and search
   */
  static async getAllEnquiries(req: Request, res: Response, next: NextFunction) {
    try {
      const { search, userType, status, page, limit } = req.query;

      const result = await EnquiryService.getAll({
        search: typeof search === 'string' ? search : undefined,
        userType: typeof userType === 'string' ? userType : undefined,
        status: typeof status === 'string' ? status : undefined,
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 50,
      });

      return res.status(200).json({
        success: true,
        count: result.data.length,
        total: result.total,
        page: result.page,
        limit: result.limit,
        data: result.data,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/enquiries/:id
   * Retrieve single enquiry by ID
   */
  static async getEnquiryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const enquiry = await EnquiryService.getById(id);

      if (!enquiry) {
        return res.status(404).json({
          success: false,
          message: `Enquiry with ID "${id}" does not exist.`,
        });
      }

      return res.status(200).json({
        success: true,
        data: enquiry,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/enquiries
   * Create new enquiry from contact form or chatbot
   */
  static async createEnquiry(req: Request, res: Response, next: NextFunction) {
    try {
      const enquiry = await EnquiryService.create(req.body);

      return res.status(201).json({
        success: true,
        message: 'Your enquiry has been received successfully! Our team will contact you shortly.',
        data: enquiry,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT / PATCH /api/enquiries/:id
   * Update enquiry status or notes
   */
  static async updateEnquiry(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updated = await EnquiryService.update(id, req.body);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: `Cannot update. Enquiry with ID "${id}" was not found.`,
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Enquiry updated successfully.',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/enquiries/:id
   * Remove enquiry
   */
  static async deleteEnquiry(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleted = await EnquiryService.delete(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: `Cannot delete. Enquiry with ID "${id}" was not found.`,
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Enquiry deleted successfully.',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/enquiries/stats
   * Retrieve aggregate stats for the Admin Dashboard
   */
  static async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await EnquiryService.getStats();

      return res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }
}
