import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { deleteLocation, updateLocation, vehicleNames } from "../../redux";
import { connect } from "react-redux";
import { Redirect } from "react-router";

//Define a Login Component
class EditLocation extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      _id: this.props.item._id,
      existingLocationStatus: false,
      name: this.props.item.name,
      address: this.props.item.address,
      capacity: this.props.item.capacity,
      numOfVehicles: this.props.item.numOfVehicles,
      vehicles: this.props.item.vehicle,
      vehicleArray: [],
      response: "",
      zipcode : this.props.item.address.zipcode
    };
    //Bind the handlers to this class
    this.delete = this.delete.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.changeExistingTypeToggle = this.changeExistingTypeToggle.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    // this.getVehicleNames = this.getVehicleNames.bind(this)
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  updateLocation = async e => {
    //prevent page from refresh
    e.preventDefault();
    let data = {
      _id: this.state._id,
      name: this.state.name,
      address: this.state.address,
      capacity: this.state.capacity,
      zipcode : this.state.zipcode
    };

    await this.props.updateLocation(data, res => {
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
    await this.props.deleteLocation(data, res => {
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
    console.log("Edit Location State", this.state);
    let redirectVar = null;

    let existLocationDetails = null;
    if (this.state.existingLocationStatus === false) {
      if (this.props.item.address === null) {
        console.log("Inside if in change existing location details");
        existLocationDetails = (
          <div>
            <div className='card' style={{ margin: "16px auto", width: "40%" }}>
              <div className="card-body" style={{ textAlign: "left" }}>
                <h4 className="card-title"> Name : {this.props.item.name}</h4>
                <h5 className="card-subtitle mb-2 text-muted">
                  Address : null
                </h5>
                <h5 className="card-subtitle mb-2 text-muted">
                  ZipCode : null
                </h5>
                <h5 className="card-subtitle mb-2 text-muted">
                  Capacity : {this.state.capacity}
                </h5>
                <h5 className="card-subtitle mb-2 text-muted">
                  Vehicles Assigned : {this.state.numOfVehicles}
                </h5>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.changeExistingTypeToggle}
                >
                  Edit
              </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.delete}
                >
                  Delete
            </button>
                <br></br>
              </div>
            </div>
          </div>
        );
      }
      else {
        console.log("Inside if in change existing location details");
        existLocationDetails = (
          <div>
            <div className='card' style={{ margin: "16px auto", width: "40%" }}>
              <div className="card-body" style={{ textAlign: "left" }}>
                <h4 className="card-title"> Name : {this.props.item.name}</h4>
                <h5 className="card-subtitle mb-2 text-muted">
                  Address : {this.props.item.address.address}
                </h5>
                <h5 className="card-subtitle mb-2 text-muted">
                  ZipCode : {this.props.item.address.zipcode}
                </h5>
                <h5 className="card-subtitle mb-2 text-muted">
                  Capacity : {this.state.capacity}
                </h5>
                <h5 className="card-subtitle mb-2 text-muted">
                  Vehicles Assigned : {this.state.numOfVehicles}
                </h5>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.changeExistingTypeToggle}
                >
                  Edit
              </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.delete}
                >
                  Delete
            </button>
                <br></br>
              </div>
            </div>
          </div>
        );
      }
    } else {
      console.log("Inside else in location details");
      existLocationDetails = (
        <div className="card" style={{ padding: 16, margin: "16px auto", width: "40%" }}>
          <br></br>
          <form onSubmit={this.updateLocation}>
            <div className="form-group">
              <input
                onChange={this.changeHandler}
                type="text"
                className="form-control"
                name="name"
                placeholder={this.props.item.name}
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
                placeholder={this.props.item.address.address}
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
                  placeholder={this.props.item.address.zipcode}
                  pattern="[0-9]{5}"
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
                placeholder={this.props.item.capacity}
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
              onClick={this.changeExistingTypeToggle}
            >
              Cancel
          </button>
            <br></br>
          </form>
        </div>
      );
    }
    return (
      <div>
        <div key={this.props.item._id}></div>
        {redirectVar}
        {existLocationDetails}
      </div>
    );
  }
}
//export Login Component
export default connect(null, { updateLocation, deleteLocation, vehicleNames })(
  EditLocation
);
