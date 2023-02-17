const express = require('express');
const fs = require('fs');
const cors = require('cors');
const port = 2222;
let app = express();

const allowedOrigins = ["http://localhost:2222"];
const key = "12345678";

let jsonObj = require("./logs.json");

app.use(cors());
app.use(express.json());

app.get('/', function (request, response) {
    if (request.query.key != null && request.query.key === key) {
        if (request.query.content != null) {
            let log = {
                timestamp: Date.now(),
                content: request.query.content ?? null
            };

            jsonObj.logs.push(log);
            fs.writeFileSync('logs.json', JSON.stringify(jsonObj, null, 2));

            response.writeHead(302, {
                'Location': '/?key=' + request.query.key
                //add other headers here...
            });
            response.end();
        } else if (request.query.clear != null && request.query.clear === "true") {
            jsonObj.logs = [];
            fs.writeFileSync('logs.json', JSON.stringify(jsonObj, null, 2));
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify(jsonObj, null, 2));
        } else {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify(jsonObj, null, 2));
        }
    } else {
        response.status(401);
        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify({error: "unauthorized"}, null, 2));
    }
});

app.listen(port);