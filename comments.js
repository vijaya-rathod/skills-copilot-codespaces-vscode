//Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));
app.get('/comments', function (req, res) {
    console.log('GET request received at /comments');
    fs.readFile(__dirname + '/public/comments.json', 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
});

app.post('/comments', urlencodedParser, function (req, res) {
    console.log('POST request received at /comments');
    var newComment = req.body;
    console.log(newComment);
    fs.readFile(__dirname + '/public/comments.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            var comments = JSON.parse(data);
            comments.push(newComment);
            fs.writeFile(__dirname + '/public/comments.json', JSON.stringify(comments), function (err) {
                console.log(err);
            });
        }
    });
    res.send('Comment added');
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server listening at http://%s:%s", host, port);
});