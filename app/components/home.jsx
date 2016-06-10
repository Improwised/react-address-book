import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { Router } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import $ from 'jquery';
import reactCookie from 'react-cookie';
import Addresses from '../../assets/js/address.js';
import AddressList from './tableComponent/addresslist';

const propTypes = {};

// Home Component
class Home extends Component {

  constructor() {
    super();
    this.state = {
      addresses: [],
      showModal: false,
      id: '',
      name: '',
    };
    this.deleteAddress = this.deleteAddress.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  // Delete Address
  deleteAddress () {
    var number = this.state.id;
    this.state.addresses.splice(number, 1);
    reactCookie.save('data', this.state.addresses);
    $('#removeMsg').addClass('show');
    $('#removeMsg').removeClass('hide');
    this.setState({addresses: this.state.addresses, showModal: false});
    setTimeout(function() {
      $('#removeMsg').addClass('hide');
      $('#removeMsg').removeClass('show');
    }, 2000);
  }

  close () {
    this.setState({ showModal: false });
  }

  open (event) {
    var number = event.target.id;
    // Get Cokkie Data
    var data = reactCookie.load('data');
    var name = data[number].name.firstname+ ' ' + data[number].name.lastname;
    this.setState({ showModal: true, id: number, name: name });
  }

  // Search Method
  doSearch (event) {
    var addressList = reactCookie.load('data');
    var query = (event.target.value).toString();

    //get query result
    var queryResult=[];
    if (query !== '') {
      addressList.forEach(function(address){
        if(address.name.firstname.toLowerCase().indexOf(query.toLowerCase())!=-1) {
          queryResult.push(address);
        } else if (address.name.lastname.toLowerCase().indexOf(query.toLowerCase())!=-1){
          queryResult.push(address);
        } else if (address.phoneno.toString().indexOf(query.toLowerCase())!=-1){
          queryResult.push(address);
        } else if (address.address.street.toLowerCase().indexOf(query.toLowerCase())!=-1){
          queryResult.push(address);
        } else if (address.address.city.toLowerCase().indexOf(query.toLowerCase())!=-1){
          queryResult.push(address);
        } else if (address.address.state.toLowerCase().indexOf(query.toLowerCase())!=-1){
          queryResult.push(address);
        } else if (address.address.zipcode.toString().indexOf(query.toLowerCase())!=-1){
          queryResult.push(address);
        } else if (address.address.country.toLowerCase().indexOf(query.toLowerCase())!=-1){
          queryResult.push(address);
        }
      });
    } else {
      queryResult = reactCookie.load('data');
    }
    this.setState({ addresses: queryResult });
  }

  componentWillMount () {
    var addressList = reactCookie.load('data');
    if( addressList == undefined || addressList.length == 0){
      addressList = Addresses;
      reactCookie.save('data',Addresses);
    }
    this.setState({addresses: addressList});
  }

  render () {
    // Create Address List
    var addressRows = this.state.addresses.map(function(i,number){
      return (
        <tr key={number}>
          <td className="text-left">{String(i.name.firstname)} {String(i.name.lastname)}</td>
          <td className="text-left">{String(i.address.street)}<br/>{String(i.address.city)}-{String(i.address.zipcode)},<br/>{String(i.address.state)},<br/>{String(i.address.country)}.</td>
          <td className="text-center">{String(i.phoneno)}</td>
          <td className="text-center">
            <Link to={`/edit-address/${number}`}>
              <span className="glyphicon glyphicon-pencil icon icon-edit"></span>
            </Link>&nbsp;
            <span className="glyphicon glyphicon-remove icon icon-delete" id={number} onClick={this.open}></span>
          </td>
        </tr>
      )
    }.bind(this));
    return (
      <div>
        <div className="clearfix">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div id="removeMsg" className="alert alert-danger hide" role="alert">Address Successfully Deleted</div>
                <div id="addMsg" className="alert alert-success hide" role="alert">Address Successfully Added</div>
                <div className="block">
                  <div className="block-header">
                    <div className="clearfix">
                      <div className="block-title pull-left">
                        <h2>List of Address</h2>
                      </div>
                      <div className="add-address pull-right">
                        <Link to={`/add-address`}><span className="glyphicon glyphicon-plus"></span>&nbsp;Add New Address</Link>
                      </div>
                    </div>
                  </div>
                  <div className="block-content">
                    <div className="clearfix">
                      <div className="input-group"  style={{width: '300px'}}>
                        <input type="text" className="form-control" onChange={this.doSearch} ng-model="SearchAddress" placeholder="Search Address"/>
                        <span className="input-group-addon"><span className="glyphicon glyphicon-search" onClick={this.doSearch}></span></span>
                      </div>
                    </div>
                    <hr/>
                    <AddressList addressRows={addressRows} />
                  </div>
                  <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                      <Modal.Title>Confirmation Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p> Are you sure you want to delete address of {this.state.name}? </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={this.close}>Close</Button>
                      <Button bsStyle="danger" onClick={this.deleteAddress}>Confirm</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

Home.propTypes = propTypes;
export default Home;
