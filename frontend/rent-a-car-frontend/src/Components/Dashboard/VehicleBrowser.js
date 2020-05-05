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
import { setCurrentLocation, setCurrentVehicle } from "../../redux/actions/setAction";
import { Redirect } from 'react-router-dom'

import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

class VehicleBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleSearchText = this.handleSearchText.bind(this);
    this.handleDropDownSearchText = this.handleDropDownSearchText.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.moveToVehicleSelection = this.moveToVehicleSelection.bind(this);
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
    this.props.setCurrentLocation(e.target.value);
    this.props.fetchVehicleForLocationWithID(e.target.value, result => {
      console.log(result);
    });
  }

  moveToVehicleSelection(e) {
    // if (this.props.bookVehicle !== undefined) {
    //   return this.props.bookVehicle(this.props.vehicle);
    // }

    this.props.setCurrentVehicle(e, () => {
      this.setState({
        moveToVehicleDetail: true
      })    
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
    let navLink = undefined;

    if (this.state.moveToVehicleDetail) {
      navLink = <Redirect to={`/vehicledetail/${this.props.selectedVehicle._id}`} />;
    }
    return (
      <div>
      {navLink}
        <div>
          <h1 align={"center"} style={{ margin: "16px 0px" }}>
            <b>{this.props.title}</b>
          </h1>
          <div style={{ margin: "16px auto", width: "50%" }}>
            <div className="md-form my-0 finderBox">
              <input
                class="form-inline d-flex justify-content-center md-form form-sm mt-0"
                type="text"
                placeholder="Search for Vehicles"
                aria-label="Search"
                style={{ margin: "16px auto", padding: 8, width: "50%" }}
                onChange={this.handleSearchText}
              />
              {!this.props.noFilter && <DropDown
                title={this.props.selectedLocation.name}
                items={items}
                searchHandler={this.handleDropDownSearchText}
              />}
              
            </div>
          </div>
          <div style={{ margin: "16px", padding: 8 }}>
            <Grid container spacing={1}>
              {this.props.vehicles.map(v => {
                return <div style={{ margin: "8px" }}><VehicleCell moveToVehicleSelection = {this.moveToVehicleSelection} vehicle={v} /></div>
              })}
            </Grid>
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
      selectedLocation: state.locations.selectedLocation,
      selectedVehicle : state.vehicles.selectedVehicle
    };
  }
  return {
    vehicles: state.vehicles.data,
    locations: state.locations.data,
    selectedLocation: state.locations.selectedLocation,
    selectedVehicle : state.vehicles.selectedVehicle
  };
};

export default connect(mapStateToProps, {
  setVehicleSearchText,
  fetchLocations,
  setCurrentLocation,
  fetchVehicleForLocationWithID,
  setCurrentVehicle
})(VehicleBrowser);
