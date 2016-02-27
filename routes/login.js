
"use strict";

const express = require('express');
const router = express.Router();

router.get('/:email', function(req, res, next) {
  let response;

  req.db.models.Client.findOne({
    where: {
      Email: req.params.email
    }
  })
  .then((client) => {
    if (!client) {
      res.status(300);
      res.send("Invalid account");
    }
    res.status(200);
    res.json(client.client_id);
    return Promise.resolve();
  })
  .catch((reason) => {
    console.log("error: ", reason)
  })
})

module.exports = router;
