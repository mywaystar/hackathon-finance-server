
"use strict";

const Sequelize = require("sequelize");

module.exports = {
  model: {
    account_id: {
      type: Sequelize.INTEGER,
      field: "ClientId",
      primaryKey: true
    },

    email: {
      type: Sequelize.STRING,
      field: "Email"
    },

    password: {
      type: Sequelize.STRING,
      field: "Password"
    },

    last_name: {
      type: Sequelize.STRING,
      field: "Lastname"
    },

    first_name: {
      type: Sequelize.STRING,
      field: "Firstname"
    },

    sex: {
      type: Sequelize.STRING,
      field: "Sex"
    },

    birthdate: {
      type: Sequelize.STRING,
      field: "Birthdate"
    },
    type: {
      type: Sequelize.STRING,
      field: "Type"
    },

    jod: {
      type: Sequelize.STRING,
      field: "Job"
    },

    company: {
      type: Sequelize.STRING,
      field: "Company"
    },
    children: {
      type: Sequelize.STRING,
      field: "Children"
    },
    region: {
      type: Sequelize.STRING,
      field: "Region"
    },
    profile: {
      type: Sequelize.STRING,
      field: "Profile"
    },
    contract_data: {
      type: Sequelize.STRING,
      field: "ContractData"
    },
  },
  config: {
    freezeTableName: true,
    createdAt: false,
    deletedAt: false,
    updatedAt: false
  }
};
