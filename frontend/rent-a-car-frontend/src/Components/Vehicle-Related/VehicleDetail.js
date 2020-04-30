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

class VehicleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error : ''};
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
    e.preventDefault();
    let values = {
      user: "5ea947d90c22745e488eba33",
      vehicle: this.props.match.params.vid,
      pickupLocation: this.state.pickupLocationID,
      returnLocation: this.state.returnLocationID,
      pickupTime: this.state.pickupTime,
      expectedReturnTime: this.state.expectedReturnTime
    };
    this.props.book(values, result => {
        if(result.data !== undefined && result.data.message) {
          this.setState({error : result.data.message})
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
        <Navigationbar navItems={items} />
        <div className="vehicleBrowser">
          <div>
            <DropDown
              title={"Pickup Location"}
              items={dditems}
              searchHandler={this.handleDropDownSearchText}
            />
          </div>

          {this.state.pickupLocationID !== undefined && (
            <div>
              <DropDown
                title={"Return Location"}
                items={returnddItems}
                searchHandler={this.handleDropDownSearchText}
              />
            </div>
          )}

          {this.state.returnLocationID !== undefined && (
            <div>
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
            <div>
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
          {this.state.error.length === 0 && this.state.expectedReturnTime !== undefined && (
            <button className="btn btn-primary" onClick={this.submitBooking}>
              Book
            </button>
          )}

          {this.props.vehicles.map(v => {
            return <VehicleCell vehicle={v} />;
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
    vehicles : state.vehicles.data
  };
};

export default connect(matchStateToProps, {
  fetchVehicle,
  fetchLocations,
  book
})(VehicleDetail);

/**          <h2 align={"center"}>
            <b>Vehicle Details</b>
          </h2>

          <label>Name</label>
          <h4>
            {this.props.selectedVehicle.carname === undefined && "Buggati"}
          </h4>

          <label>Type</label>
          <h4>{this.props.selectedVehicle.type}</h4>

          <label>Rent</label>
          <h4>{this.props.selectedVehicle.price}</h4> 
          <MDBInput type="date" label="Start Date" outline />
          <MDBInput type="date" label="Return Date" outline />
            <div>
            <DropDown
            title = {"Drop Location"}
              items={dditems}
              searchHandler={this.handleDropDownSearchText}
            />
          </div>
            <button className="btn btn-primary" onClick={this.submitBooking}>
            Book
          </button>

          */
