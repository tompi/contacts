var $ = require('jquery');
var ServerActions = require('./ServerActions');

var api = {};

api.getAllContacts = function() {
  $.ajax({
      url: '/api/contacts',
      type: 'GET'
    })
    .done(function(contacts) {
      ServerActions.receiveAll(contacts);
    });
};

api.createContact = function(contact) {
  $.ajax({
      url: '/api/contacts',
      type: 'POST',
      data: contact
    })
    .done(function(createdContact) {
      ServerAction.receiveCreated(createdContact);
    });
};

api.deleteContact = function(email) {
  $.ajax({
      url: '/api/contacts/' + email,
      type: 'DELETE'
    })
    .done(function() {
      ServerAction.receiveDeleted(email);
    });
};

module.exports = api;
