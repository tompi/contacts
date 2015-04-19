var React = require('react');
var Actions = require('./Actions');

module.exports = React.createClass({
  render: function() {
    // Before a contact is saved to backend, it will not have an id
    var savingClass = 'label label-info';
    if (this.props.data._id) savingClass += ' hidden';
    // Calculate gravatar url
    var imageUrl = 'http://www.gravatar.com/avatar/' +
                   this.props.data.md5 +
                   '?s=210';
    return (
      <div className="col-md-4 col-sm-6 col-xs-12">
        <div className="text-center panel panel-default well">
          <h3>{this.props.data.name}</h3>
          <img
            src={imageUrl}
            className="avatar img-circle img-thumbnail"
            alt="avatar"/>
          <div><a href="mailto:#">{this.props.data.email}</a></div>
          <div>
            <span className={savingClass}>Saving...</span>
            <button type="button" className="btn btn-default pull-right"
              onClick={this._onDestroyClick}>
              <span className="glyphicon glyphicon-remove"> Delete</span>
            </button>
            <div className="clearfix"/>
          </div>
        </div>
      </div>
    );
  },

  _onDestroyClick: function() {
    Actions.destroy(this.props.data.email);
  }
});
