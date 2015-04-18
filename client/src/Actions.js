var Dispatcher = require('./Dispatcher');
var Constants = require('./Constants');
var md5 = require('md5');

module.exports = {
  create: function(email, name) {
    var md5Chk = md5.digest_s(email.trim().toLowerCase());
    Dispatcher.dispatch({
      actionType: Constants.CREATE,
      person: { 
        email, 
        name, 
        md5: md5Chk
      }
    });
  },

  destroy: function(email) {
    Dispatcher.dispatch({
      actionType: Constants.DESTROY,
      email
    });
  }
};

