
"use strict";

const express = require('express');
const router = express.Router();
const client_controller = require("./clients").controllers;


router.get('/:client_id/:start/:end', function(req, res, next) {
});

module.exports = router;
