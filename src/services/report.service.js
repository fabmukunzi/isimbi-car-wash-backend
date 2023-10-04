import { Report } from '../database/models/index.js';

export class ReportService {
  static async createReport(report) {
    return Report.create(report);
  }
  static async createReport(report) {
    return Report.create(report);
  }
  static async getReports(query) {
    return Report.findAll(query);
  }
}
