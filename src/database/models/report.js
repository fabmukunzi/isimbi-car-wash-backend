'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    static associate(models) {
      // define association here
    }
  }
  Report.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    delivery_cost: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    attachments: DataTypes.ARRAY(DataTypes.STRING),
    report_date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};