require('babel-register');

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var pool = require('./mysql-connection-pool.js');
var DummyDao = require('./dummy-dao.js');
var GenericMysqlDao = require('./generic-mysql-dao.js');

var app = express();
app.use(bodyParser.json());

var dummyDao = new DummyDao(pool);
dummyDao.updateById(4, {name: 'yo'});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/v1/test', function (req, res) {
  var dummyData = {dummy: "some data"};
  res.json(dummyData);
});

app.get('/v1/dummy', function (req, res) {
  dummyDao.findAll().then( (dummies) => {
    res.json(dummies);
  });
});

app.get('/v1/dummy/:id', function (req, res) {
  dummyDao.findById(req.params.id).then( (dummies) => {
    res.json(dummies[0]);
  });
});

app.post('/v1/dummy/:id', function (req, res) {
  dummyDao.create(req.body).then( (value) => {
    res.sendStatus(200);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
