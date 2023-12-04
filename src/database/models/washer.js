"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Washer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Order, { foreignKey: "currentOrderId" });
    }
  }
  Washer.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      currentOrderId: {
        type: DataTypes.UUID,
        references: { model: "Order", key: "id" },
      },
      status: {
        type: DataTypes.ENUM("Available", "Unavailable"),
        defaultValue: "Unavailable",
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.JSONB,
      rating: DataTypes.INTEGER,
    },

    {
      sequelize,
      modelName: "Washer",
    }
  );
  return Washer;
};
