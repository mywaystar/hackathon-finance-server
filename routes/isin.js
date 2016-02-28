
"use strict";

const express = require('express');
const router = express.Router();

router.get('/history/:isin/', function(req, res, next) {
  return req.db.models.Isin_history.findAll({
    where: {
      ISIN: req.params.isin,
    },
    order: 'Date DESC',
    limit: 10
  })

  .then((isin_history) => {
    if (!isin_history) {
      res.status(300);
      res.send("Invalid parameters");
      return Promise.reject("FAIL");
    }

    res.status(200).json(isin_history);
    return Promise.resolve();
  })
});

router.get('/:isin/', function(req, res, next) {
  return req.db.models.Isin_data.findOne({
    where: {
      ISIN: req.params.isin,
    },
  })
  .then((isin_data) => {
    if (!isin_data) {
      res.status(300);
      res.send("Invalid parameters");
      return Promise.reject("FAIL");
    }

    res.status(200).json(isin_data);
    return Promise.resolve();
  })

});



router.get('/:account_id/:start/:end', function(req, res, next) {
  return req.db.models.Isin.findAll({
    where: {
      AccountId: req.params.account_id,
      Date: {
        $between: [
          new Date(parseInt(req.params.start)),
          new Date(parseInt(req.params.end))
        ]
      },
    },
    order: 'Isin DESC, Date DESC'
  })

  .then((result) => {
    if (!result) {
      res.status(300);
      res.send("Invalid parameters");
      return Promise.reject("FAIL");
    }

    const response = result.reduce((object, elem) => {
      if (!object[elem.dataValues.isin]) {
        object[elem.dataValues.isin] = [];
      }
      object[elem.dataValues.isin].push(elem.dataValues);
      return object;
    }, {});

    return Promise.resolve(response);
  })

  .then((response) => {
    res.status(200);
    res.send(JSON.stringify(response));
    return Promise.resolve();
  })
  .catch((reason) => {
    console.log("error: ", reason)
  })
});


module.exports = router;
