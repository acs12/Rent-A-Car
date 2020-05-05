import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
import { addVehicleType, getVehicleType } from "../../redux";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import EditVehicleType from "./editVehicleType";
import Navigationbar from "../Common/Navigation-Related/Navigation";
import ItemFactory from "../Common/Navigation-Related/NavItemFactory";

//Define a Login Component
class VehicleType extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      typeOfVehicle: "",
      getVehicleTypeDetails: [],
      toggle: false,
      hourlyRate1: "",
      hourlyRate2: "",
      hourlyRate3: "",
      hourlyRate4: "",
      hourRangeRate: "",
      day1: "",
      day2: "",
      day3: "",
      lateFee: ""
    };
    //Bind the handlers to this class
    this.changeHandler = this.changeHandler.bind(this);
    this.typeHandler = this.typeHandler.bind(this);
    this.changeToggle = this.changeToggle.bind(this);
    this.addType = this.addType.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("VEHICLE TYPE : componentDidUpdate CALLED");
    if (prevProps.vehicleTypes !== this.props.vehicleTypes) {
      this.setState({ getVehicleTypeDetails: this.props.vehicleTypes });
    }
  }

  componentDidMount = () => {
    this.props.getVehicleType(res => {
      console.log(res);
    });
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  typeHandler = e => {
    this.setState({
      typeOfVehicle: e.target.value
    });
  };

  addType = async e => {
    e.preventDefault();
    let data = {
      category: this.state.typeOfVehicle,
      hourlyRate: this.state.hourlyRate,
      hour1: this.state.hourlyRate1,
      hour6: this.state.hourlyRate2,
      hour11: this.state.hourlyRate3,
      hour16: this.state.hourlyRate4,
      day1: this.state.day1,
      day2: this.state.day2,
      day3: this.state.day3,
      lateFee: this.state.lateFee
    };
    this.setState({isProgressing : true})
    await this.props.addVehicleType(data, res => {
      console.log(res);
      if (this.state.toggle === true) {
        this.setState({
          toggle: false
        });
      } else {
        this.setState({
          toggle: true
        });
      }
      this.setState({isProgressing : false})
      this.componentDidUpdate(this.props.vehicleTypes);
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
        active: false
      },
      {
        name: "Rental Vehicles",
        to: "/adminVehicle",
        active: false
      },
      {
        name: "Vehicle Types",
        to: "/type",
        active: true
      },
      {
        name: "All Users",
        to: "/adminUser",
        active: false
      }
    ];
    let items = ItemFactory(tempItems);

    let typeDetails = null;
    if (this.state.toggle === false) {
      if (this.props.vehicleTypes.length === 0) {
        typeDetails = (
          <div className = 'card' style = {{margin : "16px auto", width : "40%"}}>
            <br></br>
            <h3>No Vehicles Types to display</h3>
            <br></br>
            <button
              onClick={this.changeToggle}
              style = {{margin : "16px auto", width : "60%"}}
              className="btn btn-primary"
            >
              Add Vehicle Type
            </button>
            <br></br>
          </div>
        );
      } else {
        typeDetails = (
          <div style={{ margin: 16 }}>
            <br></br>
            <button
            onClick={this.changeToggle}
            style={{ textAlign: "center" }}
            className="btn btn-primary"
          >
            Add Vehicle Type
          </button>
            {this.state.getVehicleTypeDetails.map(x => (
                <div className = 'card' style = {{margin : 16}} > 
              <EditVehicleType
                key={x._id}
                item={x}
                action={this.update}
              ></EditVehicleType>
              </div>
            ))}
            <br></br>
            <br></br>
            <br></br>
          </div>
        );
      }
    } else {
      typeDetails = (
        <div className="card" style={{ padding: 16, margin: "16px auto", width : "50%" }}>
        <div style={{ width: "60%", margin: "16px auto" }}>
        <form onSubmit={this.addType}>
          <br></br>
          <div><h4>Enter Vehicle Details </h4></div>
          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="text"
              className="form-control"
              name="typeOfVehicle"
              placeholder="Enter vehicle type."
              required
            />
            <br></br>
          </div>

          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="text"
              className="form-control"
              name="hourlyRate"
              placeholder="Enter hourly rate for this vehicle type."
              required
            />
            <br></br>
          </div>

          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="text"
              className="form-control"
              name="hourlyRate1"
              placeholder="Enter hourly rate for 1-5 hours."
              required
            />
            <br></br>
          </div>

          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="text"
              className="form-control"
              name="hourlyRate2"
              placeholder="Enter hourly rate for 6-10 hours."
              required
            />
            <br></br>
          </div>

          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="text"
              className="form-control"
              name="hourlyRate3"
              placeholder="Enter hourly rate for 11-15 hours."
              required
            />
            <br></br>
          </div>

          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="text"
              className="form-control"
              name="hourlyRate4"
              placeholder="Enter hourly rate for 16-20 hours."
              required
            />
            <br></br>
          </div>

          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="text"
              className="form-control"
              name="day1"
              placeholder="Enter rate for a day."
              required
            />
            <br></br>
          </div>

          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="text"
              className="form-control"
              name="day2"
              placeholder="Enter rate for 2 days."
              required
            />
            <br></br>
          </div>

          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="text"
              className="form-control"
              name="day3"
              placeholder="Enter rate for 3 days."
              required
            />
            <br></br>
          </div>

          <div className="form-group">
            <input
              onChange={this.changeHandler}
              type="text"
              className="form-control"
              name="lateFee"
              placeholder="Enter late fee charge for this vehicle."
              required
            />
            <br></br>
          </div>
          {this.state.isProgressing && <button class="btn btn-primary" type="button" disabled>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span class="sr-only">Loading...</span>
        </button>}
        {!this.state.isProgressing && 
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        }
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
          <MDBCol style={{ textAlign: "center" }}>{typeDetails}</MDBCol>
          <MDBCol></MDBCol>
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    vehicleTypes: state.vehicleTypes.data
  };
};

//export Login Component
export default connect(mapStateToProps, { addVehicleType, getVehicleType })(
  VehicleType
);
