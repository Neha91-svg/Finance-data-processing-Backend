import Transaction from '../models/Transaction.js';

const getSummary = async () => {
  const summary = await Transaction.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: '$type',
        total: { $sum: '$amount' },
      },
    },
  ]);

  const result = {
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0,
  };

  summary.forEach((item) => {
    if (item._id === 'income') {
      result.totalIncome = item.total;
    } else if (item._id === 'expense') {
      result.totalExpense = item.total;
    }
  });

  result.netBalance = result.totalIncome - result.totalExpense;

  return result;
};

const getCategoryTotals = async () => {
  return await Transaction.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: { category: '$category', type: '$type' },
        total: { $sum: '$amount' },
      },
    },
    {
      $project: {
        _id: 0,
        category: '$_id.category',
        type: '$_id.type',
        total: 1,
      },
    },
    { $sort: { total: -1 } },
  ]);
};

const getMonthlyTrend = async () => {
  return await Transaction.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
          type: '$type',
        },
        total: { $sum: '$amount' },
      },
    },
    {
      $project: {
        _id: 0,
        year: '$_id.year',
        month: '$_id.month',
        type: '$_id.type',
        total: 1,
      },
    },
    { $sort: { year: 1, month: 1 } },
  ]);
};

export default {
  getSummary,
  getCategoryTotals,
  getMonthlyTrend,
};
