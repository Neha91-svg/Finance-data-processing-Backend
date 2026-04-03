import Transaction from '../models/Transaction.js';

const createTransaction = async (data, userId) => {
  return await Transaction.create({
    ...data,
    createdBy: userId,
  });
};

const getTransactions = async (filters, pagination, user) => {
  const { type, category } = filters;
  const { page = 1, limit = 10 } = pagination;

  const query = { isDeleted: false };
  
  // RBAC: Viewers can only see their own transactions
  if (user.role === 'viewer') {
    query.createdBy = user._id;
  }
  
  if (type) query.type = type;
  if (category) query.category = category;

  const skip = (page - 1) * limit;

  const transactions = await Transaction.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('createdBy', 'name email');

  const total = await Transaction.countDocuments(query);

  return {
    transactions,
    page: Number(page),
    limit: Number(limit),
    total,
    pages: Math.ceil(total / limit),
  };
};

const getTransactionById = async (id, user) => {
  const query = { _id: id, isDeleted: false };
  
  // RBAC: Viewers can only see their own transaction
  if (user.role === 'viewer') {
    query.createdBy = user._id;
  }

  return await Transaction.findOne(query).populate('createdBy', 'name email');
};

const updateTransaction = async (id, data) => {
  return await Transaction.findByIdAndUpdate(id, data, { new: true });
};

const softDeleteTransaction = async (id) => {
  return await Transaction.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

export default {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  softDeleteTransaction,
};
