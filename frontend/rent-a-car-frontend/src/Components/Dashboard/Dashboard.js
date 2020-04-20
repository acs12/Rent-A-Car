import React from "react";
import Navigationbar from "../Common/Navigation-Related/Navigation";
import ItemFactory from "../Common/Navigation-Related/NavItemFactory";
import VehicleBrowser from "../Dashboard/VehicleBrowser";
import { fetchVehicles } from "../../redux/actions/fetchAction";

import { connect } from "react-redux";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.getAllVehicles();
  }

  async getAllVehicles() {
    await this.props.fetchVehicles(result => {
      console.log(result);
    });
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
      }
    ];
    let items = ItemFactory(tempItems);
    return (
      <div>
        <Navigationbar navItems={items} />
        <div className="vehicleBrowser">
          <VehicleBrowser title={"San Jose"} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedLocation: state.locations.selectedLocation
  };
};

export default connect(mapStateToProps, { fetchVehicles })(Dashboard);
