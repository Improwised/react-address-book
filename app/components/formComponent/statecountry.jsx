import React, { PropTypes } from 'react';

const propTypes = {
  handleChange: PropTypes.func,
  state: PropTypes.string,
  country: PropTypes.string,
};

function StateCountry(props) {
  console.log(props.countryOption);
  return (
    <div className="clearfix">
      <div className="col-lg-2 col-lg-offset-1">
      </div>
      <div className="col-lg-4">
        <input type="text" className="form-control" id="state" placeholder="Your State" name="state" value={props.state} onChange={props.handleChange} required/>
      </div>
      <div className="hidden-lg"><br/></div>
      <div className="col-lg-4">
        <select className="form-control" id="country" value={props.country} placeholder="Enter Country" name="country" onChange={props.handleChange} required>{props.countryOption}</select>
      </div>
    </div>
  );
}

StateCountry.propTypes = propTypes;
export default StateCountry;
