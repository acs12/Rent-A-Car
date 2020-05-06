import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { deleteVehicle, updateVehicle } from "../../redux";
import { connect } from "react-redux";
import { Redirect } from "react-router";

//Define a Login Component
class EditVehicle extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      _id: this.props.item._id,
      existingLocationStatus: false,
      carname: this.props.item.carname,
      type: this.props.item.type,
      make: this.props.item.make,
      modelYear: this.props.item.modelYear,
      currentMileage: this.props.item.currentMileage,
      condition: this.props.item.condition,
      timeLastServiced: this.props.item.timeLastServiced,
      rentalLocation: this.props.item.rentalLocation,
      response: ""
    };
    //Bind the handlers to this class
    this.delete = this.delete.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.changeExistingTypeToggle = this.changeExistingTypeToggle.bind(this);
    this.updateVehicle = this.updateVehicle.bind(this);
    // this.getVehicleNames = this.getVehicleNames.bind(this)
  }

  // componentDidMount = () => {
    // this.props.locationNames(res => {
    //     console.log(res.data)
    // }
    // this.props.vehicleTypeNames(res => {
    //     console.log(res.data)
    // }
  // };

  changeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  updateVehicle = async e => {
    //prevent page from refresh
    e.preventDefault();
    let data = {
      _id: this.state._id,
      carname: this.state.carname,
      type: this.state.type,
      make: this.state.make,
      modelYear: this.state.modelYear,
      currentMileage: this.state.currentMileage,
      condition: this.state.condition,
      timeLastServiced: this.state.timeLastServiced,
      rentalLocation: this.state.rentalLocation
    };

    await this.props.updateVehicle(data, res => {
      console.log("experience res", res);
      if (this.state.existingLocationStatus === true) {
        this.setState({
          existingLocationStatus: false
        });
      } else {
        this.setState({
          existingLocationStatus: true
        });
      }
    });
  };

  delete = async e => {
    e.preventDefault();
    let data = {
      _id: this.state._id
    };
    await this.props.deleteVehicle(data, res => {
      console.log(res);
    });
  };

  changeExistingTypeToggle = e => {
    if (this.state.existingLocationStatus === true) {
      this.setState({
        existingLocationStatus: false
      });
    } else {
      this.setState({
        existingLocationStatus: true
      });
    }
  };

  render() {
    console.log(this.state);
    let redirectVar = null;
    // if (!localStorage.getItem("token")) {
    //     redirectVar = <Redirect to="/StudentLogin" />
    // }

    let rentalLocationButton = (
      <div>
        {this.props.location.map(x => {
          if (x.numOfVehicles < x.capacity) {
            return (
              <button
                className="btn btn-info"
                onClick={this.changeHandler}
                name="rentalLocation"
                value={x._id}
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
              onClick={this.changeHandler}
              name="type"
              value={x._id}
            >
              {x.category}
            </button>
          );
        })}
      </div>
    );

    let existVehicleDetails = null;
    if (this.state.existingLocationStatus === false) {
      if (this.props.item.rentalLocation !== null) {
        console.log("Inside if in change existing location details");
        existVehicleDetails = (
          <div>
            <div className="card">
              <div className="card-body" style={{ textAlign: "left" }}>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ float: "right" }}
                  onClick={this.delete}
                >
                  Delete
                </button>
                <br></br>
                <h4 className="card-title">
                  {" "}
                  Name : {this.props.item.carname}
                </h4>
                <h5 className="card-subtitle mb-2 text-muted">
                  Location : {this.props.item.rentalLocation.name}
                </h5>
                <h5 className="card-subtitle mb-2 text-muted">
                  Type : {this.props.item.type.category}
                </h5>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.changeExistingTypeToggle}
                >
                  Edit
                </button>
                <br></br>
              </div>
            </div>
          </div>
        );
      }
      else{
        console.log("Inside if in change existing location details");
        existVehicleDetails = (
          <div>
            <div className="card">
              <div className="card-body" style={{ textAlign: "left" }}>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ float: "right" }}
                  onClick={this.delete}
                >
                  Delete
                </button>
                <br></br>
                <h4 className="card-title">
                  {" "}
                  Name : {this.props.item.carname}
                </h4>
                <h5 className="card-subtitle mb-2 text-muted">
                  Location : null
                </h5>
                <h5 className="card-subtitle mb-2 text-muted">
                  Type : {this.props.item.type.category}
                </h5>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.changeExistingTypeToggle}
                >
                  Edit
                </button>
                <br></br>
              </div>
            </div>
          </div>
        );
      }
    } else {
      console.log("Inside else in location details");
      existVehicleDetails = (
        <div className="card" style={{ padding: 16, margin: 16 }}>
          <div style={{ width: "40%", margin: "16px auto" }}>
            <br></br>
            <form onSubmit={this.updateVehicle}>
              <br></br>
              <button
                type="button"
                className="btn btn-danger"
                style={{ float: "right" }}
                onClick={this.changeExistingTypeToggle}
              >
                X
              </button>
              <br></br>
              <br></br>
              <b>Enter Vehicle Details :</b>
              <br></br>
              <br></br>
              <div className="form-group">
                Enter vehicle name :
                <input
                  onChange={this.changeHandler}
                  type="text"
                  className="form-control"
                  name="carname"
                  placeholder={this.props.item.carname}
                />
                <br></br>
              </div>

              <div className="form-group">
                Enter brand of car :
                <input
                  onChange={this.changeHandler}
                  type="text"
                  className="form-control"
                  name="make"
                  placeholder={this.props.item.make}
                />
                <br></br>
              </div>

              <div className="form-group">
                Enter vehicle's model year :
                <input
                  onChange={this.changeHandler}
                  type="text"
                  className="form-control"
                  name="modelYear"
                  placeholder={this.props.item.modelYear}
                />
                <br></br>
              </div>

              <div className="form-group">
                Enter current mileage of car :
                <input
                  onChange={this.changeHandler}
                  type="text"
                  className="form-control"
                  name="currentMileage"
                  placeholder={this.props.item.currentMileage}
                />
                <br></br>
              </div>

              <div className="form-group">
                Enter condition of car :
                <input
                  onChange={this.changeHandler}
                  type="text"
                  className="form-control"
                  name="condition"
                  placeholder={this.props.item.condition}
                />
                <br></br>
              </div>

              <div className="form-group">
                Enter when was vehicle last serviced :
                <input
                  onChange={this.changeHandler}
                  type="date"
                  className="form-control"
                  name="timeLastServiced"
                  placeholder={this.props.item.timeLastServiced}
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
              <br></br>
            </form>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div key={this.props.item._id}></div>
        {redirectVar}
        {existVehicleDetails}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.adminLocation.locations,
    vehicleTypes: state.vehicleTypes.data
  };
};

//export Login Component
export default connect(mapStateToProps, { updateVehicle, deleteVehicle })(
  EditVehicle
);
