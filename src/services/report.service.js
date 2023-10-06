import { Report,Income } from '../database/models/index.js';

export class ReportService {
  static async createReport(report) {
    return Report.create(report);
  }
  static async createIncome(report) {
    return Income.create(report);
  }
  static async getExpenses(query) {
    return Report.findAll(query);
  }
  static async getIncomes(query) {
    return Income.findAll(query);
  }
}
