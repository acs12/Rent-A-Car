import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "../../../styles/dashboard.styles.css";
import { cancelBooking, returnCar } from "../../../redux/actions/bookingAction";
import CommentModal from "../../Common/CommentModal";

class BookingCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showModal : false};
    this.onCancelBooking = this.onCancelBooking.bind(this);
    this.onCarReturn = this.onCarReturn.bind(this);
  }

  onCancelBooking(e) {
    e.preventDefault();
    this.props.cancelBooking(this.props.reservation._id, result => {});
  }

  onCarReturn(e) {
    e.preventDefault();
    if (this.state.showModal) {
      const data = {};
    }else {
      this.setState({showModal : true})
    }
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
            <label>Car Name</label>
            <h4>{this.props.reservation.vehicle.carname}</h4>
          </div>
          <div className="vehicleBox">
            <label>Type</label>
            <h4>{this.props.reservation.pickupLocation.name}</h4>
          </div>
          <div className="vehicleBox">
            <label>Rent</label>
            <h4>{this.props.reservation.returnLocation.name}</h4>
          </div>

          {this.props.reservation.returned === false && (
            <div>
              <button className="btn btn-primary" onClick={this.onCarReturn}>
                Return Car
              </button>

              <button className="btn btn-red" onClick={this.onCancelBooking}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(null, { cancelBooking, returnCar })(BookingCell);
