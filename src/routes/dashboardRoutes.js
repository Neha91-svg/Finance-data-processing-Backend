import express from 'express';
import {
  getDashboardSummary,
  getDashboardCategoryTotals,
  getDashboardMonthlyTrend,
} from '../controllers/dashboardController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protection and authorization to all dashboard routes
router.use(protect);
router.use(authorize('admin', 'analyst'));

router.get('/summary', getDashboardSummary);
router.get('/category', getDashboardCategoryTotals);
router.get('/monthly', getDashboardMonthlyTrend);

export default router;
