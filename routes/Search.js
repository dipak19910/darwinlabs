var express = require('express');
var router = express.Router();
var request = require('request');
import {compressImage,mongoFind,mongoFindAggregate} from "../functions"
/* GET users listing. */
router.get('/', function (req, res, next) {
    let {query, body, params, APP_GOOGLE_KEY, APP_GOOGLE_CX, APP_TINY_PNG_KEY} = req;
    mongoFindAggregate(undefined,data=>{
        res.send(JSON.stringify(data));
    })

});
router.get('/name/:name', function (req, res, next) {
    let {query, body, params, APP_GOOGLE_KEY, APP_GOOGLE_CX, APP_TINY_PNG_KEY} = req;
    let name = query.name || params.name;
    console.log(query);
    console.log(params);
    console.log(name);
    mongoFind(name,data=>{
        res.send(JSON.stringify(data));
    })

});


module.exports = router;
