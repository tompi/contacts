var React = require('react');
var ContactApp = require('./ContactApp');
var Store = require('./Store');

// Rehydrate store
Store.populate(window.contacts);


// The rendering
React.render(
  <ContactApp/>,
  document.getElementById('content')
);
