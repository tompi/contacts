var React = require('react');
var Actions = require('./Actions');
var ContactCardList = require('./ContactCardList');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      showForm: false
    };
  },
  render: function() {
    var formClass = 'well';
    if (!this.state.showForm) {
      formClass += ' hidden';
    }
    var showFormButtonText = this.state.showForm ? "Hide form" : "Show form";
    return (
      <div className="container-fluid">
        <div>
          <h1 className="text-center">
            <button 
              className="btn btn-default pull-right"
              onClick={this._toggleShowForm}>{showFormButtonText}</button>
            Hello, Javabins<small>or javabinners?</small>
          </h1>
        </div>
        <div className={formClass}>
          <form className="form-horizontal" role="form" onsubmit="return false;">
            <div className="form-group">
              <label htmlFor="email" className="col-sm-2 control-label">
               Email
              </label>
              <div className="col-sm-10">
                <input 
                  onChange={this._onChangeEmail}
                  value={this.state.email}
                  type="email" 
                  className="form-control" 
                  placeholder="Email" 
                  id="email"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name" className="col-sm-2 control-label">
                Name
              </label>
              <div className="col-sm-10">
                <input 
                  onChange={this._onChangeName}
                  value={this.state.name}
                  type="text" 
                  className="form-control" 
                  placeholder="Name" 
                  id="name"/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button 
                  onClick={this._save}
                  className="btn btn-primary">OK</button>
              </div>
            </div>
          </form>
        </div>
        <hr/>
        <ContactCardList/>
      </div>
    );
  },
  _toggleShowForm: function() {
    this.state.showForm = !this.state.showForm;
    this.setState(this.state);
  },
  _onChangeEmail: function(event) {
    this.state.email = event.target.value;
    this.setState(this.state);
  },
  _onChangeName: function(event) {
    this.state.name = event.target.value;
    this.setState(this.state);
  },
  _save: function() {
    Actions.create(this.state.email, this.state.name);
    // Prevent submitting the form
    return false;
  }
});
