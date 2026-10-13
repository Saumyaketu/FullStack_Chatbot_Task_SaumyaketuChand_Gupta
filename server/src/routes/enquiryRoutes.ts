import { Router } from 'express';
import { EnquiryController } from '../controllers/enquiryController';
import {
  validateCreateEnquiry,
  validateUpdateEnquiry,
} from '../middleware/validationMiddleware';

const router = Router();

// Stats aggregation endpoint for dashboard
router.get('/stats', EnquiryController.getStats);

// Main CRUD endpoints
router.get('/', EnquiryController.getAllEnquiries);
router.get('/:id', EnquiryController.getEnquiryById);
router.post('/', validateCreateEnquiry, EnquiryController.createEnquiry);
router.put('/:id', validateUpdateEnquiry, EnquiryController.updateEnquiry);
router.patch('/:id', validateUpdateEnquiry, EnquiryController.updateEnquiry);
router.delete('/:id', EnquiryController.deleteEnquiry);

export default router;
