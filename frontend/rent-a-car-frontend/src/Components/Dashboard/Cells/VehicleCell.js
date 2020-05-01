import React from "react";
import { setCurrentVehicle } from "../../../redux/actions/setAction";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom'

class VehicleCell extends React.Component {

  constructor(props){
    super(props)
    this.state = {}
    this.moveToVehicleSelection = this.moveToVehicleSelection.bind(this)
  }

  moveToVehicleSelection(e){
    e.preventDefault()
    this.setState({
      moveToVehicleDetail : true
    }, ()=>{
      this.props.setCurrentVehicle(this.props.vehicle)
    })
  }

  render() {
    let navLink = undefined; 

    if(this.state.moveToVehicleDetail) {
      navLink = <Redirect to = {`vehicledetail/${this.props.vehicle._id}`} />
    }
    return (
      <div className="vehicleCell">
      {navLink}
        <div className="vehicleBox">
          <label>Name</label>
          <h4>{this.props.vehicle.carname === undefined && "Buggati"}</h4>
        </div>
        <div className="vehicleBox">
          <label>Type</label>
          <h4>{this.props.vehicle.type}</h4>
        </div>
        <div className="vehicleBox">
          <label>Rent</label>
          <h4>{this.props.vehicle.price}</h4>
        </div>
        <div className="vehicleBox">
          <button className="btn btn-primary" onClick = {this.moveToVehicleSelection}>Book</button>
        </div>
      </div>
    );
  }
}

export default connect(null, {setCurrentVehicle})(VehicleCell);
