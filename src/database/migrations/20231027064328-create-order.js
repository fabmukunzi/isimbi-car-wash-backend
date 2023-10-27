"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      customerId: {
        type: Sequelize.UUID,
        references: {
          model: "User",
          key: "id",
        },
      },
      washerId: {
        type: Sequelize.UUID,
        references: {
          model: "User",
          key: "id",
        },
      },
      scheduledTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      address: Sequelize.JSONB,
      carModel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      carPlate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      serviceType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      time: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("pending", "completed", "cancelled"),
        defaultValue: "pending",
      },
      feedback: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.FLOAT,
      },
      washerStatus: {
        types: Sequelize.DataTypes.STRING,
        defaultValue: "progress",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
