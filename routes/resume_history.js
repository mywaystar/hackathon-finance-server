
"use strict";

const express = require('express');
const router = express.Router();
const client_controller = require("./clients").controllers;



const get_list_accounts = (req, client_id) => {
  return Promise.resolve()

  .then(() => {
    return req.db.models.Client.findOne({
      where: {
        ClientId: client_id
      }
    })
  })

  .then((account) => {
    req.Query = account;
    const response = [];

    if (account.dataValues.account_id_1) {
      response.push(account.dataValues.account_id_1);
    }
    if (account.dataValues.account_id_2) {
      response.push(account.dataValues.account_id_2);
    }
    if (account.dataValues.account_id_3) {
      response.push(account.dataValues.account_id_3);
    }
    return Promise.resolve(response);
  })
  .catch((reason) => {
    console.log(reason);
  })
}



router.get('/:client_id/:start/:end', function(req, res, next) {
  let response;

  return get_list_accounts(req, req.params.client_id)
  .then((list_accounts) => {
    return Promise.all(list_accounts.map((account_id) => {
      return req.db.models.History.findAll({
        where: {
          AccountId: account_id.replace(/\s/g, ''),
          Date: {
            $between: [
              new Date(req.params.start),
              new Date(req.params.end)
            ]
          }
        }
      })
    }))
    .then((results) => {
      const response = [];

      results.forEach((account) => {
        account.forEach((account_day, index_day) => {

          if (!response[index_day]) {
            return response[index_day] = {
              date: account_day.date,
              account_amount: account_day.account_amount,
              account_bench: account_day.account_bench,
              daily_perf: account_day.daily_perf,
              daily_bench: account_day.daily_bench,
              daily_perf_differ: account_day.daily_perf_differ,
            };
          }

          const day = response[index_day];

          response.account_amount += day.account_amount;
          response.account_bench += day.account_bench;
          response.daily_perf += day.daily_perf;
          response.daily_bench += day.daily_bench;
          response.daily_perf_differ += day.daily_perf_differ;
        })
      })
      res.status(200)
      .send(response);
      return Promise.resolve();
    })
  })
  .catch((reason) => {
  })
})


router.get('/:client_id/:start', function(req, res, next) {
  let response;

  return get_list_accounts(req, req.params.client_id)
  .then((list_accounts) => {
    return Promise.all(list_accounts.map((account_id) => {
      return req.db.models.History.findAll({
        where: {
          AccountId: account_id.replace(/\s/g, ''),
          Date: {
            $gt: new Date(req.params.start)
          }
        }
      })
    }))
    .then((results) => {
      const response = [];

      results.forEach((account) => {
        account.forEach((account_day, index_day) => {

          if (!response[index_day]) {
            return response[index_day] = {
              date: account_day.date,
              account_amount: account_day.account_amount,
              account_bench: account_day.account_bench,
              daily_perf: account_day.daily_perf,
              daily_bench: account_day.daily_bench,
              daily_perf_differ: account_day.daily_perf_differ,
            };
          }

          const day = response[index_day];

          response.account_amount += day.account_amount;
          response.account_bench += day.account_bench;
          response.daily_perf += day.daily_perf;
          response.daily_bench += day.daily_bench;
          response.daily_perf_differ += day.daily_perf_differ;
        })
      })
      res.status(200)
      .send(response);
      return Promise.resolve();
    })
  })
  .catch((reason) => {
  })
})

module.exports = router;
