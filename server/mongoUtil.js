"use strict";

const DB_ANIME_NAME = 'animes-dev';

let mongo = require('mongodb');
let client = mongo.MongoClient;
let _db;

module.exports = {
    connect() {
        client.connect('mongodb://localhost:27017/animes-dev', (err, database) => {
            if(err){
                console.log("Error connecting to Mongo - check mongod connection");
                process.exit(1);
            }
            _db = database.db(DB_ANIME_NAME);
            console.log("Connected to Mongo");
        });
    },
    animes(){
        return _db.collection('animes');
    }
};