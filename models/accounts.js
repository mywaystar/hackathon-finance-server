
"use strict";

const Sequelize = require("sequelize");

module.exports = {
  model: {
    account_id: {
      type: Sequelize.STRING,
      field: "AccountId",
      primaryKey: true
    },

    client_id: {
      type: Sequelize.INTEGER,
      field: "ClientId"
    },

    account_initial_date: {
      type: Sequelize.DATE,
      field: "AccountInitialDate"
    },

    account_initial_amount: {
      type: Sequelize.INTEGER,
      field: "AccountInitialAmount"
    },

    account_final_amount: {
      type: Sequelize.INTEGER,
      field: "AccountFinalAmount"
    },

    account_type: {
      type: Sequelize.STRING,
      field: "AccountType"
    },

    account_profile: {
      type: Sequelize.STRING,
      field: "AccountProfile"
    }
  },
  config: {
    freezeTableName: true,
    createdAt: false,
    deletedAt: false,
    updatedAt: false
  }
};
