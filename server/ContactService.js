var _ = require('lodash');
var _db;
var _collection;

var service = {};

service.setDb = function(db) {
  _db = db;
  _collection = _db.collection('contacts');
};

service.getAll = function(next) {
  _collection.find({}).toArray(function(err, contacts) {
    next(contacts);
  });
};

service.create = function(contact, next) {
  _collection.insert(contact, function(err, result) {
    // result.ops is document with _id
    next(result.ops);
  });
};

service.delete = function(email, next) {
  _collection.remove({ email: email }, function(err, result) {
    next();
  });
};

module.exports = service;

