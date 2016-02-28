
"use strict";

const express = require('express');
const router = express.Router();

router.get('/:account_id/:start/:end', function(req, res, next) {
  return req.db.models.History.findAll({
    where: {
      AccountId: req.params.account_id,
      Date: {
        $between: [
          new Date(parseInt(req.params.start)),
          new Date(parseInt(req.params.end))
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
    res.send(days);
    return Promise.resolve();
  })
  .catch((reason) => {
    console.log("error: ", reason)
  })
})

router.get('/:account_id/:start', function(req, res, next) {
  return req.db.models.History.findAll({
    where: {
      AccountId: req.params.account_id,
      Date: {
        $gt: new Date(parseInt(req.params.start))
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
    res.send(days);
    return Promise.resolve();
  })
  .catch((reason) => {
    console.log("error: ", reason)
  })
})

module.exports = router;
