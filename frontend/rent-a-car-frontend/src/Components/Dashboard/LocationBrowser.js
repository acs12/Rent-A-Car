import React from "react";
import "../../styles/dashboard.styles.css";
import LocationCell from "./Cells/LocationCell";
import { setLocationSearchText } from "../../redux/actions/searchAction";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Redirect } from "react-router-dom";

class LocationBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSearchText = this.handleSearchText.bind(this);
    this.moveToLocationDetail = this.moveToLocationDetail.bind(this);
  }

  handleSearchText(e) {
    e.preventDefault();
    this.props.setLocationSearchText(e.target.value);
  }

  moveToLocationDetail(e) {
    this.setState({
      redirectVar: <Redirect to={`/locations/${e._id}`} />
    });
  }

  render() {
    return (
      <div>
        {this.state.redirectVar}
        <div>
          <div style={{ marginTop: "32px", width: "50%" }}>
            <div className="md-form my-0 vehicleBox finderBox">
              <input
                class="form-inline d-flex justify-content-center md-form form-sm mt-0"
                type="text"
                placeholder="Search by location"
                aria-label="Search"
                style={{ width: "50%" }}
                onChange={this.handleSearchText}
              />
            </div>
          </div>
          <div style={{ margin: "16px", padding: 8 }}>
          <Grid container spacing={4}>
            {this.props.locations.map(l => {
              return (
                <div style={{ margin: "8px" }}>
                  <LocationCell
                    location={l}
                    moveToLocationDetail={this.moveToLocationDetail}
                  />
                </div>
              );
            })}
          </Grid>
          </div>
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
