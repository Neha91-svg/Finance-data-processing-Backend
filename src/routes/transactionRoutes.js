import express from 'express';
import { check } from 'express-validator';
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transactionController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import validate from '../middleware/validation.js';

const router = express.Router();

// Validation Rules
const transactionValidation = [
  check('amount', 'Amount is required and must be a positive number').isFloat({ min: 0.01 }),
  check('type', 'Type must be income or expense').isIn(['income', 'expense']),
  check('category', 'Category is required').not().isEmpty(),
  validate,
];

// Apply protection to all transaction routes
router.use(protect);

router.route('/')
  .post(authorize('admin'), transactionValidation, createTransaction)
  .get(authorize('admin', 'analyst', 'viewer'), getTransactions);

router.route('/:id')
  .get(authorize('admin', 'analyst', 'viewer'), getTransactionById)
  .put(authorize('admin'), transactionValidation, updateTransaction)
  .delete(authorize('admin'), deleteTransaction);

export default router;
