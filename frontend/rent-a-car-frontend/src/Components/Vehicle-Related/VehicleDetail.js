import React from "react";
import Navigationbar from "../Common/Navigation-Related/Navigation";
import { connect } from "react-redux";
import ItemFactory from "../Common/Navigation-Related/NavItemFactory";
import { fetchVehicle } from "../../redux/actions/fetchAction";
import "../../styles/dashboard.styles.css";
import { MDBInput } from "mdbreact";
import DropDown from "../Common/Navigation-Related/DropDownComponent";
import { fetchLocations } from "../../redux/actions/fetchAction";
import { book } from "../../redux/actions/bookingAction";
import DDFactory from "../Common/Navigation-Related/DropDownItemFactory";
import VehicleCell from "../Dashboard/Cells/VehicleCell";
import { Redirect } from "react-router-dom";
import VehicleDetailCell from "./Cells/VehiclePriceDetail";
import Grid from "@material-ui/core/Grid";
import DateTimePicker from "react-datetime-picker";
import CommentView from "./CommentView";
import Datetime from "react-datetime";
import "../../styles/datetime.css";
require("react-datetime");

class VehicleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      date: new Date(),
      pickupName: "Pickup Location",
      returnName: "Return Location"
    };
    this.getVehicle();
    this.handleDropDownSearchText = this.handleDropDownSearchText.bind(this);
    this.submitBooking = this.submitBooking.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.handlePickupTimeAction = this.handlePickupTimeAction.bind(this);
    this.handleReturnTimeAction = this.handleReturnTimeAction.bind(this);

    this.handleReturnLocationAction = this.handleReturnLocationAction.bind(
      this
    );
    this.handlePickupLocationAction = this.handlePickupLocationAction.bind(
      this
    );
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
    });
  }

  async getVehicle() {
    if (
      this.props.selectedVehicle.type === undefined ||
      this.props.selectedVehicle.type === null
    ) {
      await this.props.fetchVehicle(this.props.match.params.vid, result => {
        console.log(result);
      });
    }
  }

  handleAction(e) {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handlePickupLocationAction(e) {
    e.preventDefault();

    const location = this.props.locations.find(l => {
      return l._id === e.target.value;
    });
    this.setState({
      [e.target.name]: e.target.value,
      pickupName: location.name
    });
  }

  handleReturnLocationAction(e) {
    e.preventDefault();
    const location = this.props.locations.find(l => {
      return l._id === e.target.value;
    });
    this.setState({
      [e.target.name]: e.target.value,
      returnName: location.name
    });
  }

  handlePickupTimeAction(e) {
    this.setState({
      pickupTime: e._d
    });
  }

  handleReturnTimeAction(e) {
    this.setState({
      expectedReturnTime: e
    });
  }

  submitBooking(e) {
    let vehicleID = this.props.match.params.vid;
    let pickupLocationID = this.state.pickupLocationID;
    if (e.carname !== undefined) {
      vehicleID = e._id;
      pickupLocationID = e.rentalLocation._id;
    } else {
      e.preventDefault();
    }
    var threeDaysLater = new Date();
    var oneDayLater = new Date();
    var numberOfDaysToAdd = 3;
    threeDaysLater.setDate(threeDaysLater.getDate() + numberOfDaysToAdd);
    threeDaysLater = Date.parse(threeDaysLater);

    const selectedDate = Date.parse(this.state.expectedReturnTime);
    const pickupDate = Date.parse(this.state.pickupTime);
    oneDayLater.setDate(oneDayLater.getDate());
    oneDayLater = Date.parse(oneDayLater);
    if (selectedDate > threeDaysLater) {
      return this.setState({
        error: "Please choose a return date withing 3 days!"
      });
    }

    if (selectedDate <= new Date()) {
      return this.setState({
        error: "Please choose a valid return date!"
      });
    }

    if (pickupDate <= new Date()) {
      return this.setState({
        error: "Please choose a valid pickup date!"
      });
    }

    if (pickupDate >= selectedDate) {
      return this.setState({
        error: "Please choose a valid timeline"
      });
    }

    let values = {
      user: localStorage.getItem("id"),
      vehicle: vehicleID,
      pickupLocation: this.props.selectedVehicle.rentalLocation._id,
      returnLocation: this.state.returnLocationID,
      pickupTime: this.state.pickupTime,
      expectedReturnTime: this.state.expectedReturnTime
    };

    this.props.book(values, result => {
      if (result.data !== undefined && result.data.message) {
        this.setState({ error: result.data.message });
      } else {
        if (result.status === 200) {
          this.setState({
            redirectVar: <Redirect to={"/reservations"} />
          });
        } else {
          this.setState({ error: "Something went wrong!" });
        }
      }
    });
  }

  handleDropDownSearchText(text) {
    this.props.fetchLocations(text, result => {
      console.log(result);
    });
  }

  render() {
    let temp = [];
    let returnLocID = [];
    this.props.locations.forEach(element => {
      let tempElememt = {
        name: "pickupLocationID",
        value: element._id,
        displayValue: element.name,
        clicked: this.handlePickupLocationAction
      };
      temp.push(tempElememt);
    });

    this.props.locations.forEach(element => {
      let tempElememt = {
        name: "returnLocationID",
        value: element._id,
        displayValue: element.name,
        clicked: this.handleReturnLocationAction
      };
      returnLocID.push(tempElememt);
    });

    let dditems = DDFactory(temp);
    let returnddItems = DDFactory(returnLocID);
    let tempItems = [
      {
        name: "Vehicles",
        to: "/dashboard",
        active: true
      },
      {
        name: "Rental Locations",
        to: "/locations",
        active: false
      },
      {
        name: "My Reservations",
        to: "/reservations",
        active: false
      }
    ];
    let items = ItemFactory(tempItems);

    return (
      <div>
        {this.state.redirectVar}
        <Navigationbar navItems={items} isUser={true} />
        <div className="list-container">
          <div className="row">
            <div className="col-4">
              {this.props.selectedVehicle.type !== undefined && (
                <VehicleDetailCell vehicle={this.props.selectedVehicle} />
              )}

              {this.props.selectedVehicle.ratings &&
                this.props.selectedVehicle.ratings.length !== 0 && (
                  <div>
                    <CommentView
                      comments={this.props.selectedVehicle.ratings}
                    />
                  </div>
                )}
            </div>
            <div className="col-8">
              {this.props.vehicles !== undefined &&
                this.props.vehicles.length == 0 && (
                  <div style = {{margin : "16px auto", width : "80%"}}>

                      <div style={{ marginTop: 32 }}>
                        <label>Select a Drop Location</label>
                        <DropDown
                          id="return-dd"
                          title={this.state.returnName}
                          items={returnddItems}
                          searchHandler={this.handleDropDownSearchText}
                        />
                      </div>
                    
                    {this.state.returnLocationID && (
                      <div style={{ marginTop: 32, width: "60%" }}>
                        <label>What time will you pickup ?</label>
                        <Datetime onChange={this.handlePickupTimeAction} />
                      </div>
                    )}

                    {this.state.pickupTime && (
                      <div style={{ marginTop: 32, width: "60%" }}>
                      <label>What time will you return ?</label>
                        <Datetime
                          onChange={this.handleReturnTimeAction}
                          style={{ width: "50%" }}
                        />
                      </div>
                    )}

                    {this.state.expectedReturnTime && (
                      <div style = {{marginTop : 32}}>
                      <button
                        className="btn btn-primary"
                        onClick={this.submitBooking}
                      >
                        Book!
                      </button>
                      </div>
                    )}
                  </div>
                )}
              
              <div style = {{margin : "16px auto", width : "80%"}}><h4>{this.state.error}</h4></div>
              <div style={{ margin: "16px", padding: 8 }}>
                <Grid container spacing={1}>
                  {this.props.vehicles.map(v => {
                    return (
                      <VehicleCell
                        bookVehicle={this.submitBooking}
                        vehicle={v}
                      />
                    );
                  })}
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const matchStateToProps = state => {
  return {
    selectedVehicle: state.vehicles.selectedVehicle,
    locations: state.locations.data,
    vehicles: state.vehicles.data
  };
};

export default connect(matchStateToProps, {
  fetchVehicle,
  fetchLocations,
  book
})(VehicleDetail);
