var React = require('react');
var Actions = require('./Actions');

module.exports = React.createClass({
  render: function() {
    var imageUrl = 'http://www.gravatar.com/avatar/' +
                   this.props.data.md5 +
                   '?s=210';
    return (
      <div className="col-md-4 col-sm-6 col-xs-12">
        <button type="button" className="btn btn-default pull-right"
              onClick={this._onDestroyClick}>
          <span className="glyphicon glyphicon-remove"> Slett</span>
        </button>
        <div className="text-center panel panel-default well">
          <h3>{this.props.data.name}</h3>
          <img src={imageUrl} 
            className="avatar img-circle img-thumbnail" alt="avatar"/>
          <div><a href="mailto:#">{this.props.data.email}</a></div>
        </div>
      </div>
    );
  },

  _onDestroyClick: function() {
    Actions.destroy(this.props.data.email);
  }
});
