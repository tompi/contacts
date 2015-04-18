// The store containing persons

var Dispatcher = require('./Dispatcher');
var Constants = require('./Constants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _persons  = [
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

var store = new EventEmitter();

store.destroy = function(email) {
  _persons.splice(_.findIndex(_persons, function(person) {
    return person.email === email;
  }), 1);
};

store.create = function(person) {
  _persons.unshift(person);
};

store.getAll = function() {
  return _persons;
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
      store.create(action.person);
      store.emitChange();
      break;

    case Constants.DESTROY:
      store.destroy(action.email);
      store.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = store;

