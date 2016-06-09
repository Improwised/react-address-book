import React, { PropTypes } from 'react';

const propTypes = {
  handleChange: PropTypes.func,
  street: PropTypes.string,
};

function Street(props) {
  return (
    <div className="clearfix">
      <div className="col-lg-2 col-lg-offset-1 form-lable">
        <label>Address:</label>
      </div>
      <div className="col-lg-8">
        <input type="text" className="form-control" id="street" placeholder="Your Street" name="street" value={props.street} onChange={props.handleChange} required/>
      </div>
    </div>
  );
}

Street.propTypes = propTypes;
export default Street;
