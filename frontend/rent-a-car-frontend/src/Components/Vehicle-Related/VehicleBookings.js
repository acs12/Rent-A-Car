import React from "react";
import Navigationbar from "../Common/Navigation-Related/Navigation";
import CommentModal from "../Common/CommentModal";
import { connect } from "react-redux";
import { fetchMyBookings } from "../../redux/actions/fetchAction";
import { returnCar } from "../../redux/actions/bookingAction";
import ItemFactory from "../Common/Navigation-Related/NavItemFactory";
import "../../styles/dashboard.styles.css";
import BookingCell from "./Cells/BookingCell";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { cancelBooking } from "../../redux/actions/bookingAction";

class VehicleBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: "", showModal: false };
    this.fetchMyBookings = this.fetchMyBookings.bind(this);
    this.handleReturnClick = this.handleReturnClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCancelBooking = this.handleCancelBooking.bind(this);
  }

  componentDidMount() {
    this.fetchMyBookings();
  }

  fetchMyBookings() {
    this.props.fetchMyBookings(localStorage.getItem("id"), result => {});
  }

  handleClose(e) {
    const { comment, rating, condition, reservation } = this.state;
    if (Date.parse(reservation.pickupTime) - Date.now() < 0){
      alert('Please pickup before returning!')  
    }

    this.props.returnCar(
      reservation._id,
      { comment, rating, condition },
      (err, response) => {
        if (response.status === 200) {
          this.setState(prevState => {
            return {
              showModal: !prevState.showModal
            };
          });
        }
      }
    );
  }

  handleReturnClick(e) {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal,
        reservation: e
      };
    });
  }

  handleShowModal(e) {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal,
        reservation: e
      };
    });
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleCancelBooking(e) {
    this.props.cancelBooking(e._id, (err, result) => {});
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
      <CommentModal
        show={true}
        title="Give some feedback ?"
        closeTitle={"Close"}
        submitTitle={"Return Car"}
        onClose={this.handleShowModal}
        onSubmit={this.handleClose}
      >
        <div class="form-group">
          <label for="comments-area">Comments(optional)</label>
          <textarea
            name="comment"
            class="form-control"
            id="comments-area"
            rows="3"
            onChange={this.onChangeHandler}
          ></textarea>
        </div>
        <div class="form-group">
          <label for="rate-experience">Rating(optional)</label>
          <select
            name="rating"
            class="form-control"
            id="rate-experience"
            onChange={this.onChangeHandler}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        <div class="form-group">
          <label for="rate-condition">Condition(optional)</label>
          <select
            name="condition"
            class="form-control"
            id="rate-condition"
            onChange={this.onChangeHandler}
          >
            <option>Good</option>
            <option>Needs Cleaning</option>
            <option>Needs Servicing</option>
          </select>
        </div>
      </CommentModal>
    );
    return (
      <div>
        {this.state.redirectVar}
        <Navigationbar navItems={items} isUser={true} />
        <div className="list-container">
        <div  style = {{ margin : 16}}><h4>Active Reservations</h4></div>
          
          {this.state.showModal && commentModal}
          <div style={{ margin: "16px", padding: 8 }}>
            <Grid container spacing={1}>
              {this.props.reservation !== undefined &&
                this.props.reservation.returned !== undefined && (
                  <BookingCell
                    key={this.props.reservation._id}
                    reservation={this.props.reservation}
                    handleReturnClick={this.handleShowModal}
                    cancelBooking={this.handleCancelBooking}
                  />
                )}
            </Grid>
          </div>
          {this.props.reservation.returned === undefined && (
            <div  style = {{ margin : 16}}><h6>No Reservations</h6></div>
          )}

          <div  style = {{ margin : 16}}><h4>Reservations History</h4></div>
          
          <div style={{ margin: "16px", padding: 8 }}>
            <Grid container spacing={1}>
              {this.props.reservationHistory.length !== 0 &&
                this.props.reservationHistory.map(rh => {
                  return (
                    <div style={{ margin: "8px" }}>
                      <BookingCell
                        key={rh._id}
                        reservation={rh}
                        cancelBooking={this.handleCancelBooking}
                        handleReturnClick={this.handleReturnClick}
                      />
                    </div>
                  );
                })}
            </Grid>
          </div>
          {this.props.reservationHistory.length === 0 && 
            <div  style = {{ margin : 16}}><h6>No History!</h6></div>
            }
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

export default connect(matchStateToProps, {
  fetchMyBookings,
  returnCar,
  cancelBooking
})(VehicleBooking);
