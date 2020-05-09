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
import {
  addVehicle,
  getVehicle,
  getLocation,
  getVehicleType
} from "../../redux";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import EditVehicle from "./editVehicle";
import Navigationbar from "../Common/Navigation-Related/Navigation";
import ItemFactory from "../Common/Navigation-Related/NavItemFactory";

//Define a Login Component
class Vehicle extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      carname: "",
      toggle: false,
      type: "",
      make: "",
      modelYear: "",
      currentMileage: "",
      condition: "Good",
      timeLastServiced: "",
      rentalLocation: "",
      vehicles: [],
      currentPage: 1,
      itemsPerPage: 3
    };
    //Bind the handlers to this class
    this.changeHandler = this.changeHandler.bind(this);
    // this.typeHandler = this.typeHandler.bind(this)
    this.changeToggle = this.changeToggle.bind(this);
    this.addVehicle = this.addVehicle.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("VEHICLE : componentDidUpdate CALLED");
    if (prevProps.vehicle !== this.props.vehicle) {
      this.setState(
        {
          vehicles: this.props.vehicle
        },
        () => { }
      );
    }
  }

  componentDidMount = async () => {
    await this.props.getVehicle(res => {
      console.log("Get vehicles", res);
    });

    await this.props.getLocation(res => {
      console.log("get Location", res);
    });

    await this.props.getVehicleType(res => {
      console.log("get Vehicle Types", res);
    });
  };

  changeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  changeHandlerForButton = e => {
    e.preventDefault()
    if (this.state.rentalLocation) {
      document.getElementById(e.target.value).className = 'btn btn-success'
      document.getElementById(this.state.rentalLocation).className = 'btn btn-info'
    } else {
      document.getElementById(e.target.value).className = 'btn btn-success'
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  changeHandlerForVehicleType = e => {
    e.preventDefault()
    if (this.state.type) {
      document.getElementById(e.target.value).className = 'btn btn-secondary'
      document.getElementById(this.state.type).className = 'btn btn-info'
    } else {
      document.getElementById(e.target.value).className = 'btn btn-secondary'
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  addVehicle = async e => {
    e.preventDefault();
    let data = {
      carname: this.state.carname,
      type: this.state.type,
      make: this.state.make,
      modelYear: this.state.modelYear,
      currentMileage: this.state.currentMileage,
      condition: this.state.condition,
      timeLastServiced: this.state.timeLastServiced,
      rentalLocation: this.state.rentalLocation
    };
    console.log("data", data);
    await this.props.addVehicle(data, res => {
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

      // var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test("90210");
      this.componentDidMount()
      this.componentDidUpdate(this.props.vehicle)
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

  handleClick(e) {
    console.log(e)
    this.setState({
      currentPage: Number(e)
    });
  }

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("token") || localStorage.getItem("admin") === "false") {
      localStorage.removeItem("token")
      localStorage.removeItem("admin")
      localStorage.removeItem("manager")
      localStorage.removeItem("id")
      redirectVar = <Redirect to="/" />
    }

    const currentPage = this.state.currentPage;
    const itemsPerPage = this.state.itemsPerPage

    const indexOfLastTodo = currentPage * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
    console.log("IOL", indexOfLastTodo)
    console.log("IOF", indexOfFirstTodo)

    let tempItems = [
      {
        name: "Rental Locations",
        to: "/adminLocation",
        active: false
      },
      {
        name: "Rental Vehicles",
        to: "/adminVehicle",
        active: true
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

    let rentalLocationButton = (
      <div>
        {this.props.location.map(x => {
          if (x.numOfVehicles < x.capacity) {
            return (
              <button
                className="btn btn-info"
                onClick={this.changeHandlerForButton}
                name="rentalLocation"
                value={x._id}
                id={x._id}
              >
                {x.name}
              </button>
            );
          }
        })}
      </div>
    );

    let vehicleTypeButton = (
      <div>
        {this.props.vehicleTypes.map(x => {
          return (
            <button
              className="btn btn-info"
              onClick={this.changeHandlerForVehicleType}
              name="type"
              value={x._id}
              id={x._id}
            >
              {x.category}
            </button>
          );
        })}
      </div>
    );
    let vehicleDetails = null;
    if (this.state.toggle === false) {
      if (this.state.vehicles.length === 0) {
        vehicleDetails = (
          <div className='card' style={{ margin: "16px auto", width: "40%" }}>
            <br></br>
            <h3>No Vehicle to display</h3>
            <br></br>
            <button
              onClick={this.changeToggle}
              style={{ margin: "16px auto", width: "60%" }}
              className="btn btn-primary"
            >
              Add Vehicle
            </button>
            <br></br>
          </div>
        );
      } else {
        const currentItems = this.state.vehicles.slice(indexOfFirstTodo, indexOfLastTodo);

        vehicleDetails = (
          <div style={{ margin: 16 }}>
            <button
              onClick={this.changeToggle}
              style={{ textAlign: "center" }}
              className="btn btn-primary"
            >
              Add Vehicle
            </button>
            {currentItems.map(x => (
              <div style={{ margin: 16 }}>
                <EditVehicle key={x._id} item={x}></EditVehicle>
              </div>
            ))}
            <br></br>
            <br></br>
            <br></br>
          </div>
        );
      }
    } else {
      vehicleDetails = (
        <div className="card" style={{ padding: 16, margin: "16px auto", width: "100%" }}>
          <div style={{ width: "60%", margin: "16px auto" }}>
            <form onSubmit={this.addVehicle}>
              <br></br>
              <br></br>
              <div><h4>Enter Vehicle Details </h4></div>
              <div className="form-group">
                <input
                  onChange={this.changeHandler}
                  type="text"
                  className="form-control"
                  name="carname"
                  placeholder="Enter vehicle name."
                  required
                />
                <br></br>
              </div>

              <div className="form-group">
                <input
                  onChange={this.changeHandler}
                  type="text"
                  className="form-control"
                  name="make"
                  placeholder="Enter brand of car."
                  required
                />
                <br></br>
              </div>

              <div className="form-group">
                <input
                  onChange={this.changeHandler}
                  type="text"
                  className="form-control"
                  name="modelYear"
                  placeholder="Enter vehicle's model year."
                  required
                />
                <br></br>
              </div>

              <div className="form-group">
                <input
                  onChange={this.changeHandler}
                  type="text"
                  className="form-control"
                  name="currentMileage"
                  placeholder="Enter current mileage of car."
                  required
                />
                <br></br>
              </div>

              <div class="form-group">
                <select class="form-control" id='condition-select' name='condition' onChange={this.changeHandler}>
                  <option onClick={this.changeHandler} name='condition' value='Good' selected >Good</option>
                  <option onClick={this.changeHandler} name='condition' value='Needs Cleaning'>Needs Cleaning</option>
                  <option onClick={this.changeHandler} name='condition' value='Needs Maintainence'>Needs Maintainence</option>
                </select>
              </div>

              <div className="form-group">
                Enter when was car vehicle last serviced
                <input
                  onChange={this.changeHandler}
                  type="date"
                  className="form-control"
                  name="timeLastServiced"
                  placeholder="Enter when was vehicle last serviced."
                  required
                />
                <br></br>
              </div>

              <div>
                Select any location from below :{rentalLocationButton}
                <br></br>
              </div>

              <div>
                Select any vehicle type from below:
                {vehicleTypeButton}
                <br></br>
              </div>

              <button type="submit" className="btn btn-success">
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

    const pageNumbers = [];
    let renderPageNumbers = null;
    if (this.state.vehicles.length > 0) {
      for (let i = 0; i <= Math.ceil(this.state.vehicles.length / itemsPerPage) + 1; i++) {
        pageNumbers.push(i);
      }

      renderPageNumbers = (
        <nav aria-label="Page navigation example" class="pagebar">
          <ul class="pagination">
            {pageNumbers.map((i) => <li class="page-item" style={{ color: "white" }}><a key={i} id={i} onClick={() => { this.handleClick(i) }} style={{ color: "white" }} class="page-link" href="#">{i}</a></li>)}
          </ul>
        </nav>
      );
    }

    return (
      <div>
        {redirectVar}
        <Navigationbar navItems={items} />
        <MDBContainer>
          <MDBCol style={{ textAlign: "center" }} md="8">{vehicleDetails}</MDBCol>
          <MDBRow >
            <MDBCol md="4"></MDBCol>
            <MDBCol md="2" style={{ textAlign: "left" }}>
              {renderPageNumbers}
            </MDBCol>
            <MDBCol md="6"></MDBCol>

          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    vehicle: state.adminVehicle.vehicles,
    location: state.adminLocation.locations,
    vehicleTypes: state.vehicleTypes.data
  };
};

//export Login Component
export default connect(mapStateToProps, {
  addVehicle,
  getVehicle,
  getLocation,
  getVehicleType
})(Vehicle);
