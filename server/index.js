var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var ContactService = require('./ContactService');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/contacts', function(req, res) {
  res.send(ContactService.getAll());
  console.log("Sent all contacts");
});

app.post('/api/contacts', function(req, res) {
  res.send(ContactService.create(req.body));
  console.log("Created contact " + req.body.email);
});

app.delete('/api/contacts/:email', function(req, res) {
  ContactService.delete(req.params.email);
  res.send(req.email);
  console.log("Deleted contact " + req.params.email);
});

app.use(express.static('client/build'));

var server = http.createServer(app);
server.listen(1337);
