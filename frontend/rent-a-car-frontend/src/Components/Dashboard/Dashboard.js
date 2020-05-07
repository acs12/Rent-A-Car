import React from "react";
import Navigationbar from "../Common/Navigation-Related/Navigation";
import ItemFactory from "../Common/Navigation-Related/NavItemFactory";
import VehicleBrowser from "../Dashboard/VehicleBrowser";
import { fetchVehicles } from "../../redux/actions/fetchAction";
import { connect } from "react-redux";
import ReactPaginate from 'react-paginate';
import Pagination from "@material-ui/lab/Pagination";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.getAllVehicles(0);
  }

  async getAllVehicles(pageNum) {
    await this.props.fetchVehicles(pageNum, result => {
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
        <Navigationbar navItems={items} isUser = {true} />
        <div className="list-container">
          <VehicleBrowser title={"San Jose"} noFilter = {false}/>
          <Pagination
              count={Math.floor(this.props.totalVehicles/20.0)}
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

export default connect(mapStateToProps, { fetchVehicles })(Dashboard);
