var express = require('express');
var router = express.Router();
var mock = require("../services/Mock.js");

/* GET home page. */
router.get('/posts', function(req, res, next) {
  res.json(mock.posts());
});

module.exports = router;
