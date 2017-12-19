var express = require('express');
var app = express();

app.use(express.static('public'));
app.use('/', express.static('public'));

app.listen(3000, function () {
    console.log('Example app running at "172.20.14.108:3000/".');
});