// To be able to require files containing jsx:
require('node-jsx').install();
// react and the client app
var React = require('react');
var ContactApp = require('../client/src/ContactApp');
// For populating the store
var Store =  require('../client/src/Store');
var ContactService = require('./ContactService');

exports.render = function(next) {
  // Fetch from mongo
  ContactService.getAll(function(contacts) {
    // Populate Store
    Store.populate(contacts);
    var html = '';

    html += '<!DOCTYPE html>';
    html += '<html>';
    html += '  <head>';
    html += '    <title>Javabin demo</title>';
    html += '    <meta charset="utf-8">';
    html += '    <meta http-equiv="X-UA-Compatible" content="IE=edge">';
    html += '    <meta name="viewport" content="width=device-width, initial-scale=1">';
    html += '    <link rel="shortcut icon" href="favicon.ico">';
    html += '    <link rel="stylesheet" href="styles.css">';
    html += '  </head>';
    html += '  <body>';
    html += '    <video class="video-bg" src="assets/hipsters.webm"';
    html += '          poster="assets/hipsters.jpg" autoplay loop></video>';
    html += '    <div class="container" id="content">';

    html += React.renderToStaticMarkup(React.createFactory(ContactApp)({}));

    html += '    </div>';
    // TODO: "progressive enhancement"  html += '    <script src="bundle.js"></script>';
    html += '  </body>';
    html += '</html>';

    next(html);
  });
};
