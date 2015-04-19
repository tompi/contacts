var Dispatcher = require('./Dispatcher');
var Constants = require('./Constants');
var BackendApi = require('./BackendApi');
var md5 = require('md5');

module.exports = {
  create: function(email, name) {
    var md5Chk = md5.digest_s(email.trim().toLowerCase());
    var contact = { 
        email, 
        name, 
        md5: md5Chk
    };
    BackendApi.createContact(contact);
    Dispatcher.dispatch({
      actionType: Constants.CREATE,
      contact
    });
  },

  destroy: function(email) {
    Dispatcher.dispatch({
      actionType: Constants.DESTROY,
      email
    });
    BackendApi.deleteContact(email);
  }
};

