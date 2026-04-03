import dashboardService from '../services/dashboardService.js';
import asyncHandler from 'express-async-handler';

// @desc    Get dashboard summary
// @route   GET /api/dashboard/summary
// @access  Private (Admin, Analyst)
const getDashboardSummary = asyncHandler(async (req, res) => {
  const summary = await dashboardService.getSummary();
  res.json(summary);
});

// @desc    Get category-wise totals
// @route   GET /api/dashboard/category
// @access  Private (Admin, Analyst)
const getDashboardCategoryTotals = asyncHandler(async (req, res) => {
  const totals = await dashboardService.getCategoryTotals();
  res.json(totals);
});

// @desc    Get monthly income vs expense trend
// @route   GET /api/dashboard/monthly
// @access  Private (Admin, Analyst)
const getDashboardMonthlyTrend = asyncHandler(async (req, res) => {
  const trend = await dashboardService.getMonthlyTrend();
  res.json(trend);
});

export {
  getDashboardSummary,
  getDashboardCategoryTotals,
  getDashboardMonthlyTrend,
};
