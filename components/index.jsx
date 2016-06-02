var Index = React.createClass({
  getInitialState: function() {
      var addressList = reactCookie.load('data');
      console.log(addressList);
      if( addressList == undefined || addressList.length == 0){
        addressList = addressbok;
        reactCookie.save('data',addressbok);
      }
      return {addresses: addressList};
  },
  deleteAddress:function(number) {
    this.setState(state => {
        state.addresses.splice(number, 1);
        reactCookie.save('data', state.addresses);
        return {addresses: state.addresses};
    });
  },
	render:function (argument) {
    var ideas = this.state.addresses.map(function(i,number){
      return (
        <tr key={number}>
          <td className="text-left">{String(i.name.firstname)} {String(i.name.lastname)}</td>
          <td className="text-left">{String(i.address.street)}<br/>{String(i.address.city)}-{String(i.address.zipcode)},<br/>{String(i.address.state)},<br/>{String(i.address.country)}.</td>
          <td className="text-center">{String(i.phoneno)}</td>
          <td className="text-center">
            <span className="glyphicon glyphicon-pencil icon icon-edit"></span>&nbsp;
            <span className="glyphicon glyphicon-remove icon icon-delete" onClick={this.deleteAddress.bind(null,number)}></span>
          </td>
        </tr>
      ) 
    }.bind(this));
    return(
      <div>
  			<div className="container">
  	      <h1>Hello Tapan</h1>    
  	    </div>
        <div className="clearfix">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="alert alert-danger" ng-show="sucessAddressDelete" role="alert">Address Successfully Deleted</div>
                <div className="block">
                  <div className="block-header">
                    <div className="clearfix">
                      <div className="block-title pull-left">
                        <h2>List of Address</h2>
                      </div>
                      <div className="add-address pull-right">
                        <a href="#/add_address"><span className="glyphicon glyphicon-plus"></span>&nbsp;Add New Address</a>
                      </div>
                    </div>
                  </div>
                  <div className="block-content">
                    <div className="clearfix">
                      <div className="input-group"  style={{width: '300px'}}>
                        <input type="text" className="form-control" ng-model="SearchAddress" placeholder="Search Address"/>
                        <span className="input-group-addon"><span className="glyphicon glyphicon-search"></span></span>
                      </div>
                    </div>
                    <hr/>
                    <table className="table table-hover address-table">
                      <thead>
                        <tr>
                          <th className="text-left">Name</th>
                          <th className="text-left th-width">Address</th>
                          <th className="text-center">Phone Number</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ideas}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
		)
	}
});



var AddAddressParent = React.createClass({
  render: function(){
    return (
      <AddAddressChild title="Add New Address"></AddAddressChild>
    )
  }
});


var AddAddressChild = React.createClass({
  getInitialState: function() {
    return {firstName:'',lastname:'',phoneno:'',street:'',state:'',city:'',zipcode:'',country:''};
  },
  handleChange: function(stateName) {
    var obj = { [stateName] : event.target.value };
    this.setState(obj);
  },
  handleSubmit: function(e) { 
    e.preventDefault();
    var formSubmit = $('#addAddress').validate({
      rules: {
        firstname: {
          required: true,
          minlength: 2 
        },
        lastname: {
          required: true,
          minlength: 2 
        },
        no:{
          required: true,
          maxlength: 10,
          minlength: 10,
          number: true
        },
        street:{
          required: true
        },
        city:{
          required: true
        },
        zipcode: {
          required: true,
          minlength: 6,
          maxlength: 6
        },
        state: {
          required: true
        },
        country: {
          required: true
        }
      },
      messages: {
        firstname: {
          required: "Please Enter Your First Name",
          minlength: "Too short!"
        },
        lastname: {
          required: "Please Enter Your Last Name",
          minlength: "Too short!"
        },
        no:{
          required: "Please Enter Your 10 Digit Number",
          maxlength: "Sorry , This is Invalid Number",
          minlength: "Sorry , This is Invalid Number",
          number: "Please Provide Valid Number"
        },
        street:{
          required: "Please Enter Your Street"
        },
        city:{
          required: "Please Enter Your City"
        },
        zipcode: {
          required: "Please Enter Your Zipcode",
          minlength: "Too short!",
          maxlength: "Too large!"
        },
        state: {
          required: "Please Enter Your State"
        },
        country: {
          required: "Please Enter Your Country"
        }
      }
    });

    if(formSubmit.form()){
      var data = reactCookie.load('data');
      console.log(data);
      var id = reactCookie.load('data').length-1;
      var new_address = {
        "id": data[id].id + 1,
        "name": {'firstname':this.state.firstName,'lastname':this.state.lastname },
        "phoneno": this.state.phoneno,
        "address":{
          'street'  : this.state.street,
          'state'   : this.state.state ,
          'city'    : this.state.city,
          'zipcode' : this.state.zipcode,
          'country' : this.state.country
        }
      };
      data.push(new_address);
      reactCookie.remove('data');
      reactCookie.save('data',data);
      $('#notification').addClass('show');
      $('#notification').removeClass('hide');
      $("#msg").html('New address Added');
      setTimeout(
        function() { 
          $('#notification').addClass('hide');
          $('#notification').removeClass('show');
        }, 2000
      );
      formSubmit.resetForm();//remove error class on name elements and clear history
      formSubmit.reset();//remove all error and success data
      this.reset();
    }
  },
  reset: function() {
    this.setState({
      firstName:'',lastname:'',phoneno:'',street:'',state:'',city:'',zipcode:'',country:''
    });
  },
  render:function (argument) {
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
                      <h2>{this.props.title}</h2>
                    </div>
                  </div>
                </div>

                <div className="block-content">

                  <form id="addAddress" onSubmit={this.handleSubmit}>

                    <div className="clearfix">
                      <div className="col-lg-2 col-lg-offset-1 form-lable">
                        <label>Name:</label>
                      </div>
                      <div className="col-lg-4">
                        <input type="text" className="form-control" placeholder="First Name" name="firstname" minlength="2" value={this.state.firstName} onChange={this.handleChange.bind(null,'firstName')} />
                      </div>
                      <div className="hidden-lg"><br/></div>
                      <div className="col-lg-4">
                        <input type="text" className="form-control" placeholder="Last Name" name="lastname"  minlength="2" value={this.state.lastname} onChange={this.handleChange.bind(null,'lastname')}/>
                      </div>
                    </div>
                    <br/>





                    <div className="clearfix">
                      <div className="col-lg-2 col-lg-offset-1 form-lable">
                        <label>Phone Number:</label>
                      </div>
                      <div className="col-lg-8">
                        <input type="text" className="form-control" placeholder="10 Digit Phone Number" name="no" maxLength="10" minLength="10" value={this.state.phoneno} onChange={this.handleChange.bind(null,'phoneno')}/>
                      </div>
                    </div>
                    
                    <br/>

                    <div className="clearfix">
                      <div className="col-lg-2 col-lg-offset-1 form-lable">
                        <label>Address:</label>
                      </div>
                      <div className="col-lg-8">
                        <input type="text" className="form-control" placeholder="Your Street" name="street" value={this.state.street} onChange={this.handleChange.bind(null,'street')}/>
                      </div>
                    </div>
                    
                    <br/>

                    <div className="clearfix">
                      <div className="col-lg-2 col-lg-offset-1">
                      </div>
                      <div className="col-lg-4">
                        <input type="text" className="form-control" placeholder="Your City" name="city"  value={this.state.city} onChange={this.handleChange.bind(null,'city')}/>
                      </div>
                      <div className="hidden-lg"><br/></div>
                      <div className="col-lg-4">
                        <input type="text" className="form-control" placeholder="Enter Zipcode" name="zipcode" maxLength="6" minlength="6" value={this.state.zipcode} onChange={this.handleChange.bind(null,'zipcode')}/>
                      </div>
                    </div>
                    
                    <br/>

                    <div className="clearfix">
                      <div className="col-lg-2 col-lg-offset-1">
                      </div>
                      <div className="col-lg-4">
                        <input type="text" className="form-control" placeholder="Your State" name="state" value={this.state.state} onChange={this.handleChange.bind(null,'state')}/>
                      </div>
                      <div className="hidden-lg"><br/></div>
                      <div className="col-lg-4">                      
                        <input type="text" className="form-control" placeholder="Enter Country" name="country" value={this.state.country} onChange={this.handleChange.bind(null,'country')}/>                 
                      </div>
                    </div>
                    
                    <br/><br/>

                    <div className="clearfix">
                      <div className="col-xs-11 col-lg-offset-1">
                        <button className="btn btn-success btn-style btn-blue" type="submit">Add Address</button>
                        <a href="#/" className="btn btn-default btn-style">Cancel</a>
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
});