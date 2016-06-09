import React, { PropTypes } from 'react';

const propTypes = {
  addressRows: PropTypes.array,
};

function AddressList(props) {
  if (props.addressRows.length > 0) {
    return (
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
          {props.addressRows}
        </tbody>
      </table>
    );
  } else {
    return (
      <h1 className="text-center no-record-found"> No Record Found </h1>
    );
  }
}

AddressList.propTypes = propTypes;
export default AddressList;
