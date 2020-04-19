import React from 'react'
import {
    MDBCard
  } from "mdbreact";
import CustomTextBox from '../../Common/CustomTextBox'

class VehicleCell extends React.Component {

    render(){
        return(
            <div className = "vehicleCell">
            <div className = "vehicleBox">
            <label>Name</label>
            <h4>Buggati</h4>
            </div>
            <div className = "vehicleBox">
            <label>Type</label>
            <h4>Buggati</h4>
            </div>
            <div className = "vehicleBox">
            <label>Rent</label>
            <h4>Buggati</h4>
            </div>
            <div className = "vehicleBox">
            <button className = "btn btn-primary" >Book</button>
            </div>
            
            </div>
        )
    }
}

export default VehicleCell