import React, { PropTypes } from 'react';

const propTypes = {
  handleChange: PropTypes.func,
  city: PropTypes.string,
  zipcode: PropTypes.string,
};

function CityZip(props) {
  return (
    <div className="clearfix">
      <div className="col-lg-2 col-lg-offset-1 form-lable">
      </div>
      <div className="col-lg-4">
        <input type="text" className="form-control" id="city" placeholder="Your City" name="city" value={props.city} onChange={props.handleChange} required/>
      </div>
      <div className="hidden-lg"><br/></div>
      <div className="col-lg-4">
        <input type="number" className="form-control" id="zipcode" placeholder="Enter Zipcode" name="zipcode" maxLength="6" minlength="6" value={props.zipcode} onChange={props.handleChange} required/>
      </div>
    </div>
  );
}

CityZip.propTypes = propTypes;
export default CityZip;
