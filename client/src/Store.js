// The store containing contacts

var Dispatcher = require('./Dispatcher');
var Constants = require('./Constants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _contacts  = [];

var store = new EventEmitter();

store.destroy = function(email) {
  _contacts.splice(_.findIndex(_contacts, function(contact) {
    return contact.email === email;
  }), 1);
};

store.create = function(contact) {
  _contacts.unshift(contact);
};

store.getAll = function() {
  return _contacts;
};

store.emitChange = function() {
  store.emit(CHANGE_EVENT);
};

store.addChangeListener = function(callback) {
  store.on(CHANGE_EVENT, callback);
};

store.removeChangeListener = function(callback) {
  store.removeListener(CHANGE_EVENT, callback);
};

Dispatcher.register(function(action) {
  switch(action.actionType) {
    case Constants.CREATE:
      store.create(action.contact);
      store.emitChange();
      break;

    case Constants.DESTROY:
      store.destroy(action.email);
      store.emitChange();
      break;

    case Constants.RECEIVE_ALL:
      _contacts = action.contacts;
      store.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = store;

