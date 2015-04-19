var _ = require('lodash');
var _db;
var _collection;

var _contacts = [
  { 
    name: 'Thomas Haukland',
    md5: '1693a7ce631ddbe4a2287cb0b4d28582',
    email: 'thomas.haukland@gmail.com'
  },
  {
    name: 'Endre Stølsvik',
    md5: '3fe81542cd6437a443d49014e6a69a78',
    email: 'endre@stolsvik.com'
  },
  {
    name: 'Hallvard Nygård',
    md5: 'b4b9167a8d87b37dfd988bd30277a1a3',
    email: 'hallvard.nygard@gmail.com'
  },
  {
    name: 'Steffen Jørgensen',
    md5: 'f900c069740a1e87ef3505ab654e2b15',
    email: 'steffen.jorgensen@webstep.no'
  }
];

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

