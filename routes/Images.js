var express = require('express');
var router = express.Router();
var request = require('request');
import {compressImage} from "../functions"

router.get('/', function(req, res, next) {
    let {query, body, params, APP_GOOGLE_KEY, APP_GOOGLE_CX,APP_TINY_PNG_KEY,SERVER_URL} = req;
    let {name}=query
    let result = void 0;
        return getData({APP_GOOGLE_KEY,APP_GOOGLE_CX,name}).then(result_=>{
            result = result_;
            return getData({APP_GOOGLE_KEY, APP_GOOGLE_CX, name, num: 5, start: 10});
        }).then(data=>{
            data.items = [...result.items, ...data.items];
            res.send(JSON.stringify(data));
            compressImage({
                key:APP_TINY_PNG_KEY,items:data,name,
                server_url:SERVER_URL
            })
        }).catch(error=>{
            console.log(error);
            res.send('error');

        })

});

const getData=({APP_GOOGLE_KEY,APP_GOOGLE_CX,name,start=1,num=10})=>{
    return new Promise((resolve, rejet) => {
        request(`https://www.googleapis.com/customsearch/v1?q=${name}&start=${start}&num=${num}&imgDominantColor=gray&imgColorType=gray&searchType=image&key=${APP_GOOGLE_KEY}&cx=${APP_GOOGLE_CX}`, function (error, response, body) {
            if(error){
                rejet(error);
                return;
            }
            body = parseItems(body);
            if(body.error){
                rejet(body.message);
                return;
            }
            resolve(body);
        });
    });
}
const parseItems = (items) => {
    if (typeof items === "string") {
        items = JSON.parse(items);
    }
    return items;
};

module.exports = router;
