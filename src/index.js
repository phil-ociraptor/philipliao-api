require('babel-register');

var DummyDao = require('./dummy-dao.js');

var express = require('express');
var app = express();
var dummyDao = new DummyDao();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/v1/test', function (req, res) {
  var dummyData = {dummy: 'some data'};
  res.json(dummyData);
});

app.get('/v1/dummy', function (req, res) {
  var dummies;
  dummyDao.findAll().then( (value) => {
    dummies = value;
    res.json(dummies);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
