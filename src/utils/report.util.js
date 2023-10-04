export const extractWeeklyReport = (data) => {
  let weeklyData = [];
  const today = new Date();
  for (let i = 1; i <= 4; i++) {
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - i * 7);
    const endDate = new Date(today);
    endDate.setDate(today.getDate() - i * 7 + 6);

    const totalIncome = data.reduce((total, report) => {
      const reportDate = new Date(report.report_date);
      if (reportDate >= startDate && reportDate <= endDate) {
        return total + (report.quantity * report.price + report.delivery_cost);
      }
      return total;
    }, 0);
    weeklyData.push(totalIncome);
  }
  return weeklyData;
};
