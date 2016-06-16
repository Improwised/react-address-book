import React, { PropTypes, Component } from 'react';
import { Router, browserHistory, history } from 'react-router';
import reactCookie from 'react-cookie';
import { Link } from 'react-router';
import $ from 'jquery';
import Countries from '../../assets/js/countries.json';
import Name from './formComponent/name';
import Phoneno from './formComponent/phoneno';
import Street from './formComponent/street';
import CityZip from './formComponent/cityzip';
import StateCountry from './formComponent/statecountry';

const propTypes = {};

// Add Address Component
class Addaddress extends Component {
  constructor() {
    super();
    this.state = {
      firstname:'',
      lastname: '',
      phoneno:'',
      street:'',
      state:'',
      city:'',
      zipcode:'',
      country:'',
      title: 'Add New Address'
    };
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // When Component mount
  componentWillMount () {
    if (this.props.params.id) {
      var number = this.props.params.id;
      var addressList = reactCookie.load('data');
      var editData = addressList[number];
      this.setState({
        firstname: editData.name.firstname,
        lastname:editData.name.lastname ,
        phoneno: (editData.phoneno).toString(),
        street: editData.address.street,
        state: editData.address.state,
        city: editData.address.city,
        zipcode: (editData.address.zipcode).toString(),
        country: editData.address.country,
        title: 'Edit Address'
      });
    } else {
      this.reset();
    }
  }

  // Handle Text Change
  handleChange (event) {
    var obj = { [event.target.id] : event.target.value };
    this.setState(obj);
  }

  // Handle Submit
  handleSubmit (e) {
    e.preventDefault();

    // Get Cokkie Data
    var data = reactCookie.load('data');

    // Prepare Form Data
    var new_address = {
      "name": {'firstname':this.state.firstname,'lastname':this.state.lastname },
      "phoneno": (this.state.phoneno).toString(),
      "address":{
        'street'  : this.state.street,
        'state'   : this.state.state ,
        'city'    : this.state.city,
        'zipcode' : (this.state.zipcode).toString(),
        'country' : this.state.country
      }
    };

    // Prepare Cokkie
    if (this.props.params.id) {
      var number = this.props.params.id;
      new_address.id = number;
      data[number] = new_address;
    } else {
      var id = (data.length > 0) ? data.length - 1 : 0;
      new_address.id = data[id] ? data[id].id + 1 : 0;
      data.push(new_address);
    }

    // Add New Array to cokkie
    reactCookie.remove('data');
    reactCookie.save('data',data);

    // Enable Notification
    $('#notification').addClass('show');
    $('#notification').removeClass('hide');

    // Diplay notification Message
    if (this.props.params.id) {
      $("#msg").html('Address Updated Successfully.');
    } else {
      $("#msg").html('New address Added.');
    }
    // Redirect to Home
    setTimeout(function() {
      this.props.history.push('/');
      this.reset();
    }.bind(this), 2000);
  }
  // End Submit

  // this method is called when route change
  componentWillReceiveProps (nextProps, nextState) {
    this.reset();
  }

  // Set Reset
  reset () {
    this.setState({
      firstname:'',lastname:'',phoneno:'',street:'',state:'',city:'',zipcode:'',country:''
    });
  }

  render () {
    // Create Country Option
    var countryOption = Countries.map(function(country, i){
      return (
        <option key={i} value={country.name}>{country.name}</option>
      )
    }.bind(this));
    return(
      <div className="clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div id="notification" className="alert alert-info hide" role="alert">
                <div id="msg"></div>
              </div>
              <div className="block">
                <div className="block-header">
                  <div className="clearfix">
                    <div className="block-title pull-left">
                      <h2>{this.state.title}</h2>
                    </div>
                  </div>
                </div>
                <div className="block-content">
                  <form id="addAddress" onSubmit={this.handleSubmit}>
                    <Name
                      handleChange={this.handleChange}
                      firstname={this.state.firstname}
                      lastname={this.state.lastname} />
                    <br/>
                    <Phoneno
                      handleChange={this.handleChange}
                      phoneno={this.state.phoneno} />
                    <br/>
                    <Street
                      handleChange={this.handleChange}
                      street={this.state.street} />
                    <br/>
                    <CityZip
                      handleChange={this.handleChange}
                      city={this.state.city}
                      zipcode={this.state.zipcode} />
                    <br/>
                    <StateCountry
                      handleChange={this.handleChange}
                      state={this.state.state}
                      country={this.state.country}
                      countryOption={countryOption} />
                    <br/>
                    <br/><br/>
                    <div className="clearfix">
                      <div className="col-xs-11 col-lg-offset-1">
                        <button className="btn btn-success btn-style btn-blue" type="submit">Add Address</button>&nbsp;
                        <Link to={`/`}>
                          <span className="btn btn-default btn-style">Cancel</span>
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

Addaddress.propTypes = propTypes;
export default Addaddress;
