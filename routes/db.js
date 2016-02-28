
"use strict";

const Sequelize = require("sequelize");
const config = require("../config");

const init_config = (req, res, next) => {
  const sequelize = new Sequelize(
    config.mysql.database,
    config.mysql.username,
    config.mysql.password, {
    host: config.mysql.host,
    port: config.mysql.port,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    }
  });


  req.db = {};
  req.db.models = {};

  req.db.models.History = sequelize.define(
    "AccountsTrackRecordEvolution",  {
      account_id: {
        type: Sequelize.STRING,
        field: "AccountId",
      },

      date: {
        type: Sequelize.DATE,
        field: "Date",
        primaryKey: true,
      },

      account_amount: {
        type: Sequelize.DECIMAL,
        field: "AccountAmount"
      },

      account_bench: {
        type: Sequelize.DECIMAL,
        field: "BenchAmount"
      },

      daily_perf: {
        type: Sequelize.STRING,
        field: "AccountPerfDaily"
      },

      daily_bench: {
        type: Sequelize.STRING,
        field: "BenchPerfDaily"
      },

      daily_perf_differ: {
        type: Sequelize.STRING,
        field: "DiffPerfDaily"
      },
    }, {
      freezeTableName: true,
      createdAt: false,
      deletedAt: false,
      updatedAt: false
    });

  req.db.models.Account = sequelize.define(
    "Accounts",  {
      account_id: {
        type: Sequelize.STRING,
        field: "AccountId",
        primaryKey: true,
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
    }, {
      freezeTableName: true,
      createdAt: false,
      deletedAt: false,
      updatedAt: false
    });


    req.db.models.Client = sequelize.define(
      "ClientsDetailed", {
        client_id: {
          type: Sequelize.INTEGER,
          field: "ClientId",
          primaryKey: true,
        },


        last_name: {
          type: Sequelize.STRING,
          field: "Lastname"
        },

        first_name: {
          type: Sequelize.STRING,
          field: "Firstname"
        },

        sexe: {
          type: Sequelize.STRING,
          field: "Sexe"
        },

        birthdate: {
          type: Sequelize.DATE,
          field: "Birthdate"
        },

        type: {
          type: Sequelize.STRING,
          field: "Type"
        },

        job: {
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

        contract_date: {
          type: Sequelize.DATE,
          field: "ContractDate"
        },

        total: {
          type: Sequelize.STRING,
          field: "Total"
        },

        number_accounts: {
          type: Sequelize.INTEGER,
          field: "Accounts"
        },

        account_id_1: {
          type: Sequelize.STRING,
          field: "Account1Id"
        },

        account_id_2: {
          type: Sequelize.STRING,
          field: "Account2Id"
        },

        account_id_3: {
          type: Sequelize.STRING,
          field: "Account3Id"
        }
      }, {
        freezeTableName: true,
        createdAt: false,
        deletedAt: false,
        updatedAt: false
      });

      return next();
}


module.exports = {
  init_config: init_config
};
