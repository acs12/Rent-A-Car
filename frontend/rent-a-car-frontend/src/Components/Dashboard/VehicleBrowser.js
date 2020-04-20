import React from "react";
import "../../styles/dashboard.styles.css";
import VehicleCell from "../Dashboard/Cells/VehicleCell";
import DropDown from "../Common/Navigation-Related/DropDownComponent";
import DDFactory from "../Common/Navigation-Related/DropDownItemFactory";
import { setVehicleSearchText } from "../../redux/actions/searchAction";
import { connect } from "react-redux";

class VehicleBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchText = this.handleSearchText.bind(this);
  }

  handleSearchText(e) {
    e.preventDefault();
    this.props.setVehicleSearchText(e.target.value);
  }

  handleClick(e) {
    console.log(e.target.value);
  }

  render() {
    let temp = [
      { value: "Ankit", displayValue: "Ankit", clicked: this.handleClick }
    ];
    let items = DDFactory(temp);
    return (
      <div>
        <div className="list-container">
          <h2 align={"center"}>
            <b>{this.props.title}</b>
          </h2>
          <div className="md-form my-0 vehicleBox finderBox">
            <input
              class="form-inline d-flex justify-content-center md-form form-sm mt-0"
              type="text"
              placeholder="Search for Vehicles"
              aria-label="Search"
              onChange = {this.handleSearchText}
            />
            <div>
              <DropDown items={items} />
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
  const {searchText} = state.vehicles;
  if(searchText.length > 0) {
    let searchedVehicles = state.vehicles.data.filter((v) => {
        return v.type.toUpperCase().includes(searchText.toUpperCase())
    })
    return {
      vehicles: searchedVehicles
    };
  }
  return {
    vehicles: state.vehicles.data
  };
};

export default connect(mapStateToProps, { setVehicleSearchText })(
  VehicleBrowser
);
