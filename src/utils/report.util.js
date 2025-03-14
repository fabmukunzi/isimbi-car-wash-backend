export const extractWeeklyReport = (data) => {
  let weeklyData = [];
  const today = new Date();

  for (let i = 0; i < 4; i++) {
    const endDate = new Date(today);
    endDate.setDate(today.getDate() - i * 7); // End date for the current week
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6); // Start date for the current week

    const totalIncome = data.reduce((total, report) => {
      const reportDate = new Date(report.report_date);
      if (reportDate >= startDate && reportDate <= endDate) {
        return total + (report.quantity * report.price + report.delivery_cost||report.amount);
      }
      return total;
    }, 0);

    weeklyData.push(totalIncome);
  }

  return weeklyData;
};

export const groupByCategory = (data) => {
  const groupedData = data.reduce((accumulator, item) => {
    const { category, price, quantity,delivery_cost } = item;
    const amount = (price * quantity+delivery_cost);
    if (!accumulator[category]) {
      accumulator[category] = 0;
    }
    accumulator[category] += amount;
    return accumulator;
  }, {});

  const result = Object.entries(groupedData).map(([category, totalAmount]) => ({
    name: category,
    value: totalAmount,
  }));

  return result;
};
