import React from 'react'
import "../../styles/dashboard.styles.css";
import LocationCell from './Cells/LocationCell'
class LocationBrowser extends React.Component {
    render(){
       
        return (
            <div>
              <div className = "list-container">
              <h2 align = {"center"}><b>{this.props.title}</b></h2>
                <div className="md-form my-0 vehicleBox finderBox">
                  <input
                    class="form-inline d-flex justify-content-center md-form form-sm mt-0"
                    type="text"
                    placeholder="Search by location"
                    aria-label="Search"
                  />
                  <button type="button" class="btn btn-primary btn-sm">Search</button>
                  
                </div>
                <LocationCell/>
              </div>
            </div>
          );
    }
}

export default LocationBrowser