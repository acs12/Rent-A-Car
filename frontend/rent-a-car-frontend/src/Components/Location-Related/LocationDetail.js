import React from "react";
import Navigationbar from "../Common/Navigation-Related/Navigation";
import ItemFactory from "../Common/Navigation-Related/NavItemFactory";
import VehicleBrowser from "../Dashboard/VehicleBrowser";
import {  fetchVehicleForLocationWithID } from "../../redux/actions/fetchAction";
import { connect } from "react-redux";
import ReactPaginate from 'react-paginate';
import Pagination from "@material-ui/lab/Pagination";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.getAllVehiclesForID(this.props.match.params.locationID);
  }

  async getAllVehiclesForID(id) {
    await this.props.fetchVehicleForLocationWithID(id, result => {
      console.log(result);
    });
  }

  handlePageClick = (data) => {
    const { selected } = data;
    this.getAllVehicles(selected);
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
        active: true
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
        <Navigationbar navItems={items} isUser = {true} />
        <div className="list-container">
          <VehicleBrowser title={'Vehicle List'} noFilter = {true}/>
          <Pagination
              count={Math.floor(this.props.totalVehicles/10.0)}
              variant="outlined"
              shape="rounded"
              style={{ backgroundColor: "#ffa000;", width : "10%", margin : "16px auto" }}
              onChange={this.handlePageClick}
            />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedLocation: state.locations.selectedLocation,
    totalVehicles : state.vehicles.total
  };
};

export default connect(mapStateToProps, { fetchVehicleForLocationWithID })(Dashboard);
