import React from "react";
import Navigationbar from "../Common/Navigation-Related/Navigation";
import CommentModal from "../Common/CommentModal";
import { connect } from "react-redux";
import { fetchMyBookings } from "../../redux/actions/fetchAction";
import ItemFactory from "../Common/Navigation-Related/NavItemFactory";
import "../../styles/dashboard.styles.css";
import BookingCell from "./Cells/BookingCell";

class VehicleBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: "" };
    this.fetchMyBookings = this.fetchMyBookings.bind(this);
  }

  componentDidMount() {
    this.fetchMyBookings();
  }

  fetchMyBookings() {
    this.props.fetchMyBookings(localStorage.getItem("id"), result => {});
  }

  render() {
    let tempItems = [
      {
        name: "Vehicles",
        to: "/dashboard",
        active: false
      },
      {
        name: "Rental Locations",
        to: "/locations",
        active: false
      },
      {
        name: "My Reservations",
        to: "/reservations",
        active: true
      }
    ];
    let items = ItemFactory(tempItems);
    const commentModal = (
        <CommentModal show={true} title = "Give some feedback ?">
          <div class="form-group">
            <label for="comments-area">Comments(optional)</label>
            <textarea class="form-control" id="comments-area" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label for="rate-experience">Rating(optional)</label>
            <select class="form-control" id="rate-experience">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="rate-condition">Condition(optional)</label>
            <select class="form-control" id="rate-condition">
              <option>Good</option>
              <option>Needs Cleaning</option>
              <option>Needs Servicing</option>
            </select>
          </div>
        </CommentModal>
      );
    return (
      <div>
        <Navigationbar navItems={items} />
        <div className="carDetails">
          <h4>Active Reservations</h4>
          {this.props.reservation.returned !== undefined && (
            <BookingCell
              key={this.props.reservation._id}
              reservation={this.props.reservation}
            />
          )}
          {this.props.reservation.returned === undefined && (
            <h6>No Reservations</h6>
          )}
        </div>
        <div className="carDetails">
          <h4>Reservations History </h4>
          {this.props.reservationHistory.length !== 0 &&
            this.props.reservationHistory.map(rh => {
              return <BookingCell key={rh._id} reservation={rh} />;
            })}
          {this.props.reservationHistory.length === 0 && (
            <h6>No Reservations</h6>
          )}
        </div>
      </div>
    );
  }
}

const matchStateToProps = state => {
  return {
    reservation: state.reservations.reservation,
    reservationHistory: state.reservations.reservationHistory
  };
};

export default connect(matchStateToProps, { fetchMyBookings })(VehicleBooking);
