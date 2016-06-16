import React, { Component } from 'react';
import { Link } from 'react-router';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeLink: '',
    }
  }

  componentWillMount () {
    if (this.props.location.pathname === '/') {
      this.setState({ activeLink: 'addressList' });
    } else if (this.props.location.pathname === '/add-address'){
      this.setState({ activeLink: 'addAddress' });
    } else {
      this.setState({ activeLink: '' });
    }
  }

  // this method is called when route change
  componentWillReceiveProps (nextProps, nextState) {
    if (nextProps.location.pathname === '/') {
      this.setState({ activeLink: 'addressList' });
    } else if (nextProps.location.pathname === '/add-address'){
      this.setState({ activeLink: 'addAddress' });
    } else {
      this.setState({ activeLink: '' });
    }
  }

  render() {
    return (
    	<div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">React Address Book</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li id="Address-List" className={(this.state.activeLink === 'addressList') ? 'active' : ''}>
                  <Link to={`/`}><i className="fa fa-list-ol"></i>&nbsp;&nbsp;Address List</Link></li>
                <li id="Add-Address" className={(this.state.activeLink === 'addAddress') ? 'active' : ''}>
                  <Link to={`/add-address`}><i className="fa fa-file-text"></i>&nbsp;&nbsp;Add Address</Link></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><a id="time_span"></a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="content">
          {(this.props.children)}
        </div>
      </div>
   	)
  }
}

export default App;
