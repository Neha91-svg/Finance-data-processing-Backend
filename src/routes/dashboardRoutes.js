import express from 'express';
import {
  getDashboardSummary,
  getDashboardCategoryTotals,
  getDashboardMonthlyTrend,
} from '../controllers/dashboardController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Analytical APIs for financial overview
 */

// Apply protection and authorization to all dashboard routes
router.use(protect);
router.use(authorize('admin', 'analyst'));

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total income, expense, and net balance
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Summary'
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Forbidden - Admin or Analyst only
 */
router.get('/summary', getDashboardSummary);

/**
 * @swagger
 * /api/dashboard/category:
 *   get:
 *     summary: Get category-wise totals
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category-wise spending/earning breakdown
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category: { type: 'string' }
 *                   type: { type: 'string' }
 *                   total: { type: 'number' }
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Forbidden - Admin or Analyst only
 */
router.get('/category', getDashboardCategoryTotals);

/**
 * @swagger
 * /api/dashboard/monthly:
 *   get:
 *     summary: Get monthly income vs expense trend
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly trend data for analytical charts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   year: { type: 'integer' }
 *                   month: { type: 'integer' }
 *                   type: { type: 'string' }
 *                   total: { type: 'number' }
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Forbidden - Admin or Analyst only
 */
router.get('/monthly', getDashboardMonthlyTrend);

export default router;
