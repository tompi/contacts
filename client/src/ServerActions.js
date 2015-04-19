var Dispatcher = require('./Dispatcher');
var Constants = require('./Constants');

module.exports = {
  receiveAll: function(contacts) {
    Dispatcher.dispatch({
      actionType: Constants.RECEIVE_ALL,
      contacts
    });
  }
};

