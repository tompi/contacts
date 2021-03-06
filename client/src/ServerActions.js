var Dispatcher = require('./Dispatcher');
var Constants = require('./Constants');

module.exports = {
  receiveAll: function(contacts) {
    Dispatcher.dispatch({
      actionType: Constants.RECEIVE_ALL,
      contacts: contacts
    });
  },
  receiveCreated: function(contact) {
    Dispatcher.dispatch({
      actionType: Constants.RECEIVE_CREATED,
      contact: contact
    });
  },
  receiveDeleted: function(email) {
    Dispatcher.dispatch({
      actionType: Constants.RECEIVE_DELETED,
      email: email
    });
  }
};
