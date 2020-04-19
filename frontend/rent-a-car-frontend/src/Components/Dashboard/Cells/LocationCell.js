import React from 'react'
import {
    MDBCard
  } from "mdbreact";
import CustomTextBox from '../../Common/CustomTextBox'

class LocationCell extends React.Component {

    render(){
        return(
            <div className = "vehicleCell">
            <div className = "vehicleBox">
            <label>Location Name</label>
            <h4>Buggati</h4>
            </div>
            <div className = "vehicleBox">
            <label>Capacity</label>
            <h4>Buggati</h4>
            </div>
            <div className = "vehicleBox">
            <label>Available</label>
            <h4>Buggati</h4>
            </div>
            <div className = "vehicleBox">
            <button className = "btn btn-primary" >View</button>
            </div>
            
            </div>
        )
    }
}

export default LocationCell