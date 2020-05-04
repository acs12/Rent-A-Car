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
import {Redirect} from 'react-router-dom'


class VehicleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: "" };
    this.getVehicle();
    this.handleDropDownSearchText = this.handleDropDownSearchText.bind(this);
    this.submitBooking = this.submitBooking.bind(this);
    this.handleAction = this.handleAction.bind(this);
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

  submitBooking(e) {

    let vehicleID = this.props.match.params.vid
    let pickupLocationID = this.state.pickupLocationID
    console.log('######################## VEHICLE', e)
    if (e.carname !== undefined){
      vehicleID = e._id
      pickupLocationID = e.rentalLocation._id
    }else {
      e.preventDefault();
    }
    var threeDaysLater = new Date();
    var numberOfDaysToAdd = 3;
    threeDaysLater.setDate(threeDaysLater.getDate() + numberOfDaysToAdd);
    threeDaysLater = Date.parse(threeDaysLater);
    const selectedDate = Date.parse(this.state.expectedReturnTime);
    if (selectedDate > threeDaysLater) {
      return this.setState({
        error: "Please choose a return date withing 3 days!"
      });
    }

    let values = {
      user: localStorage.getItem("id"),
      vehicle: vehicleID,
      pickupLocation: pickupLocationID,
      returnLocation: this.state.returnLocationID,
      pickupTime: this.state.pickupTime,
      expectedReturnTime: this.state.expectedReturnTime
    };
    this.props.book(values, result => {
      if (result.data !== undefined && result.data.message) {
        this.setState({ error: result.data.message });
      }else {
        this.setState({
          redirectVar : <Redirect to={"/reservations"} />
        })
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
        clicked: this.handleAction
      };
      temp.push(tempElememt);
    });

    this.props.locations.forEach(element => {
      let tempElememt = {
        name: "returnLocationID",
        value: element._id,
        displayValue: element.name,
        clicked: this.handleAction
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
        <Navigationbar navItems={items} />
        <div className="vehicleBrowser">
          <div className="card carContainer">
            <div className="carDetails">
              Carname : {this.props.selectedVehicle.carname}
            </div>
            <div className="carDetails">
              Rental Location :{" "}
              {this.props.selectedVehicle.rentalLocation !== undefined &&
                this.props.selectedVehicle.rentalLocation.name}
            </div>
            <div className="carDetails">
              Hourly Rate :{" "}
              {this.props.selectedVehicle.type !== undefined &&
                this.props.selectedVehicle.type.hourlyRate}
            </div>
          </div>
          <div className = "carContainer">
            <DropDown
              title={"Pickup Location"}
              items={dditems}
              searchHandler={this.handleDropDownSearchText}
            />
          </div>

          {this.state.pickupLocationID !== undefined && (
            <div className = "carContainer">
            <DropDown
              title={"Return Location"}
              items={returnddItems}
              searchHandler={this.handleDropDownSearchText}
            />
            </div>
          )}

          {this.state.returnLocationID !== undefined && (
            <div className = "carContainer">
              <MDBInput
                name="pickupTime"
                type="date"
                label="Start Date"
                onChange={this.handleAction}
                outline
              />
              </div>
          )}

          {this.state.pickupTime !== undefined && (
            <div className = "carContainer">
              <MDBInput
                name="expectedReturnTime"
                type="date"
                label="End Date"
                onChange={this.handleAction}
                outline
              />
              </div>
          )}
          <h4>{this.state.error}</h4>
          {(
              <button className="btn btn-primary" onClick={this.submitBooking}>
                Book
              </button>
            )}

          {this.props.vehicles.map(v => {
            return <VehicleCell bookVehicle = {this.submitBooking} vehicle={v} />;
          })}
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