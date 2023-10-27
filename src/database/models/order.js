"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "customerId" });
    }
  }
  Report.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      customerId: {
        type: DataTypes.UUID,
        references: { model: "User", key: "id" },
      },
      washerId: {
        type: DataTypes.UUID,
        references: { model: "User", key: "id" },
      },
      scheduledTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      address: DataTypes.JSONB,
      carModel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      carPlate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      serviceType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
      feedback: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      washerStatus: {
        type: DataTypes.ENUM("progress", "arrived", "washing"),
        defaultValue: "progress",
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Report;
};
