var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var ContactService = require('./ContactService');
var MongoClient = require('mongodb');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function handleError(res, error) {
  res.status(400).json({error: error});
}

app.get('/api/contacts', function(req, res) {
  ContactService.getAll(function(contacts) {
    res.send(contacts);
    console.log('Sent all contacts');
  });
});

app.post('/api/contacts', function(req, res) {
  var incomingContact = req.body;
  console.log(incomingContact);
  ContactService.create(req.body, function(err, contact) {
    if (err) {
      handleError(res, err);
    } else {
      res.send(contact);
      console.log('Created contact:');
      console.log(contact);
    }
  });
});

app.delete('/api/contacts/:email', function(req, res) {
  ContactService.delete(req.params.email, function(email) {
    res.send(email);
    console.log('Deleted contact ' + email);
  });
});

app.use(express.static('client/build'));

var mongoUrl = 'mongodb://javabin:topsecret@ds037581.mongolab.com:37581/javabindemo';
MongoClient.connect(mongoUrl, function(err, db) {
  if (err) {
    console.log(err);
  } else {
    ContactService.setDb(db);
    var server = http.createServer(app);
    server.listen(1337);
  }
});
