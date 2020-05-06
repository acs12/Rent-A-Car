import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import {
  MDBContainer,
  MDBCol,
} from "mdbreact";
import { addLocation, getLocation } from "../../redux";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import EditLocation from "./editLocation";
import Navigationbar from "../Common/Navigation-Related/Navigation";
import ItemFactory from "../Common/Navigation-Related/NavItemFactory";

//Define a Login Component
class AdminLocation extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      location: [],
      name: "",
      toggle: false,
      address: "",
      capacity: "",
      numOfVehicles: "",
      vehicles: []
    };
    //Bind the handlers to this class
    this.changeHandler = this.changeHandler.bind(this);
    // this.typeHandler = this.typeHandler.bind(this)
    this.changeToggle = this.changeToggle.bind(this);
    this.addLocation = this.addLocation.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Location : componentDidUpdate CALLED");
    if (prevProps.location !== this.props.location) {
      this.setState({ location: this.props.location });
    }
  }

  componentDidMount = () => {
    this.props.getLocation(res => {
      console.log(res);
    });
    // this.props.getVehicle
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addLocation = async e => {
    e.preventDefault();
    let data = {
      name: this.state.name,
      address: this.state.address,
      capacity: this.state.capacity, 
      zipcode : this.state.zipcode
    };
    await this.props.addLocation(data, res => {
      if (this.state.toggle === true) {
        this.setState({
          toggle: false
        });
      } else {
        this.setState({
          toggle: true
        });
      }
      this.componentDidUpdate(this.props.location);
    });
  };

  changeToggle = e => {
    e.preventDefault();
    if (this.state.toggle === true) {
      this.setState({
        toggle: false
      });
    } else {
      this.setState({
        toggle: true
      });
    }
  };

  render() {
    let tempItems = [
      {
        name: "Rental Locations",
        to: "/adminLocation",
        active: true
      },
      {
        name: "Rental Vehicles",
        to: "/adminVehicle",
        active: false
      },
      {
        name: "Vehicle Types",
        to: "/type",
        active: false
      },
      {
        name: "All Users",
        to: "/adminUser",
        active: false
      }
    ];
    let items = ItemFactory(tempItems);

    let locationDetails = null;
    if (this.state.toggle === false) {
      if (
        this.state.location === undefined &&
        this.state.location.length === 0
      ) {
        locationDetails = (
          <div className = 'card' style = {{margin : "16px auto"}}>
            <br></br>
            <div><h4>No Locations to display</h4></div>
            <br></br>
            <button
              onClick={this.changeToggle}
              style={{ textAlign: "center" }}
              className="btn btn-primary"
            >
              Add Location
            </button>
            <br></br>
            <br></br>
          </div>
        );
      } else {
        locationDetails = (
          <div>
            <button
              onClick={this.changeToggle}
              style = {{margin : "16px auto", width : "20%"}}
              className="btn btn-primary"
            >
              Add Location
            </button>

            {this.state.location.map(x => (
              <div style={{ margin: 16 }}>
                <EditLocation
                  key={x._id}
                  item={x}
                  action={this.update}
                ></EditLocation>
              </div>
            ))}
          </div>
        );
      }
    } else {
      locationDetails = (
        <div className="card" style={{ padding: 16, margin: "16px auto", width : "50%" }}>
        <div style={{ width: "60%", margin: "16px auto" }}>
          <form onSubmit={this.addLocation}>
          <div><h4>Enter Location Details</h4></div>
            <div className="form-group">
              <input
                onChange={this.changeHandler}
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter location name."
                required
              />
              <br></br>
            </div>

            <div className="form-group">
              <input
                onChange={this.changeHandler}
                type="text"
                className="form-control"
                name="address"
                placeholder="Enter location address."
                required
              />
              <br></br>
            </div>

            <div className="form-group">
              <input
                onChange={this.changeHandler}
                type="text"
                className="form-control"
                name="zipcode"
                placeholder="Enter Zip-Code"
                pattern = "[0-9]{5}"
                required
              />
              <br></br>
            </div>

            <div className="form-group">
              <input
                onChange={this.changeHandler}
                type="number"
                className="form-control"
                name="capacity"
                placeholder="Enter location capacity."
                required
              />
              <br></br>
            </div>

            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.changeToggle}
            >
              Cancel
            </button>
            <br></br>
            <br></br>
          </form>
        </div>
        </div>
      );
    }
    return (
      <div>
        <Navigationbar navItems={items} />
        <MDBContainer>
          <MDBCol></MDBCol>
          <MDBCol style={{ textAlign: "center" }}>{locationDetails}</MDBCol>
          <MDBCol></MDBCol>
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.adminLocation.locations
  };
};

//export Login Component
export default connect(mapStateToProps, { addLocation, getLocation })(
  AdminLocation
);
