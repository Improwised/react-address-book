import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { Router } from 'react-router';
import reactCookie from 'react-cookie';
import AddressList from './tableComponent/addresslist';


const propTypes = {};

// Home Component
class Home extends Component {

  constructor() {
    super();
    this.state = {
      addresses: ''
    };
    this.deleteAddress = this.deleteAddress.bind(this);
    this.doSearch = this.doSearch.bind(this);
  }

  // Delete Address
  deleteAddress (number) {
    this.state.addresses.splice(number, 1);
    reactCookie.save('data', this.state.addresses);
    this.setState({addresses: this.state.addresses});
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
      addressList = addressbook;
      reactCookie.save('data',addressbook);
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
            <span className="glyphicon glyphicon-remove icon icon-delete" onClick={this.deleteAddress.bind(null,number)}></span>
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
                <div className="alert alert-danger hide" role="alert">Address Successfully Deleted</div>
                <div className="alert alert-success hide" role="alert">Address Successfully Added</div>
                <div className="block">
                  <div className="block-header">
                    <div className="clearfix">
                      <div className="block-title pull-left">
                        <h2>List of Address</h2>
                      </div>
                      <div className="add-address pull-right">
                        <a href="#/add-address"><span className="glyphicon glyphicon-plus"></span>&nbsp;Add New Address</a>
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
