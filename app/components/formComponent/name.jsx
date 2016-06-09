import React, { PropTypes } from 'react';

const propTypes = {
  handleChange: PropTypes.func,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
};

function Name(props) {
  return (
    <div className="clearfix">
      <div className="col-lg-2 col-lg-offset-1 form-lable">
        <label>Name:</label>
      </div>
      <div className="col-lg-4">
        <input type="text" className="form-control" id="firstname" placeholder="First Name" name="firstname" minlength="2" value={props.firstname} onChange={props.handleChange} required/>
      </div>
      <div className="hidden-lg"><br/></div>
      <div className="col-lg-4">
        <input type="text" className="form-control" id="lastname" placeholder="Last Name" name="lastname"  minlength="2" value={props.lastname} onChange={props.handleChange} required/>
      </div>
      <br/>
    </div>
  );
}

Name.propTypes = propTypes;
export default Name;
