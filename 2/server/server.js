const express = require('express');
const cors = require('cors');
const port = 1111;
let app = express();

let x = 0, y = 0;

const allowedOrigins = ["http://localhost:1111"];


app.use(cors());

app.use(express.json());

app.post('/', function(request, response){
    x = request.body.x;
    y = request.body.y;

    response.send('');
});

app.get('/', function(request, response){
    response.send({x: x, y: y});
});

app.listen(port);