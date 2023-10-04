import { Op } from 'sequelize';
import { ReportService } from '../services/report.service';
import { extractWeeklyReport } from '../utils/report.util';

export const report = async (req, res) => {
  try {
    const Ireport = { ...req.body };
    const report = await ReportService.createReport(Ireport);
    res.status(201).json({ message: 'Report created successfully', report });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Failed to create a report',
    });
  }
};

export const getReports = async (req, res) => {
  try {
    const { type, start_date, end_date } = req.query;
    let query = { where: { type: type } };
    if (start_date && end_date)
      query = {
        where: {
          type: type,
          report_date: {
            [Op.between]: [start_date, end_date],
          },
        },
      };
    const reports = await ReportService.getReports(query);
    res.status(200).json({ message: 'Report retrieved successfully', reports });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Failed to fetch reports',
    });
  }
};
export const analytics = async (req, res) => {
  try {
    const incomes = await ReportService.getReports({
      where: { type: 'income' },
    });
    const weeklyIncome = extractWeeklyReport(incomes);
    const expenses = await ReportService.getReports({
      where: { type: 'expense' },
    });
    const weeklyExpenses = extractWeeklyReport(expenses);
    const weeklyProfit = [];
    for (let i = 0; i < 4; i++)
      weeklyProfit.push(weeklyIncome[i] - weeklyExpenses[i]);
    const weeklyPerformanceOverview={}
    for(let i=0;i<4;i++){
        const weekLabel=`week ${4-(i)}`
        weeklyPerformanceOverview[weekLabel]={
            income:weeklyIncome[i],
            expenses:weeklyExpenses[i],
            profit:weeklyProfit[i]
        }
    }
    res.status(200).json({
      message: 'Report retrieved successfully',
      weeklyPerformanceOverview
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Failed to fetch reports',
    });
  }
};
