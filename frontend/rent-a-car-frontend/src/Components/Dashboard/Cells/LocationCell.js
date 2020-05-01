import React from "react";

class LocationCell extends React.Component {
  render() {
    return (
      <div className="vehicleCell">
        <div className="vehicleBox">
          <label>Location Name</label>
          <h4>{this.props.location.name}</h4>
        </div>
        <div className="vehicleBox">
          <label>Capacity</label>
          <h4>{this.props.location.capacity}</h4>
        </div>
        <div className="vehicleBox">
          <label>Address</label>
          <h4>{this.props.location.address}</h4>
        </div>
        <div className="vehicleBox">
          <label>Available Vehicles</label>
          <h4>{this.props.location.vehicles.length}</h4>
        </div>
        <div className="vehicleBox">
          <button className="btn btn-primary">View</button>
        </div>
      </div>
    );
  }
}

export default LocationCell;
