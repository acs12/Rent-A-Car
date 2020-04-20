import React from "react";
import "../../styles/dashboard.styles.css";
import LocationCell from "./Cells/LocationCell";
import { setLocationSearchText } from "../../redux/actions/searchAction";
import { connect } from "react-redux";

class LocationBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchText = this.handleSearchText.bind(this);
  }

  handleSearchText(e) {
    e.preventDefault();
    this.props.setLocationSearchText(e.target.value);
  }

  render() {
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
              placeholder="Search by location"
              aria-label="Search"
              onChange={this.handleSearchText}
            />
          </div>
          {this.props.locations.map(l => {
            return <LocationCell location={l} />;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { searchText } = state.locations;
  if (searchText.length > 0) {
    let searchedLocations = state.locations.data.filter(l => {
      return l.name.toUpperCase().includes(searchText.toUpperCase());
    });
    return {
      locations: searchedLocations
    };
  }
  return {
    locations: state.locations.data
  };
};

export default connect(mapStateToProps, { setLocationSearchText })(
  LocationBrowser
);
