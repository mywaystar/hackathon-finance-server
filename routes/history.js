
"use strict";

const express = require('express');
const router = express.Router();

router.get('/:account_id/:start/:end', function(req, res, next) {
  let response;

  return req.db.models.History.findAll({
    where: {
      AccountId: req.params.account_id,
      Date: {
        $between: [
          req.params.start,
          req.params.end
        ]
      }
    },
    limit: 1000000
  })
  .then((days) => {
    if (!days) {
      res.status(300);
      res.send("Invalid parameters");
    }
    res.status(200);
    res.json(days);
    return Promise.resolve();
  })
  .catch((reason) => {
    console.log("error: ", reason)
  })
})

router.get('/:account_id/:start', function(req, res, next) {
  let response;

  return req.db.models.History.findAll({
    where: {
      AccountId: req.params.account_id,
      Date: {
        $gt: req.params.start
      }
    },
    limit: 1000000
  })
  .then((days) => {
    if (!days) {
      res.status(300);
      res.send("Invalid parameters");
    }
    res.status(200);
    res.json(days);
    return Promise.resolve();
  })
  .catch((reason) => {
    console.log("error: ", reason)
  })
})

module.exports = router;
