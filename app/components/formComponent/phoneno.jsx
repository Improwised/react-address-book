import React, { PropTypes } from 'react';

const propTypes = {
  handleChange: PropTypes.func,
  phoneno: PropTypes.string,
};

function Phoneno(props) {
  return (
    <div className="clearfix">
      <div className="col-lg-2 col-lg-offset-1 form-lable">
        <label>Phone Number:</label>
      </div>
      <div className="col-lg-8">
        <input type="number" className="form-control" id="phoneno" placeholder="10 Digit Phone Number" name="no" maxLength="10" minLength="10" value={props.phoneno} onChange={props.handleChange} required/>
      </div>
    </div>
  );
}

Phoneno.propTypes = propTypes;
export default Phoneno;
