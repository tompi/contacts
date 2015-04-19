var React = require('react');
var ContactApp = require('./ContactApp');
var BackendApi = require('./BackendApi');

BackendApi.getAllContacts();

// The rendering
React.render(
  <ContactApp/>,
  document.getElementById('content')
);
