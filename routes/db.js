
"use strict";

const Sequelize = require("sequelize");

const Accounts_model = require("../models/accounts");
const Clients_model = require("../models/clients");

const init_config = (req, res, next) => {
  const sequelize = new Sequelize("finance", "root", "", {
    host: "127.0.0.1",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    }
  });


  req.db = {};
  req.db.models = {};

  req.db.models.Account = sequelize.define(
  "Accounts",  Accounts_model.model, Accounts_model.config
  );

  req.db.models.Client = sequelize.define(
  "Clients",  Clients_model.model, Accounts_model.config
  );

  req.db.models.Account.belongsTo(req.db.models.Client, {
    as: "client_data"
  })

  const user = req.db.models.Account.findOne()
  .then((user) => {
    console.log("USER: ", user)
    return Promise.resolve();
  })

  next();
}


module.exports = {
  init_config: init_config
};
