var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    res.send(`respond with a resource ${ip}`);

});

module.exports = router;
