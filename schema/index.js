var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageUrl = new Schema({
    title:  String,
    kind: String,
    search:   String,
    link:String,
    mime:String,
    thumbnailLink:String,
    serverLink:String,
    date: { type: Date, default: Date.now },
});

var ImageUrl = mongoose.model('image', imageUrl);

// make this available to our users in our Node applications
module.exports = {
    ImageUrl
};