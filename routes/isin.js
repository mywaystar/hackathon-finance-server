
"use strict";

const express = require('express');
const router = express.Router();


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

    const response = result.reduce((array, elem) => {
      if (!array[elem.dataValues.isin]) {
        array[elem.dataValues.isin] = [];
      }
      array[elem.dataValues.isin].push(elem.dataValues);
      return array;
    }, []);

    return Promise.resolve(response);
  })

  .then((response) => {
    console.log("RES: ", response)
    res.status(200).json(response);
    return Promise.resolve();
  })
  .catch((reason) => {
    console.log("error: ", reason)
  })
});

module.exports = router;
