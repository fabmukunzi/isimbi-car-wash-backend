import { Op } from 'sequelize';
import { ReportService } from '../services/report.service';
import { extractWeeklyReport, groupByCategory } from '../utils/report.util';

export const expenseReport = async (req, res) => {
  try {
    const Ireport = { ...req.body };
    const expense = await ReportService.createReport(Ireport);
    res.status(201).json({ message: 'Report created successfully', expense });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Failed to create a report',
    });
  }
};

export const incomeReport = async (req, res) => {
  try {
    const Ireport = { ...req.body };
    const income = await ReportService.createIncome(Ireport);
    res.status(201).json({ message: 'Report created successfully', income });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Failed to create a report',
    });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    let query;
    if (start_date && end_date)
      query = {
        where: {
          report_date: {
            [Op.between]: [start_date, end_date],
          },
        },
      };
    const reports = await ReportService.getExpenses(query);
    res
      .status(200)
      .json({ message: 'Expenses retrieved successfully', reports });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Failed to fetch Expenses',
    });
  }
};
export const getIncomes = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    let query;
    if (start_date && end_date)
      query = {
        where: {
          report_date: {
            [Op.between]: [start_date, end_date],
          },
        },
      };
    const reports = await ReportService.getIncomes(query);
    res
      .status(200)
      .json({ message: 'Incomes retrieved successfully', reports });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Failed to fetch Incomes',
    });
  }
};
export const analytics = async (req, res) => {
  try {
    const incomes = await ReportService.getIncomes();
    const weeklyIncome = extractWeeklyReport(incomes);
    const expenses = await ReportService.getExpenses();
    const weeklyExpenses = extractWeeklyReport(expenses);
    const weeklyProfit = [];
    for (let i = 0; i < 4; i++)
      weeklyProfit.push(weeklyIncome[i] - weeklyExpenses[i]);
    const weeklyPerformanceOverview = [];
    for (let i = 0; i < 4; i++) {
      const weekLabel = `week ${4 - i}`;
      weeklyPerformanceOverview.push({
        name: weekLabel,
        income: weeklyIncome[i],
        expenses: weeklyExpenses[i],
        profit: weeklyProfit[i],
      });
    }
    const og = weeklyPerformanceOverview.reverse();
    const groupedByCategory = groupByCategory(expenses);
    res.status(200).json({
      message: 'Report retrieved successfully',
      weeklyPerformanceOverview: og,
      weeklyExpenses,
      groupedByCategory,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Failed to fetch reports',
    });
  }
};
