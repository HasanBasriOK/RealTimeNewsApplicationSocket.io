var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer()); 

app.get('/', (req, res) => {
    res.sendFile('./client.html', { root: __dirname });
});


app.post('/Save', (req, res) => {

    var title = req.body.title;
    var body = req.body.body;
    var link = req.body.link;

    console.log(req.body);

    io.emit('mychannel', req.body);

    res.send('success');
});

app.get('/admin', (req, res) => {
    res.sendFile('./admin.html', { root: __dirname });
});


server.listen(8000, () => {
    console.log('listening...');
});