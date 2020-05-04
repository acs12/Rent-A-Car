import React from "react";
import { setCurrentVehicle } from "../../../redux/actions/setAction";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "../../../styles/dashboard.styles.css";

class VehicleCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.moveToVehicleSelection = this.moveToVehicleSelection.bind(this);
  }

  moveToVehicleSelection(e) {
    e.preventDefault();

    if (this.props.bookVehicle !== undefined) {
      return this.props.bookVehicle(this.props.vehicle)
    }

    this.setState(
      {
        moveToVehicleDetail: true
      },
      () => {
        this.props.setCurrentVehicle(this.props.vehicle);
      }
    );
  }

  render() {
    let navLink = undefined;

    if (this.state.moveToVehicleDetail) {
      navLink = <Redirect to={`vehicledetail/${this.props.vehicle._id}`} />;
    }
    return (
      <div>
        <div className="vehicleCell">
          {navLink}
          <div className="vehicleBox">
            <label>Name</label>
            <h4>{this.props.vehicle.carname}</h4>
          </div>
          <div className="vehicleBox">
            <label>Type</label>
            <h4>{this.props.vehicle.type.category}</h4>
          </div>
          <div className="vehicleBox">
            <label>Rent</label>
            <h4>{this.props.vehicle.type.hourlyRate}</h4>
          </div>
          <div className="vehicleBox">
            <label>Available At</label>
            <h4>
              {this.props.vehicle.rentalLocation !== null &&
                this.props.vehicle.rentalLocation.name}
            </h4>
          </div>
          <div className="vehicleButton">
            <button
              className="btn btn-primary"
              onClick={this.moveToVehicleSelection}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { setCurrentVehicle })(VehicleCell);
