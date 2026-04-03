import transactionService from '../services/transactionService.js';
import asyncHandler from 'express-async-handler';

// @desc    Create a new transaction
// @route   POST /api/transactions
// @access  Private/Admin
const createTransaction = asyncHandler(async (req, res) => {
  const transaction = await transactionService.createTransaction(req.body, req.user._id);
  res.status(201).json(transaction);
});

// @desc    Get all transactions (with filters and pagination)
// @route   GET /api/transactions
// @access  Private (Admin, Analyst, Viewer)
const getTransactions = asyncHandler(async (req, res) => {
  const { type, category, page, limit } = req.query;
  const result = await transactionService.getTransactions({ type, category }, { page, limit }, req.user);
  res.json(result);
});

// @desc    Get single transaction by ID
// @route   GET /api/transactions/:id
// @access  Private (Admin, Analyst, Viewer)
const getTransactionById = asyncHandler(async (req, res) => {
  const transaction = await transactionService.getTransactionById(req.params.id, req.user);
  if (transaction) {
    res.json(transaction);
  } else {
    res.status(404).send('Transaction not found or already deleted');
  }
});

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private/Admin
const updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await transactionService.updateTransaction(req.params.id, req.body);
  if (transaction) {
    res.json(transaction);
  } else {
    res.status(404).send('Transaction not found');
  }
});

// @desc    Soft delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private/Admin
const deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await transactionService.softDeleteTransaction(req.params.id);
  if (transaction) {
    res.json({ message: 'Transaction soft deleted successfully', transaction });
  } else {
    res.status(404).send('Transaction not found');
  }
});

export {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
