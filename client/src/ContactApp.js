var React = require('react');
var Actions = require('./Actions');
var ContactCardList = require('./ContactCardList');
var novalidation = require('novalidation');

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
    var ssnClass = 'form-group';
    if (!novalidation.fodselsNummer(this.state.ssn)) {
      ssnClass += ' has-error';
    }
    var showFormButtonText = this.state.showForm ? "Hide form" : "Show form";
    return (
      <div className="container-fluid">
        <div>
          <h1 className="text-center">
            <button
              className="btn btn-default pull-right"
              onClick={this._toggleShowForm}>{showFormButtonText}</button>
            Hello, Javabins <small>or javabinners?</small>
          </h1>
        </div>
        <div className={formClass}>
          <form className="form-horizontal" role="form"
              onSubmit={this._handleSubmit}>
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
            <div className={ssnClass}>
              <label htmlFor="ssn" className="col-sm-2 control-label">
                Ssn
              </label>
              <div className="col-sm-10">
                <input
                  onChange={this._onChangeSsn}
                  value={this.state.ssn}
                  type="text"
                  className="form-control"
                  placeholder="Ssn"
                  id="ssn"/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button
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
  _onChangeSsn: function(event) {
    this.state.ssn = event.target.value;
    this.setState(this.state);
  },
  _handleSubmit: function(e) {
    // Prevent submitting the form
    e.preventDefault();
    // Only submit if valid ssn and name+email
    if (novalidation.fodselsNummer(this.state.ssn)
        && this.state.email
        && this.state.mail) {
      // Trigger action
      Actions.create(this.state.email, this.state.name);
      // Reset form
      this.state.email = '';
      this.state.name = '';
      this.state.ssn = '';
      this.setState(this.state);
    }
  }
});
