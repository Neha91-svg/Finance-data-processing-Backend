import express from 'express';
import { check } from 'express-validator';
import {
  registerUser,
  authUser,
  getUsers,
  updateUserRole,
  updateUserStatus,
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import validate from '../middleware/validation.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// Validation Rules
const registerValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  validate,
];

const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  validate,
];

// Public routes
router.post('/', registerValidation, asyncHandler(registerUser));
router.post('/login', loginValidation, asyncHandler(authUser));

// Admin only routes
router.route('/')
  .get(protect, authorize('admin'), asyncHandler(getUsers));

router.put('/:id/role', protect, authorize('admin'), asyncHandler(updateUserRole));
router.put('/:id/status', protect, authorize('admin'), asyncHandler(updateUserStatus));

export default router;
