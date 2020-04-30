import React from "react";
import "../../styles/dashboard.styles.css";
import VehicleCell from "../Dashboard/Cells/VehicleCell";
import DropDown from "../Common/Navigation-Related/DropDownComponent";
import DDFactory from "../Common/Navigation-Related/DropDownItemFactory";
import { setVehicleSearchText } from "../../redux/actions/searchAction";
import {
  fetchLocations,
  fetchVehicleForLocationWithID
} from "../../redux/actions/fetchAction";
import { setCurrentLocation } from "../../redux/actions/setAction";
import { connect } from "react-redux";

class VehicleBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchText = this.handleSearchText.bind(this);
    this.handleDropDownSearchText = this.handleDropDownSearchText.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSearchText(e) {
    e.preventDefault();
    this.props.setVehicleSearchText(e.target.value);
  }

  handleDropDownSearchText(text) {
    this.props.fetchLocations(text, result => {
      console.log(result);
    });
  }

  handleClick(e) {
    this.props.setCurrentLocation(e.target.value)
    this.props.fetchVehicleForLocationWithID(e.target.value, result => {
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

    let items = DDFactory(temp);
    return (
      <div>
        <div className="list-container">
          <h1 align={"center"}>
            <b>{this.props.title}</b>
          </h1>
          <div className="md-form my-0 vehicleBox finderBox">
            <input
              class="form-inline d-flex justify-content-center md-form form-sm mt-0"
              type="text"
              placeholder="Search for Vehicles"
              aria-label="Search"
              onChange={this.handleSearchText}
            />
            <div>
              <DropDown
                title = {this.props.selectedLocation.name}
                items={items}
                searchHandler={this.handleDropDownSearchText}
              />
            </div>
          </div>
          <div>
            {this.props.vehicles.map(v => {
              return <VehicleCell vehicle={v} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { searchText } = state.vehicles;
  if (searchText.length > 0) {
    let searchedVehicles = state.vehicles.data.filter(v => {
      return (
        v.type.category.toUpperCase().includes(searchText.toUpperCase()) ||
        v.carname.toUpperCase().includes(searchText.toUpperCase())
      );
    });
    return {
      vehicles: searchedVehicles,
      locations: state.locations.data,
      selectedLocation : state.locations.selectedLocation
    };
  }
  return {
    vehicles: state.vehicles.data,
    locations: state.locations.data, 
    selectedLocation : state.locations.selectedLocation
  };
};

export default connect(mapStateToProps, {
  setVehicleSearchText,
  fetchLocations,
  setCurrentLocation,
  fetchVehicleForLocationWithID
})(VehicleBrowser);
