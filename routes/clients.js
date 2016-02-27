
"use strict";

const express = require('express');
const router = express.Router();

const get_client = function(req, res, next) {

  return req.db.models.Client.findOne({
    where: {
      ClientId: req.params.id
    }
  })
  .then((account) => {
    req.Query = account;
    next();
    return Promise.resolve();
  })
  .catch((reason) => {
    console.log(reason);
  })
}

const get_client_accounts = function(req, res, next) {
  if (!req.Query) {
    res.status(500);
    res.json("Fail overflow!");
  }

  const data = req.Query.dataValues;

  data.accounts = [];


  return Promise.resolve()
  .then(() => {
    return retrieve_account(req, data.account_id_1);
  })
  .then((account) => {
    if (account) {
      data.accounts.push(account);
    }
    return retrieve_account(req, data.account_id_2);
  })
  .then((account) => {
    if (account) {
      data.accounts.push(account);
    }
    return retrieve_account(req, data.account_id_3);
  })
  .then((account) => {
    if (account) {
      data.accounts.push(account);
    }
    next();
    return Promise.resolve();
  })
  .catch((reason) => {
    console.log(reason);
  })
}

const retrieve_account = function(req, account_id) {
  if (!account_id) {
    return Promise.resolve(null);
  }

  return req.db.models.Account.findOne({
    where: {
      AccountId: account_id
    }
  });
}


/* GET home page. */
router.get('/', function(req, res, next) {
  let response;

  req.db.models.Client.findAll()
  .then((account) => {
    res.status(200);
    res.json(account)
    return Promise.resolve();
  })
  .catch((reason) => {
    console.log("error: ", reason)
  })
})

/* GET home page. */
router.get('/:id', [
  get_client,
],
(req, res, next) => {
  if (req.Query) {
    res.status(200);
    res.json(req.Query);
  } else {
    res.status(500);
    res.json("ShitStorm!");
  }
}
);

router.get('/:id/account', [
  get_client,
  get_client_accounts,
],
(req, res, next) => {
  if (req.Query) {
    res.status(200);
    res.json(req.Query);
  } else {
    res.status(500);
    res.json("ShitStorm!");
  }
}
);


module.exports = {
  router: router,
  controllers: {
    get_client_accounts: get_client_accounts
  }
}
