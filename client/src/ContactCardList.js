var React = require('react');
var ContactCard = require('./ContactCard');
var Store = require('./Store');

function getState() {
  return { persons: Store.getAll() };
}

module.exports = React.createClass({
  getInitialState: function() {
    return getState();
  },
  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },
  render: function() {
    var cards = this.state.persons.map(function (person) {
      return (
        <ContactCard data={person} key={person.email}/>
      );
    });
    return (
      <div className="row">{cards}</div>
    );
  },
  _onChange: function() {
    this.setState(getState());
  }
});

