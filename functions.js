var path = require('path');
var tinify = require("tinify");
import each from 'async/each';
import {ImageUrl} from "./schema";

const compressImage = ({key, items, name, server_url}) => {
    let {items: data = []} = parseItems(items);
    updateMongoDb(server_url, data, name);
    for (let i = 0; i < data.length; i++) {
        uploadImageToLoaclSystem(server_url, key, data[i])
    }
};

const uploadImageToLoaclSystem = (url, key, row) => {
    let {link} = row;
    try {
        tinify.key = key
        tinify.fromUrl(link).toFile(getImageServerUrl(url, row,"true"),function (error) {
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
};

const getImageServerUrl = (url, row,isDirectory) => {
    let ext = path.extname(row.link);
    return `${isDirectory?__dirname:url}/local-image/${row.title}${ext}`;
}
const parseItems = (items) => {
    if (typeof items === "string") {
        items = JSON.parse(items);
    }
    return items;
};

const updateMongoDb = (url, data, name) => {

    each(data, function (row, callback) {
        let {title, kind, link, mime, image: {thumbnailLink}} = row;
        ImageUrl.findOneAndUpdate({search: name, link}, {
            title,
            kind,
            search: name,
            link,
            mime,
            thumbnailLink,
            serverLink: getImageServerUrl(url, row)
        }, {upsert: true, new: true, setDefaultsOnInsert: true}, (error, user) => {
            if (error) {
                throw error;
            }

            // we have the updated user returned to us
            // console.log(user);
        })
        callback();
    }, function (err) {
        // if any of the file processing produced an error, err would equal that error
        if (err) {
            // One of the iterations produced an error.
            // All processing will now stop.
            console.log('A file failed to process');
        } else {
            console.log('All files have been processed successfully');
        }
    });
};

const mongoFindAggregate = (name, callback) => {
    ImageUrl.aggregate([{
        $group: {
            _id: "$search",
        }}], function (err, users) {
        if (err) {
            throw err;
        }
        ;
        callback(users);
    });
};
const mongoFind = (name, callback) => {
    ImageUrl.find({search:name}, function (err, users) {
        if (err) {
            throw err;
        }
        ;
        callback(users);
    });
};
module.exports = {
    compressImage,
    mongoFindAggregate,
    mongoFind

}