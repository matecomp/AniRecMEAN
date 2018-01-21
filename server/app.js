"use strict";

let express = require("express");
let app = express();

let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

app.use( express.static(__dirname + "/../client") );
app.use('/js', express.static(__dirname + '/../node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/../node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/../node_modules/bootstrap/dist/css')); // redirect CSS bootstrap


app.get("/animes-list", (request, response) => {
    let animes = mongoUtil.animes();
    animes.find().limit(30).toArray((err,docs) => {
        if(err) {
            response.sendStatus(400);
        }
        // console.log(JSON.stringify(docs));
        response.json( docs );
    });
});

app.get("/animes-list/:id", (request, response) => {
    let animeId = parseInt(request.params.id);
    // console.log( "Anime id: ", animeId);
    let animes = mongoUtil.animes();
    animes.find({ anime_id: animeId }).toArray((err,doc) => {
        if(err) {
            response.sendStatus(400);
        }
        // console.log(JSON.stringify(docs));
        response.json( doc );
    });
});

const port = 8181;
app.listen(port, () => console.log( "Listening on " + port));