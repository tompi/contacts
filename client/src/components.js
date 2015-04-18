var React = require('react');

// The contact card
exports.ContactCard = React.createClass({
  render: function() {
    var imageUrl = 'http://www.gravatar.com/avatar/' +
                   this.props.data.md5 +
                   '?s=210';
    return (
      <div className="col-md-4 col-sm-6 col-xs-12">
        <div className="text-center panel panel-default well">
          <h3>{this.props.data.name}</h3>
          <img src={imageUrl} 
            className="avatar img-circle img-thumbnail" alt="avatar"/>
          <a href="mailto:#">{this.props.data.email}</a>
        </div>
      </div>
    );
  }
});

// The list of contact cards
exports.ContactCardList = React.createClass({
  render: function() {
    var cards = this.props.data.map(function (person) {
      return (
        <exports.ContactCard data={person} key={person.email}/>
      );
    });
    return (
      <div className="row">{cards}</div>
    );
  }
});

