import React from "react";
import Navigationbar from "../Common/Navigation-Related/Navigation";
import { connect } from "react-redux";
import ItemFactory from "../Common/Navigation-Related/NavItemFactory";
import { fetchVehicle } from "../../redux/actions/fetchAction";
import "../../styles/dashboard.styles.css";
import {MDBInput} from 'mdbreact'
import DropDown from '../Common/Navigation-Related/DropDownComponent'
import { fetchLocations , fetchVehicleForLocationWithID} from "../../redux/actions/fetchAction";
import DDFactory from "../Common/Navigation-Related/DropDownItemFactory";

class VehicleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.getVehicle();
    this.handleDropDownSearchText = this.handleDropDownSearchText.bind(this)
    this.submitBooking = this.submitBooking.bind(this)
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

  submitBooking(e){
    e.preventDefault()

  }

  handleDropDownSearchText(text) {
    this.props.fetchLocations(text, result => {
      console.log(result);
    });
  }

  render() {
    let temp = [];
    this.props.locations.forEach(element => {
      let tempElememt = {
        value: element._id,
        displayValue: element.name,
        clicked: this.handleClick
      };
      temp.push(tempElememt);
    });

    let dditems = DDFactory(temp);
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
      }
    ];
    let items = ItemFactory(tempItems);
    return (
      <div>
        <Navigationbar navItems={items} />
        <div className="vehicleBrowser">
          <h2 align={"center"}>
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
                items={dditems}
                searchHandler={this.handleDropDownSearchText}
              />
            </div>
          <button
            className="btn btn-primary"
            onClick={this.submitBooking}
          >
            Book
          </button>
        </div>
      </div>
    );
  }
}

const matchStateToProps = state => {
  return {
    selectedVehicle: state.vehicles.selectedVehicle,
    locations: state.locations.data
  };
};

export default connect(matchStateToProps, { fetchVehicle, fetchLocations, fetchVehicleForLocationWithID })(VehicleDetail);
