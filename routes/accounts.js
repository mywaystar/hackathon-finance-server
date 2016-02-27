
"use strict";

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let response;

  req.db.models.Account.findAll()
  .then((account) => {
    res.status(200);
    res.send(account)
    return Promise.resolve();
  })
  .catch((reason) => {
    console.log("error: ", reason)
  })
})

/* GET home page. */
router.get('/:id', function(req, res, next) {
  console.log("REQ: ", req.params)
  req.db.models.Account.findOne({
    where: {
     AccountId: req.params.id
    }
  })
  .then((account) => {
    res.status(200);
    res.send(account)
    return Promise.resolve();
  })
  .catch((reason) => {
    console.log("error: ", reason)
  })
})

module.exports = router;
