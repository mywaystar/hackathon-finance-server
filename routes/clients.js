
"use strict";

const express = require('express');
const router = express.Router();

const get_client = function(req, res, next) {
  console.log("client req: ", req.params)

  req.db.models.Client.findOne({
    where: {
      ClientId: req.params.id
    }
  }, (account, err) => {
    if (err) {
      console.log("error: ", err)
    }
    requ.Query = account;
    next();
  });
}

const get_client_accounts = function(req, res, next) {
  if (!req.Query) {
    res.status(500);
    res.json("Fail overflow!");
  }

  const data = req.Query.accounts;

  req.Query.accounts = [];

  this.retrieve_account(data.account_id_1, (account, err) => {
    if (err) {
      res.status(500);
      return res.send("Fail commodor!")
    }
    if (account) {
      data.accounts.push(account);
    }
    this.retrieve_account(data.account_id_2, (account, err) => {
      if (err) {
        res.status(500);
        return res.send("Fail commodor!")
      }
      if (account) {
        data.accounts.push(account);
      }
      this.retrieve_account(data.account_id_2, (account, err) => {
        if (err) {
          res.status(500);
          return res.send("Fail commodor!")
        }
        if (account) {
          data.accounts.push(account);
        }
        next();
      })
    })
  })
}

const retrieve_account = function(account_id, cb) {
  if (!account_id) {
    return Promise.resolve();
  }

  req.db.models.Account.findOne({
    where: {
      AccountId: account_id
    }
  }, cb);
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


module.exports = router;
