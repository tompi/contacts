var collection;
var service = {};

service.setDb = function(db) {
  collection = db.collection('contacts');
};

service.getAll = function(next) {
  collection.find({}).toArray(function(err, contacts) {
    if (err) {
      console.log(err);
    } else {
      next(contacts);
    }
  });
};

service.create = function(contact, next) {
  collection.insert(contact, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      // result.ops[0] is document with _id
      // Add delay
      setTimeout(function() { next(result.ops[0]); }, 2000);
    }
  });
};

service.delete = function(email, next) {
  collection.remove({ email: email }, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      next(result);
    }
  });
};

module.exports = service;
