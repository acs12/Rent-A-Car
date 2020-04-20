import React from "react";

class VehicleCell extends React.Component {
  render() {
    return (
      <div className="vehicleCell">
        <div className="vehicleBox">
          <label>Name</label>
          <h4>{this.props.vehicle.carname === undefined && "Buggati"}</h4>
        </div>
        <div className="vehicleBox">
          <label>Type</label>
          <h4>{this.props.vehicle.type}</h4>
        </div>
        <div className="vehicleBox">
          <label>Rent</label>
          <h4>{this.props.vehicle.price}</h4>
        </div>
        <div className="vehicleBox">
          <button className="btn btn-primary">Book</button>
        </div>
      </div>
    );
  }
}

export default VehicleCell;
